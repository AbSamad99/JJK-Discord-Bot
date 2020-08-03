/*Function to handle the remove art command*/

const ArtSchema = require('../../Schemas/ArtSchema.js');

const {
  channelCheck,
  artCommandParametersCheck,
} = require('../../Checks/Other/helperChecks.js');

//removes an art
const removeArtCommand = async (msg) => {
  let temp, characterArray, index;
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

    //return if no links were provided
    if (!temp[2]) {
      msg.channel.send('Please provide link');
      return;
    }

    //finding location of the link
    index = characterArray.findIndex((link) => link === temp[2]);

    //return if no link exists
    if (index == -1) {
      msg.channel.send('No such link exists');
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

    //sending back appropriate message
    msg.channel.send('Removed').catch(console.error);

    //Suppressing embeds from links
    await msg.suppressEmbeds();
  } catch (err) {
    console.log(err);
  }
};

module.exports = removeArtCommand;
