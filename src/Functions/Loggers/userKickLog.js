const Discord = require('discord.js');

const gifOrPngCheck = require('../Checks/gifOrPngCheck.js');

//logs when user is kicked from the server
const userKickLog = async (
  kickAuditLog,
  mem,
  msg,
  logsChannel,
  toKick,
  reason
) => {
  try {
    let kickEmbed, roles, temp;

    //setting relevant fields

    kickEmbed = new Discord.MessageEmbed()
      .setTitle('Member Kicked')
      .setColor(10038562)
      .setFooter(new Date());

    roles = ``;

    if (!msg) {
      kickEmbed
        .setAuthor(
          kickAuditLog.executor.tag,
          await gifOrPngCheck(kickAuditLog.executor)
        )
        .setThumbnail(await gifOrPngCheck(kickAuditLog.target))
        .setDescription(
          `<@${kickAuditLog.target.id}> has been kicked from the server.`
        );

      if (!kickAuditLog.reason)
        kickEmbed.addField('Reason:', 'No reason was provided');
      else kickEmbed.addField('Reason', kickAuditLog.reason);

      if (mem._roles.length) {
        console.log(mem._roles);
        mem._roles.forEach((roleId) => {
          roles = `${roles} <@&${roleId}>`;
        });
        kickEmbed.addField('Roles', roles);
      }
    } else {
      kickEmbed
        .setAuthor(msg.author.tag, await gifOrPngCheck(msg.author))
        .setThumbnail(await gifOrPngCheck(toKick.user))
        .setDescription(`<@${toKick.user.id}> has been kicked from the server.`)
        .addField('Reason:', reason);

      if (toKick._roles.length) {
        toKick._roles.forEach((roleId) => {
          roles = `${roles} <@&${roleId}>`;
        });
        kickEmbed.addField('Roles', roles);
      }
    }

    //logging
    logsChannel.send(kickEmbed).catch(console.error);
  } catch (err) {
    console.log(err);
  }
};

module.exports = userKickLog;
