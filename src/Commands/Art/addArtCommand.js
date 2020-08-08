/*Function to handle the add art command*/

const ArtSchema = require('../../Schemas/ArtSchema.js');
const { artLinksArray } = require('../../checkArrays.js');
const urlExist = require('url-exist');

//adds an art
const addArtCommand = async (msg) => {
  let characterArtObj,
    temp,
    characterArray,
    index,
    count,
    alreadyPresent,
    invalid;
  //checking if the command was issued in appropriate channel
  if (
    !(msg.channel.id === '458840312094261270') /*Art channel*/ &&
    !(msg.channel.id === '720958791432011789') /*Syed bot channel*/
  )
    return;

  //initianlising count and getting the name and links
  count = 0;
  temp = msg.content.slice(1);
  temp = temp.split(' ');

  alreadyPresent = ``;
  invalid = ``;

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
  if (temp.length < 3) {
    msg.channel.send('Please provide link').catch(console.error);
    return;
  }

  //storing the links in json file
  for (index = 2; index < temp.length; index++) {
    if (
      !artLinksArray.some((l) => temp[index].includes(l)) &&
      !(await urlExist(temp[index]))
    ) {
      if (!invalid.length) {
        invalid = `Link ${index - 1}`;
        continue;
      }
      invalid = `${invalid}, Link ${index - 1}`;
      continue;
    }
    if (characterArray.includes(temp[index])) {
      if (!alreadyPresent.length) {
        alreadyPresent = `Link ${index - 1}`;
        continue;
      }
      alreadyPresent = `${alreadyPresent}, Link ${index - 1}`;
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
};

module.exports = addArtCommand;
