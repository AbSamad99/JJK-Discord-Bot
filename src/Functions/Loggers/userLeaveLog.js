const Discord = require('discord.js');

const gifOrPngCheck = require('../Checks/gifOrPngCheck.js');

const userLeaveLog = async (mem, logsChannel) => {
  try {
    let leaveEmbed, roles;

    //setting relevant fields
    leaveEmbed = new Discord.MessageEmbed()
      .setAuthor(mem.user.tag, await gifOrPngCheck(mem.user))
      .setTitle('Member Left')
      .setColor(10038562)
      .setDescription(`<@${mem.user.id}> has left the server`)
      .setFooter(new Date());

    if (mem._roles.length) {
      roles = ``;
      mem._roles.forEach((roleId) => {
        roles = `${roles} <@&${roleId}>`;
      });
      leaveEmbed.addField('Roles', roles);
    }

    logsChannel.send(leaveEmbed).catch(console.logy);
  } catch (err) {
    console.log(err);
  }
};

module.exports = userLeaveLog;
