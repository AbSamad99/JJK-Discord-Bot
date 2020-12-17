/*Function to handle the edit art character command*/

const ArtSchema = require('../../Schemas/ArtSchema.js');

//adds a character
const editArtCharacterCommand = async (msg) => {
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

  if (!temp[1]) {
    msg.channel.send('Please specify a character name').catch(console.error);
    return;
  }

  if (!temp[2]) {
    msg.channel.send('Please specify a new name').catch(console.error);
    return;
  }

  //getting required object
  characterArtObj = await ArtSchema.findOne({ name: temp[1].toLowerCase() });

  if (!characterArtObj) {
    msg.channel.send('Invalid character');
    return;
  }

  //adding the new category
  await ArtSchema.findOneAndUpdate(
    { name: temp[1].toLowerCase() },
    { name: temp[2].toLowerCase() }
  );

  //sending appropriate message
  msg.channel.send(`Character name updated`).catch(console.error);
};

module.exports = editArtCharacterCommand;
