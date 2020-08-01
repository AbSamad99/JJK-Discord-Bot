/*Function to handle the get art names command*/

const Discord = require('discord.js');

const ArtSchema = require('../../Schemas/ArtSchema.js');

const getArtNamesCommand = async (msg) => {
  try {
    let message, index, characterArtArray, artNamesEmbed;

    //getting required object
    characterArtArray = await ArtSchema.find({});

    //constructing the return message
    message = `${characterArtArray[0].name}: ${characterArtArray[0].links.length}`;
    for (index = 1; index < characterArtArray.length; index++) {
      message = `${message}
${characterArtArray[index].name}: ${characterArtArray[index].links.length}`;
    }

    artNamesEmbed = new Discord.MessageEmbed().setTitle('Art database info')
      .setDescription(`Here is the list of all characters in the database and the number of links each has:
${message}`);

    //sending required data
    msg.channel.send(artNamesEmbed).catch(console.error);
  } catch (err) {
    console.log(err);
  }
};

module.exports = getArtNamesCommand;
