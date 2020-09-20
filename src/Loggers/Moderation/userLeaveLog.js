const { MessageEmbed } = require('discord.js');
const TimeAgo = require('javascript-time-ago');
const en = require('javascript-time-ago/locale/en');

const gifOrPngCheck = require('../../Helpers/gifOrPngCheck.js');

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');

const userLeaveLog = async (mem, logsChannel) => {
  let leaveEmbed, roles;

  //setting relevant fields
  leaveEmbed = new MessageEmbed()
    .setAuthor(mem.user.tag, await gifOrPngCheck(mem.user))
    .setTitle('Member left')
    .setColor(10038562)
    .setDescription(
      `${mem.user} has left the server. Joined ${timeAgo.format(
        Date.now() - mem.joinedTimestamp
      )}.`
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
