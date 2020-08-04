/*Function to handle the edit art character command*/

const ArtSchema = require('../../Schemas/ArtSchema.js');
const {
  artCommandParametersCheck,
  channelCheck,
} = require('../../Checks/Other/helperChecks.js');

//adds a character
const editArtCharacterCommand = async (msg) => {
  let temp, characterArtObj;
  try {
    //checking if the command was issued in appropriate channel
    if (
      !channelCheck(msg, 'music-and-art') &&
      !channelCheck(msg, 'syed-bot-practice')
    )
      return;

    //getting params
    temp = msg.content.slice(1);
    temp = temp.split(' ');

    if (!temp[1].toLowerCase()) {
      msg.channel.send('Please specify a character name');
      return;
    }

    if (!temp[1].toLowerCase()) {
      msg.channel.send('Please specify a new name');
      return;
    }

    //getting required object
    characterArtObj = await ArtSchema.findOne({ name: temp[1].toLowerCase() });

    //checking the parameters given
    if (!artCommandParametersCheck(temp, msg, characterArtObj)) return;

    //adding the new category
    await ArtSchema.findOneAndUpdate(
      { name: temp[1].toLowerCase() },
      { name: temp[2].toLowerCase() }
    );

    //sending appropriate message
    msg.channel.send(`Character name updated`).catch(console.error);
  } catch (err) {
    console.log(err);
  }
};

module.exports = editArtCharacterCommand;
