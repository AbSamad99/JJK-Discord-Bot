/*Function to handle the debate command*/

const { MessageEmbed } = require('discord.js');
const { capitalCase } = require('change-case');

const DebateSchema = require('../../Schemas/DebateSchema.js');

const debateCommand = async (msg) => {
  let char1, char2, charArray, debateEmbed;

  //fetching from db
  charArray = await DebateSchema.findOne({ _id: '5f26cc89a8c67f48085af72f' });
  charArray = charArray.names;

  //getting 2 random chars
  char1 = charArray[Math.floor(Math.random() * charArray.length)];
  char2 = charArray[Math.floor(Math.random() * charArray.length)];
  while (char1 === char2) {
    char2 = charArray[Math.floor(Math.random() * charArray.length)];
  }
  //creating the embed
  debateEmbed = new MessageEmbed()
    .setTitle('Versus battle!')
    .setDescription(
      'Debate between who emerges victorious when these two characters face off!'
    )
    .setColor(10181046)
    .addField('Contestant 1:', capitalCase(char1), true)
    .addField('Contestant 2:', capitalCase(char2), true);

  //sending the embed
  msg.channel.send(debateEmbed).catch(console.log);
};

module.exports = debateCommand;
