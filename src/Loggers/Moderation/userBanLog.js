/*Function to log when user is banned from the server*/

const { MessageEmbed } = require('discord.js');

const gifOrPngCheck = require('../../Helpers/gifOrPngCheck.js');

//logs when user is banned from the server
const userBanLog = async (
  banAuditLog,
  mem,
  logsChannel,
  msg,
  toBan,
  reason
) => {
  let banEmbed, roles;

  banEmbed = new MessageEmbed()
    .setTitle('Member banned')
    .setColor(10038562)
    .setFooter(new Date());

  roles = ``;

  //when user is banned manually
  if (!msg) {
    banEmbed
      .setAuthor(
        banAuditLog.executor.tag,
        await gifOrPngCheck(banAuditLog.executor)
      )
      .setThumbnail(await gifOrPngCheck(banAuditLog.target))
      .setDescription(`${banAuditLog.target} has been Banned from the server.`);

    if (!banAuditLog.reason)
      banEmbed.addField('Reason:', 'No Reason was provided');
    else banEmbed.addField('Reason:', banAuditLog.reason);

    if (mem._roles && mem._roles.length) {
      console.log(mem._roles);
      mem._roles.forEach((roleId) => {
        roles = `${roles} <@&${roleId}>`;
      });
      banEmbed.addField('Roles', roles);
    }
  }
  //when user is banned through command
  else {
    banEmbed
      .setAuthor(msg.author.tag, await gifOrPngCheck(msg.author))
      .setThumbnail(await gifOrPngCheck(toBan.user))
      .setDescription(`${toBan.user} has been Banned from the server.`)
      .addField('Reason:', reason);

    msg.channel.send(banEmbed).catch(console.log);

    if (toBan._roles && toBan._roles.length) {
      toBan._roles.forEach((roleId) => {
        roles = `${roles} <@&${roleId}>`;
      });
      banEmbed.addField('Roles', roles);
    }
  }

  //logging
  logsChannel.send(banEmbed).catch(console.error);
};

module.exports = userBanLog;
