const Discord = require('discord.js');

const checkIfGifOrPng = require('../Helpers/checkIfGifOrPng.js');

//logs edited messages
const editMessageLog = async (oldMsg, newMsg) => {
  try {
    let editEmbed, authorUrl;

    //selecting log channel
    let modChannel = newMsg.guild.channels.cache.find(
      (ch) => ch.name === 'syed-bot-practice'
    );

    //setting the fields
    authorUrl = await checkIfGifOrPng(newMsg.author);

    editEmbed = new Discord.MessageEmbed()
      .setAuthor(newMsg.author.tag, authorUrl)
      .setTitle(`Message edited in #${newMsg.channel.name}`)
      .setColor(3447003)
      .addField('Before:', oldMsg.content)
      .addField('After:', newMsg.content)
      .setFooter(new Date());

    //sending message to logs
    modChannel.send(editEmbed).catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

module.exports = editMessageLog;
