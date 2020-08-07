/*Function to handle the get debate names command*/

const { MessageEmbed } = require('discord.js');
const { capitalCase } = require('change-case');

const DebateSchema = require('../../Schemas/DebateSchema.js');

const getDebateNamesCommand = async (msg) => {
  let message, index, charArray, debateNamesEmbed;

  //getting required array
  charArray = await DebateSchema.findOne({ _id: '5f26cc89a8c67f48085af72f' });
  charArray = charArray.names;

  //constructing the return message
  message = `${capitalCase(charArray[0])}`;
  for (index = 1; index < charArray.length; index++) {
    message = `${message}
${capitalCase(charArray[index])}`;
  }

  debateNamesEmbed = new MessageEmbed().setTitle('Debate character list')
    .setDescription(`Here is the list of all the characters:
${message}`);

  //sending required data
  msg.channel.send(debateNamesEmbed).catch(console.error);
};

module.exports = getDebateNamesCommand;
