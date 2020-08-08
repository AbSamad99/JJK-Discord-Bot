/*Function to handle the get art command*/

const ArtSchema = require('../../Schemas/ArtSchema.js');

//gets an art
const getArtCommand = async (msg) => {
  let temp, characterArray, randomIndex, characterArtObj;
  //checking if the command was issued in appropriate channel
  if (
    !(msg.channel.id === '458840312094261270') /*Art channel*/ &&
    !(msg.channel.id === '720958791432011789') /*Syed bot channel*/
  )
    return;

  //getting the name and links
  temp = msg.content.slice(1);
  temp = temp.split(' ');

  //checking the parameters given
  if (!temp[1]) {
    msg.channel.send('Please specify a character name');
    return;
  }

  //getting required object
  characterArtObj = await ArtSchema.findOne({ name: temp[1].toLowerCase() });

  if (!characterArtObj) {
    msg.channel.send('Invalid character');
    return;
  }

  //getting required array
  characterArray = characterArtObj.links;

  //return if no link is stored
  if (!characterArray.length) {
    msg.channel.send('No art added for this character').catch(console.error);
    return;
  }

  //get a random link
  randomIndex = Math.floor(Math.random() * characterArray.length);

  //send back the link
  msg.channel.send(characterArray[randomIndex]).catch(console.error);
};

module.exports = getArtCommand;
