/*Function to handle the remove art character commands*/

const ArtSchema = require('../../Schemas/ArtSchema.js');

//removes a new character
const removeArtCharacterCommand = async (msg) => {
  if (
  !(
    msg.member.roles.cache.has('447512454810042369') /*Special Grade role*/ ||
    msg.member.roles.cache.has('447512449248395267') /*admin role*/ ||
    msg.author.id === '390450196711997440'
  ) &&
  !(
    msg.channel.id === '742257053954736260' /*Bot Art channel*/ ||
    msg.channel.id === '720958791432011789'
  ) /*Syed bot channel*/
)
  return;

  let temp, characterArtObj;

  //getting params
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

  //deleting the category
  await ArtSchema.findOneAndDelete({ name: temp[1].toLowerCase() });

  //send message
  msg.channel
    .send(`Removed Character ${temp[1].toLowerCase()}`)
    .catch(console.error);
};

module.exports = removeArtCharacterCommand;
