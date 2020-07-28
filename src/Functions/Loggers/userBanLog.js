const Discord = require('discord.js');

const gifOrPngCheck = require('../Checks/gifOrPngCheck.js');

//logs when user is banned from the server
const userBanLog = async (banAuditLog, msg, logsChannel, toBan, reason) => {
  try {
    let banEmbed;

    banEmbed = new Discord.MessageEmbed()
      .setTitle('Member Banned')
      .setColor(3447003)
      .setFooter(new Date());

    if (!msg) {
      banEmbed
        .setAuthor(
          banAuditLog.executor.tag,
          await gifOrPngCheck(banAuditLog.executor)
        )
        .setThumbnail(await gifOrPngCheck(banAuditLog.target))
        .setDescription(
          `<@${banAuditLog.target.id}> has been Banned from the server.`
        );
      if (!banAuditLog.reason)
        banEmbed.addField('Reason:', 'No Reason was provided');
      else banEmbed.addField('Reason:', banAuditLog.reason);
    } else {
      banEmbed
        .setAuthor(msg.author.tag, await gifOrPngCheck(msg.author))
        .setThumbnail(await gifOrPngCheck(toBan.user))
        .setDescription(`<@${toBan.user.id}> has been Banned from the server.`)
        .addField('Reason:', reason);
    }

    //logging
    logsChannel.send(banEmbed).catch(console.error);
  } catch (err) {
    console.log(err);
  }
};

module.exports = userBanLog;
