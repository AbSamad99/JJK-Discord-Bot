const Discord = require('discord.js');

const gifOrPngCheck = require('../Checks/gifOrPngCheck.js');

//logs when user is banned from the server
const userBanLog = async (
  banAuditLog,
  mem,
  msg,
  logsChannel,
  toBan,
  reason
) => {
  try {
    let banEmbed, roles;

    banEmbed = new Discord.MessageEmbed()
      .setTitle('Member Banned')
      .setColor(10038562)
      .setFooter(new Date());

    roles = ``;

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

      if (mem._roles.length) {
        console.log(mem._roles);
        mem._roles.forEach((roleId) => {
          roles = `${roles} <@&${roleId}>`;
        });
        banEmbed.addField('Roles', roles);
      }
    } else {
      banEmbed
        .setAuthor(msg.author.tag, await gifOrPngCheck(msg.author))
        .setThumbnail(await gifOrPngCheck(toBan.user))
        .setDescription(`<@${toBan.user.id}> has been Banned from the server.`)
        .addField('Reason:', reason);

      if (toBan._roles.length) {
        toBan._roles.forEach((roleId) => {
          roles = `${roles} <@&${roleId}>`;
        });
        banEmbed.addField('Roles', roles);
      }
    }

    //logging
    logsChannel.send(banEmbed).catch(console.error);
  } catch (err) {
    console.log(err);
  }
};

module.exports = userBanLog;
