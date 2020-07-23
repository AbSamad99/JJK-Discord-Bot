const urlExist = require('url-exist');
const fs = require('fs');

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

    //getting required object
    characterArtObj = JSON.parse(
      fs.readFileSync(`${process.cwd()}/src/Json-Files/art.json`)
    );

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

    //checking the parameters given
    if (!artCommandParametersCheck(temp, msg, characterArtObj)) return;

    //getting required array
    characterArray = characterArtObj[temp[1].toLowerCase()];

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
      fs.writeFileSync(
        `${process.cwd()}/src/Json-Files/art.json`,
        JSON.stringify(characterArtObj)
      );
    }

    //sending appropriate message after links are stored
    msg.channel.send(`Number of links added: ${count}`).catch(console.log);
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

    //getting the needed object
    const characterArtObj = JSON.parse(
      fs.readFileSync(`${process.cwd()}/src/Json-Files/art.json`)
    );

    //checking if the command was issued in appropriate channel
    if (
      !channelCheck(msg, 'music-and-art') &&
      !channelCheck(msg, 'syed-bot-practice')
    )
      return;

    //getting the name and links
    temp = msg.content.slice(1);
    temp = temp.split(' ');

    //checking the parameters given
    if (!artCommandParametersCheck(temp, msg, characterArtObj)) return;

    //getting required array
    characterArray = characterArtObj[temp[1].toLowerCase()];

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
    fs.writeFileSync(
      `${process.cwd()}/src/Json-Files/art.json`,
      JSON.stringify(characterArtObj)
    );

    //sending back appropriate message
    msg.channel.send('Removed').catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

//gets an art
const getArtCommand = (msg) => {
  let temp, characterArray, randomIndex, characterArtObj;
  try {
    //getting the needed object
    characterArtObj = JSON.parse(
      fs.readFileSync(`${process.cwd()}/src/Json-Files/art.json`)
    );

    //checking if the command was issued in appropriate channel
    if (
      !channelCheck(msg, 'music-and-art') &&
      !channelCheck(msg, 'syed-bot-practice')
    )
      return;

    //getting the name and links
    temp = msg.content.slice(1);
    temp = temp.split(' ');

    //checking the parameters given
    if (!artCommandParametersCheck(temp, msg, characterArtObj)) return;

    //getting required array
    characterArray = characterArtObj[temp[1].toLowerCase()];

    //return if no link is stored
    if (!characterArray.length) {
      msg.channel.send('No art added for this character');
      return;
    }

    //get a random link
    randomIndex = Math.floor(Math.random() * characterArray.length);

    //send back the link
    msg.channel.send(characterArray[randomIndex]).catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

//gets all art for a character
const getAllArtCommand = (msg) => {
  let temp, characterArray, index, message, characterArtObj;
  try {
    //getting needed object
    characterArtObj = JSON.parse(
      fs.readFileSync(`${process.cwd()}/src/Json-Files/art.json`)
    );

    //checking the channel
    if (
      !channelCheck(msg, 'music-and-art') &&
      !channelCheck(msg, 'syed-bot-practice')
    )
      return;

    //getting params
    temp = msg.content.slice(1);
    temp = temp.split(' ');

    //checking the parameters given
    if (!artCommandParametersCheck(temp, msg, characterArtObj)) return;

    //getting needed array
    characterArray = characterArtObj[temp[1].toLowerCase()];

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
      .catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

//removes a new character
const removeArtCharacterCommand = (msg) => {
  let temp, characterArray, characterArtObj;
  try {
    //getting needed object
    characterArtObj = JSON.parse(
      fs.readFileSync(`${process.cwd()}/src/Json-Files/art.json`)
    );

    //getting params
    temp = msg.content.slice(1);
    temp = temp.split(' ');

    //checking the parameters given
    if (!artCommandParametersCheck(temp, msg, characterArtObj)) return;

    //getting the array
    characterArray = characterArtObj[temp[1].toLowerCase()];

    //return if category doesnt exist
    if (!characterArray) {
      msg.channel.send('No art added for this character');
      return;
    }

    //deleting the category
    delete characterArtObj[temp[1].toLowerCase()];

    //write the changes
    fs.writeFileSync(
      `${process.cwd()}/src/Json-Files/art.json`,
      JSON.stringify(characterArtObj)
    );

    //send message
    msg.channel.send(`Removed Character ${temp[1]}`).catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

//adds a character
const addArtCharacterCommand = (msg) => {
  let temp, characterArray, characterArtObj;
  try {
    //getting needed object
    characterArtObj = JSON.parse(
      fs.readFileSync(`${process.cwd()}/src/Json-Files/art.json`)
    );

    //getting params
    temp = msg.content.slice(1);
    temp = temp.split(' ');

    //checking the parameters given
    if (!artCommandParametersCheck(temp, msg, characterArtObj)) return;

    //getting the array
    characterArray = characterArtObj[temp[1].toLowerCase()];

    //checking if character already exists
    if (characterArray) {
      msg.channel.send('Character already present').catch(console.log);
      return;
    }

    //adding the new category
    characterArtObj[temp[1].toLowerCase()] = [];

    //writing the changes
    fs.writeFileSync(
      `${process.cwd()}/src/Json-Files/art.json`,
      JSON.stringify(characterArtObj)
    );

    //sending appropriate message
    msg.channel.send(`Added Character ${temp[1]}`).catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

const getArtNamesCommand = (msg) => {
  let temp1, temp2, message, index, characterArtObj;
  try {
    //getting required object
    characterArtObj = JSON.parse(
      fs.readFileSync(`${process.cwd()}/src/Json-Files/art.json`)
    );

    //fetching the keys and values of the object
    temp1 = Object.keys(characterArtObj);
    temp2 = Object.values(characterArtObj);

    //constructing the return message
    message = `${temp1[0]}: ${temp2[0].length}`;
    for (index = 1; index < temp1.length; index++) {
      message = `${message}, ${temp1[index]}: ${temp2[index].length}`;
    }

    //sending required data
    msg.channel.send(message).catch(console.log);
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
