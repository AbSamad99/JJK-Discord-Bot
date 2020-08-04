/*Function to handle the add art command*/

const ArtSchema = require('../../Schemas/ArtSchema.js');

const {
  channelCheck,
  artCommandParametersCheck,
} = require('../../Checks/Other/helperChecks.js');
const {
  containsInvalidArtLinkCheck,
} = require('../../Checks/Other/moderationHelpCheck.js');

//adds an art
const addArtCommand = async (msg) => {
  let characterArtObj,
    temp,
    characterArray,
    index,
    count,
    alreadyPresent,
    invalid;
  try {
    //checking if the command was issued in appropriate channel
    if (
      !channelCheck(msg, 'music-and-art') &&
      !channelCheck(msg, 'syed-bot-practice')
    )
      return;

    //initianlising count and getting the name and links
    count = 0;
    temp = msg.content.slice(1);
    temp = temp.split(' ');

    alreadyPresent = ``;
    invalid = ``;

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

    //storing the links in json file
    for (index = 2; index < temp.length; index++) {
      if (await containsInvalidArtLinkCheck(temp[index])) {
        if (!invalid.length) {
          invalid = `${index - 1}`;
          continue;
        }
        invalid = `${invalid}, ${index - 1}`;
        continue;
      }
      if (characterArray.includes(temp[index])) {
        if (!alreadyPresent.length) {
          alreadyPresent = `${index - 1}`;
          continue;
        }
        alreadyPresent = `${alreadyPresent}, ${index - 1}`;
        continue;
      }
      characterArray.push(temp[index]);
      count++;
    }

    await ArtSchema.findOneAndUpdate(
      { name: temp[1].toLowerCase() },
      { links: characterArray },
      { useFindAndModify: false }
    );

    if (alreadyPresent.length) {
      msg.channel
        .send(`Already present link(s): ${alreadyPresent}`)
        .catch(console.log);
    }

    if (invalid.length) {
      msg.channel.send(`Invalid link(s): ${invalid}`).catch(console.log);
    }

    //sending appropriate message after links are stored and Suppressing embeds from links
    msg.channel
      .send(`Number of links added: ${count}`)
      .then(() => msg.suppressEmbeds())
      .catch(console.error);
  } catch (err) {
    console.log(err);
  }
};

module.exports = addArtCommand;
