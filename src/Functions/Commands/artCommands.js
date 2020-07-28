const ArtSchema = require('../../Schemas/ArtSchema.js');

const {
  channelCheck,
  artCommandParametersCheck,
} = require('../Checks/helperChecks.js');
const {
  containsInvalidArtLinkCheck,
} = require('../Checks/moderationHelpCheck.js');

//adds an art
const addArtCommand = async (msg) => {
  let characterArtObj, temp, characterArray, index, count;
  try {
    //Suppressing embeds from links
    msg.suppressEmbeds();

    //checking if the command was issued in appropriate channel
    if (
      !channelCheck(msg, 'music-and-art') &&
      !channelCheck(msg, 'syed-bot-practice')
    )
      return;

    //initianlising count and getting the name and links
    count = 0;
    temp = msg.content.slice(1);
    temp = temp.split(' ');

    //getting required object
    characterArtObj = await ArtSchema.findOne({ name: temp[1].toLowerCase() });

    //checking the parameters given
    if (!artCommandParametersCheck(temp, msg, characterArtObj)) return;

    //getting required array
    characterArray = characterArtObj.links;

    //return if no links were provided
    if (!temp[2]) {
      msg.channel.send('Please provide link');
      return;
    }

    //storing the links in json file
    for (index = 2; index < temp.length; index++) {
      if (await containsInvalidArtLinkCheck(temp[index])) {
        msg.channel.send(`Link ${index - 1} is invalid`);
        continue;
      }
      if (characterArray.includes(temp[index])) {
        msg.channel.send(`Link ${index - 1} is already present`);
        continue;
      }
      characterArray.push(temp[index]);
      count++;
    }

    await ArtSchema.findOneAndUpdate(
      { name: temp[1].toLowerCase() },
      { links: characterArray },
      { useFindAndModify: false }
    );

    //sending appropriate message after links are stored
    msg.channel.send(`Number of links added: ${count}`).catch(console.error);
  } catch (err) {
    console.log(err);
  }
};

//removes an art
const removeArtCommand = async (msg) => {
  let temp, characterArray, index;
  try {
    //Suppressing embeds from links
    msg.suppressEmbeds();

    //checking if the command was issued in appropriate channel
    if (
      !channelCheck(msg, 'music-and-art') &&
      !channelCheck(msg, 'syed-bot-practice')
    )
      return;

    //getting the name and links
    temp = msg.content.slice(1);
    temp = temp.split(' ');

    //getting required object
    characterArtObj = await ArtSchema.findOne({ name: temp[1].toLowerCase() });

    //checking the parameters given
    if (!artCommandParametersCheck(temp, msg, characterArtObj)) return;

    //getting required array
    characterArray = characterArtObj.links;

    //return if no links were provided
    if (!temp[2]) {
      msg.channel.send('Please provide link');
      return;
    }

    //finding location of the link
    index = characterArray.findIndex((link) => link === temp[2]);

    //return if no link exists
    if (index == -1) {
      msg.channel.send('No such link exists');
      return;
    }

    //deleting the link
    characterArray.splice(index, 1);

    //saving changes to the json file
    await ArtSchema.findOneAndUpdate(
      { name: temp[1].toLowerCase() },
      { links: characterArray },
      { useFindAndModify: false }
    );

    //sending back appropriate message
    msg.channel.send('Removed').catch(console.error);
  } catch (err) {
    console.log(err);
  }
};

//gets an art
const getArtCommand = async (msg) => {
  let temp, characterArray, randomIndex, characterArtObj;
  try {
    //checking if the command was issued in appropriate channel
    if (
      !channelCheck(msg, 'music-and-art') &&
      !channelCheck(msg, 'syed-bot-practice')
    )
      return;

    //getting the name and links
    temp = msg.content.slice(1);
    temp = temp.split(' ');

    //getting required object
    characterArtObj = await ArtSchema.findOne({ name: temp[1].toLowerCase() });

    //checking the parameters given
    if (!artCommandParametersCheck(temp, msg, characterArtObj)) return;

    //getting required array
    characterArray = characterArtObj.links;

    //return if no link is stored
    if (!characterArray.length) {
      msg.channel.send('No art added for this character');
      return;
    }

    //get a random link
    randomIndex = Math.floor(Math.random() * characterArray.length);

    //send back the link
    msg.channel.send(characterArray[randomIndex]).catch(console.error);
  } catch (err) {
    console.log(err);
  }
};

//gets all art for a character
const getAllArtCommand = async (msg) => {
  let temp, characterArray, index, message, characterArtObj;
  try {
    //checking the channel
    if (
      !channelCheck(msg, 'music-and-art') &&
      !channelCheck(msg, 'syed-bot-practice')
    )
      return;

    //getting params
    temp = msg.content.slice(1);
    temp = temp.split(' ');

    //getting required object
    characterArtObj = await ArtSchema.findOne({ name: temp[1].toLowerCase() });

    //checking the parameters given
    if (!artCommandParametersCheck(temp, msg, characterArtObj)) return;

    //getting needed array
    characterArray = characterArtObj.links;

    //return if no links were stored
    if (!characterArray.length) {
      msg.channel.send('No art added for this character');
      return;
    }

    //construct the message
    message = `${characterArray[0]}`;
    for (index = 1; index < characterArray.length; index++) {
      message = `${message} ${characterArray[index]}`;
    }

    //send back all the links
    msg.channel
      .send(message)
      .then((botMsg) => botMsg.suppressEmbeds())
      .catch(console.error);
  } catch (err) {
    console.log(err);
  }
};

//removes a new character
const removeArtCharacterCommand = async (msg) => {
  let temp, characterArtObj;
  try {
    //getting params
    temp = msg.content.slice(1);
    temp = temp.split(' ');

    //getting required object
    characterArtObj = await ArtSchema.findOne({ name: temp[1].toLowerCase() });

    //checking the parameters given
    if (!artCommandParametersCheck(temp, msg, characterArtObj)) return;

    //deleting the category
    await ArtSchema.findOneAndDelete({ name: temp[1].toLowerCase() });

    //send message
    msg.channel
      .send(`Removed Character ${temp[1].toLowerCase()}`)
      .catch(console.error);
  } catch (err) {
    console.log(err);
  }
};

//adds a character
const addArtCharacterCommand = async (msg) => {
  let temp, characterArtObj;
  try {
    //getting params
    temp = msg.content.slice(1);
    temp = temp.split(' ');

    if (!temp[1].toLowerCase()) {
      msg.channel.send('Please specify a character name');
      return;
    }

    //getting required object
    characterArtObj = await ArtSchema.findOne({ name: temp[1].toLowerCase() });

    //checking the parameters given
    if (characterArtObj) {
      msg.channel.send('Character already exists');
      return;
    }

    //adding the new category
    await ArtSchema.create({ name: temp[1].toLowerCase(), links: [] });

    //sending appropriate message
    msg.channel
      .send(`Added Character ${temp[1].toLowerCase()}`)
      .catch(console.error);
  } catch (err) {
    console.log(err);
  }
};

const getArtNamesCommand = async (msg) => {
  let message, index, characterArtArray;
  try {
    //getting required object
    characterArtArray = await ArtSchema.find({});

    //constructing the return message
    message = `${characterArtArray[0].name}: ${characterArtArray[0].links.length}`;
    for (index = 1; index < characterArtArray.length; index++) {
      message = `${message}, ${characterArtArray[index].name}: ${characterArtArray[index].links.length}`;
    }

    //sending required data
    msg.channel.send(message).catch(console.error);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  addArtCommand: addArtCommand,
  getArtCommand: getArtCommand,
  getAllArtCommand: getAllArtCommand,
  removeArtCharacterCommand: removeArtCharacterCommand,
  addArtCharacterCommand: addArtCharacterCommand,
  getArtNamesCommand: getArtNamesCommand,
  removeArtCommand: removeArtCommand,
};
