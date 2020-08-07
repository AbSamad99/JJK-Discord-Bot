/*Function to handle the get all art command*/

const ArtSchema = require('../../Schemas/ArtSchema.js');

const {
  channelCheck,
  artCommandParametersCheck,
} = require('../../Checks/Other/helperChecks.js');

//gets all art for a character
const getAllArtCommand = async (msg) => {
  let temp, characterArray, index, message, characterArtObj;
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
    msg.channel.send('No art added for this character').catch(console.error);
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
};

module.exports = getAllArtCommand;
