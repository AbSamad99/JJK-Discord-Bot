/*Function to handle the add art character command*/

const ArtSchema = require('../../Schemas/ArtSchema.js');
const { channelCheck } = require('../../Checks/Other/helperChecks.js');

//adds a character
const addArtCharacterCommand = async (msg) => {
  //checking if the command was issued in appropriate channel
  if (
    !channelCheck(msg, 'music-and-art') &&
    !channelCheck(msg, 'syed-bot-practice')
  )
    return;

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

module.exports = addArtCharacterCommand;
