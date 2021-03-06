const { MessageEmbed } = require('discord.js');

const gifOrPngCheck = require('../../Helpers/gifOrPngCheck.js');
const millisecondsToTime=require('../../Functions/millisecondsToTime')

const userLeaveLog = async (mem, logsChannel) => {
  let leaveEmbed, roles;

  //setting relevant fields
  leaveEmbed = new MessageEmbed()
    .setAuthor(mem.user.tag, await gifOrPngCheck(mem.user))
    .setTitle('Member left')
    .setColor(10038562)
    .setDescription(
      `${mem.user} has left the server. Joined ${millisecondsToTime(
        Date.now() - mem.joinedTimestamp,{secondsDecimalDigits:0}
      )} ago.`
    )
    .setFooter(new Date());

  if (mem._roles.length) {
    roles = ``;
    mem._roles.forEach((roleId) => {
      roles = `${roles} <@&${roleId}>`;
    });
    leaveEmbed.addField('Roles', roles);
  }

  logsChannel.send(leaveEmbed).catch(console.logy);
};

module.exports = userLeaveLog;
