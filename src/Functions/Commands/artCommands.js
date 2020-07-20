const urlExist = require('url-exist');
const fs = require('fs');

//adds an art
const addArtCommand = async (msg) => {
  try {
    const characterArtObj = JSON.parse(
      fs.readFileSync(`${process.cwd()}/src/Json-Files/art.json`)
    );
    let artChannel, testChannel, temp, characterArray, index;

    artChannel = msg.guild.channels.cache.find(
      (ch) => ch.name === 'music-and-art'
    );
    testChannel = msg.guild.channels.cache.find(
      (ch) => ch.name === 'syed-bot-practice'
    );

    if (msg.channel.id !== artChannel.id && msg.channel.id !== testChannel.id)
      return;

    temp = msg.content.slice(1);
    temp = temp.split(' ');
    if (!temp[1]) {
      msg.channel.send('Please specify a character name');
      return;
    }
    characterArray = characterArtObj[temp[1].toLowerCase()];
    if (!characterArray) {
      msg.channel.send('Invalid character');
      return;
    }
    if (!temp[2]) {
      msg.channel.send('Please provide link');
      return;
    }
    for (index = 2; index < temp.length; index++) {
      if (!(await urlExist(temp[2]))) {
        msg.channel.send(`Link ${index - 1} is invalid`);
        return;
      }
      characterArray.push(temp[index]);
      fs.writeFileSync(
        `${process.cwd()}/src/Json-Files/art.json`,
        JSON.stringify(characterArtObj)
      );
    }
    msg.channel
      .send('Added')
      .then(() => msg.suppressEmbeds())
      .catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

//gets an art
const getArtCommand = (msg) => {
  try {
    const characterArtObj = JSON.parse(
      fs.readFileSync(`${process.cwd()}/src/Json-Files/art.json`)
    );

    let artChannel, testChannel, temp, characterArray, randomIndex;

    artChannel = msg.guild.channels.cache.find(
      (ch) => ch.name === 'music-and-art'
    );
    testChannel = msg.guild.channels.cache.find(
      (ch) => ch.name === 'syed-bot-practice'
    );

    if (msg.channel.id !== artChannel.id && msg.channel.id !== testChannel.id)
      return;

    temp = msg.content.slice(1);
    temp = temp.split(' ');
    if (!temp[1]) {
      msg.channel.send('Please specify a character name');
      return;
    }
    characterArray = characterArtObj[temp[1].toLowerCase()];
    if (!characterArray) {
      msg.channel.send('Invalid character');
      return;
    }
    if (!characterArray.length) {
      msg.channel.send('No art added for this character');
      return;
    }
    randomIndex = Math.floor(Math.random() * characterArray.length);
    msg.channel.send(characterArray[randomIndex]).catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

//gets all art for a character
const getAllArtCommand = (msg) => {
  try {
    const characterArtObj = JSON.parse(
      fs.readFileSync(`${process.cwd()}/src/Json-Files/art.json`)
    );

    let artChannel, testChannel, temp, characterArray, index, message;

    artChannel = msg.guild.channels.cache.find(
      (ch) => ch.name === 'music-and-art'
    );
    testChannel = msg.guild.channels.cache.find(
      (ch) => ch.name === 'syed-bot-practice'
    );

    if (msg.channel.id !== artChannel.id && msg.channel.id !== testChannel.id)
      return;

    temp = msg.content.slice(1);
    temp = temp.split(' ');
    if (!temp[1]) {
      msg.channel.send('Please specify a character name');
      return;
    }
    characterArray = characterArtObj[temp[1].toLowerCase()];
    if (!characterArray) {
      msg.channel.send('Invalid character');
      return;
    }
    if (!characterArray.length) {
      msg.channel.send('No art added for this character');
      return;
    }

    message = `-addart ${temp[1]}`;

    for (index = 0; index < characterArray.length; index++) {
      message = `${message} ${characterArray[index]}`;
    }

    msg.channel
      .send(message)
      .then((botMsg) => botMsg.suppressEmbeds())
      .catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

//adds a new character
const removeArtCharacterCommand = (msg) => {
  try {
    const characterArtObj = JSON.parse(
      fs.readFileSync(`${process.cwd()}/src/Json-Files/art.json`)
    );

    let temp, characterArray;
    temp = msg.content.slice(1);
    temp = temp.split(' ');
    if (!temp[1]) {
      msg.channel.send('Please specify a character name');
      return;
    }
    characterArray = characterArtObj[temp[1].toLowerCase()];
    if (!characterArray) {
      msg.channel.send('Invalid Character');
      return;
    }
    delete characterArtObj[temp[1].toLowerCase()];
    fs.writeFileSync(
      `${process.cwd()}/src/Json-Files/art.json`,
      JSON.stringify(characterArtObj)
    );
    msg.channel.send(`Removed Character ${temp[1]}`).catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

//removes a character
const addArtCharacterCommand = (msg) => {
  try {
    const characterArtObj = JSON.parse(
      fs.readFileSync(`${process.cwd()}/src/Json-Files/art.json`)
    );

    let temp, characterArray;
    temp = msg.content.slice(1);
    temp = temp.split(' ');
    if (!temp[1]) {
      msg.channel.send('Please specify a character name');
      return;
    }
    characterArray = characterArtObj[temp[1].toLowerCase()];
    if (characterArray) {
      msg.channel.send('Character already present');
      return;
    }
    characterArtObj[temp[1].toLowerCase()] = [];
    fs.writeFileSync(
      `${process.cwd()}/src/Json-Files/art.json`,
      JSON.stringify(characterArtObj)
    );
    msg.channel.send(`Added Character ${temp[1]}`).catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

const getArtNamesCommand = (msg) => {
  try {
    const characterArtObj = JSON.parse(
      fs.readFileSync(`${process.cwd()}/src/Json-Files/art.json`)
    );

    let temp1, temp2, message, index;

    temp1 = Object.keys(characterArtObj);
    temp2 = Object.values(characterArtObj);
    message = `${temp1[0]}: ${temp2[0].length}`;

    for (index = 1; index < temp1.length; index++) {
      message = `${message}, ${temp1[index]}: ${temp2[index].length}`;
    }

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
};
