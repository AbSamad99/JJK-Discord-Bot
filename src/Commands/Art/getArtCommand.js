/*Function to handle the get art command*/

const ArtSchema = require('../../Schemas/ArtSchema.js');

const {
  channelCheck,
  artCommandParametersCheck,
} = require('../../Checks/Other/helperChecks.js');

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

module.exports = getArtCommand;
