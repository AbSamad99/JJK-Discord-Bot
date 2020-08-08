/*Function to handle the get art names command*/

const { MessageEmbed } = require('discord.js');
const { capitalCase } = require('change-case');

const ArtSchema = require('../../Schemas/ArtSchema.js');

const getArtNamesCommand = async (msg) => {
  //checking if the command was issued in appropriate channel
  if (
    !(msg.channel.id === '458840312094261270') /*Art channel*/ &&
    !(msg.channel.id === '720958791432011789') /*Syed bot channel*/
  )
    return;

  let message, index, characterArtArray, artNamesEmbed;

  //getting required object
  characterArtArray = await ArtSchema.find({});

  //constructing the return message
  message = `${capitalCase(characterArtArray[0].name)}: ${
    characterArtArray[0].links.length
  }`;
  for (index = 1; index < characterArtArray.length; index++) {
    message = `${message}
${capitalCase(characterArtArray[index].name)}: ${
      characterArtArray[index].links.length
    }`;
  }

  artNamesEmbed = new MessageEmbed().setTitle('Art database info')
    .setDescription(`Here is the list of all characters in the database and the number of links each has:
${message}`);

  //sending required data
  msg.channel.send(artNamesEmbed).catch(console.error);
};

module.exports = getArtNamesCommand;
