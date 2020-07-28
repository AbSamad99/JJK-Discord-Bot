const Discord = require('discord.js');

const gifOrPngCheck = require('../Checks/gifOrPngCheck.js');

//logs edited messages
const editMessageLog = async (oldMsg, newMsg) => {
  try {
    let editEmbed, logsChannel;

    //selecting log channel
    logsChannel = newMsg.guild.channels.cache.find((ch) => ch.name === 'logs');

    //setting the fields
    editEmbed = new Discord.MessageEmbed()
      .setAuthor(newMsg.author.tag, await gifOrPngCheck(newMsg.author))
      .setTitle(`Message edited in #${newMsg.channel.name}`)
      .setColor(3447003)
      .addField('Before:', oldMsg.content)
      .addField('After:', newMsg.content)
      .setFooter(new Date());

    //sending message to logs
    logsChannel.send(editEmbed).catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

module.exports = editMessageLog;
