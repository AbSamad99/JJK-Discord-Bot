/*Function to handle the remove art command*/

const ArtSchema = require('../../Schemas/ArtSchema.js');

//removes an art
const removeArtCommand = async (msg) => {
  if (
    (!(
      msg.member.roles.cache.has('447512454810042369') /*Special Grade role*/
    ) &&
      !(msg.member.roles.cache.has('447512449248395267') /*admin role*/) &&
      !(msg.member.roles.cache.has('449481558559031296') /*Community role*/)) ||
    (!(msg.channel.id === '742257053954736260') /*Bot Art channel*/ &&
      !(msg.channel.id === '720958791432011789')) /*Syed bot channel*/
  )
    return;

  let temp, characterArray, index;

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

  //return if no links were provided
  if (!temp[2]) {
    msg.channel.send('Please provide link').catch(console.error);
    return;
  }

  //finding location of the link
  index = characterArray.findIndex((link) => link === temp[2]);

  //return if no link exists
  if (index == -1) {
    msg.channel.send('No such link exists').catch(console.error);
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

  //sending back appropriate message and Suppressing embeds from links
  msg.channel
    .send('Removed')
    .then(() => msg.suppressEmbeds())
    .catch(console.error);
};

module.exports = removeArtCommand;
