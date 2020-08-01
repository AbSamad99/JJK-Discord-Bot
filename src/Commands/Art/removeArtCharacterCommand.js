/*Function to handle the remove art character commands*/

const ArtSchema = require('../../Schemas/ArtSchema.js');

const { artCommandParametersCheck } = require('../../Checks/helperChecks.js');

//removes a new character
const removeArtCharacterCommand = async (msg) => {
  let temp, characterArtObj;
  try {
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
  } catch (err) {
    console.log(err);
  }
};

module.exports = removeArtCharacterCommand;
