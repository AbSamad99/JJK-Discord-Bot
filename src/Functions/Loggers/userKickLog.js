const Discord = require('discord.js');

const checkIfGifOrPng = require('../Helpers/checkIfGifOrPng.js');

//logs when user is kicked from the server
const userKickLog = async (kickAuditLog, msg, modChannel, toKick, reason) => {
  try {
    let kickEmbed, authorUrl, thumbnail;

    //setting relevant fields

    kickEmbed = new Discord.MessageEmbed()
      .setTitle('Member Kicked')
      .setColor(3447003)
      .setFooter(new Date());

    if (!msg) {
      authorUrl = await checkIfGifOrPng(kickAuditLog.executor);
      thumbnail = await checkIfGifOrPng(kickAuditLog.target);
      kickEmbed
        .setAuthor(kickAuditLog.executor.tag, authorUrl)
        .setThumbnail(thumbnail)
        .setDescription(
          `<@${kickAuditLog.target.id}> has been kicked from the server.`
        );
      if (!kickAuditLog.reason)
        kickEmbed.addField('Reason:', 'No reason was provided');
      else kickEmbed.addField('Reason', kickAuditLog.reason);
    } else {
      authorUrl = await checkIfGifOrPng(msg.author);
      thumbnail = await checkIfGifOrPng(toKick.user);
      kickEmbed
        .setAuthor(msg.author.tag, authorUrl)
        .setThumbnail(thumbnail)
        .setDescription(`<@${toKick.user.id}> has been kicked from the server.`)
        .addField('Reason:', reason);
    }

    //logging
    modChannel.send(kickEmbed).catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

module.exports = userKickLog;
