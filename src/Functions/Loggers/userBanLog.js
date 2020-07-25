const Discord = require('discord.js');

const checkIfGifOrPng = require('../Helpers/checkIfGifOrPng.js');

//logs when user is banned from the server
const userBanLog = async (banAuditLog, msg, modChannel, toBan, reason) => {
  try {
    let banEmbed, authorUrl, thumbnail;

    banEmbed = new Discord.MessageEmbed()
      .setTitle('Member Banned')
      .setColor(3447003)
      .setFooter(new Date());

    if (!msg) {
      authorUrl = await checkIfGifOrPng(banAuditLog.executor);
      thumbnail = await checkIfGifOrPng(banAuditLog.target);
      banEmbed
        .setAuthor(banAuditLog.executor.tag, authorUrl)
        .setThumbnail(thumbnail)
        .setDescription(
          `<@${banAuditLog.target.id}> has been Banned from the server.`
        );
      if (!banAuditLog.reason)
        banEmbed.addField('Reason:', 'No Reason was provided');
      else banEmbed.addField('Reason:', banAuditLog.reason);
    } else {
      authorUrl = await checkIfGifOrPng(msg.author);
      thumbnail = await checkIfGifOrPng(toBan.user);
      banEmbed
        .setAuthor(msg.author.tag, authorUrl)
        .setThumbnail(thumbnail)
        .setDescription(`<@${toBan.user.id}> has been Banned from the server.`)
        .addField('Reason:', reason);
    }

    //logging
    modChannel.send(banEmbed).catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

module.exports = userBanLog;
