const Discord = require('discord.js');

const createEmbed = require('../Helpers/createEmbed.js');
const checkIfGifOrPng = require('../Helpers/checkIfGifOrPng.js');

//logs edited messages
const editMessageLog = async (oldMsg, newMsg) => {
  try {
    let editEmbed, authorName, authorUrl, title, color, field1, field2;

    //selecting log channel
    let modChannel = newMsg.guild.channels.cache.find(
      (ch) => ch.name === 'syed-bot-practice'
    );

    //slecting channel where message was edited
    let editedChannel = newMsg.channel;

    //setting the fields
    authorName = newMsg.author.tag;
    authorUrl = await checkIfGifOrPng(newMsg.author);
    title = `Message edited in #${editedChannel.name}`;
    color = 3447003;
    field1 = { title: 'Before:', content: oldMsg.content };
    field2 = { title: 'After:', content: newMsg.content };

    //creating the embed
    editEmbed = createEmbed(
      authorName,
      authorUrl,
      title,
      color,
      field1,
      field2
    );

    //sending message to logs
    modChannel.send(editEmbed).catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

module.exports = editMessageLog;
