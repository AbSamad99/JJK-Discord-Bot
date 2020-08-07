/*Function to handle the remove art character commands*/

const ArtSchema = require('../../Schemas/ArtSchema.js');

const {
  artCommandParametersCheck,
  channelCheck,
} = require('../../Checks/Other/helperChecks.js');

//removes a new character
const removeArtCharacterCommand = async (msg) => {
  let temp, characterArtObj;
  //checking if the command was issued in appropriate channel
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

  //deleting the category
  await ArtSchema.findOneAndDelete({ name: temp[1].toLowerCase() });

  //send message
  msg.channel
    .send(`Removed Character ${temp[1].toLowerCase()}`)
    .catch(console.error);
};

module.exports = removeArtCharacterCommand;
