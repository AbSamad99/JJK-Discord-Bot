const Discord = require('discord.js');

const gifOrPngCheck = require('../Checks/gifOrPngCheck.js');

const userLeaveLog = async (mem, logsChannel) => {
  try {
    let leaveEmbed, roles;

    //setting relevant fields
    leaveEmbed = new Discord.MessageEmbed()
      .setAuthor(mem.user.tag, await gifOrPngCheck(mem.user))
      .setTitle('Member Left')
      .setColor(3447003)
      .setDescription(`<@${mem.user.id}> has left the server`)
      .setFooter(new Date());

    if (mem.roles.cache.array().length) {
      roles = ``;
      mem.roles.cache.array().forEach((role) => {
        roles = `${roles} <@&${role.id}>`;
      });
      leaveEmbed.addField('Roles', roles);
    }

    logsChannel.send(leaveEmbed).catch(console.logy);
  } catch (err) {
    console.log(err);
  }
};

module.exports = userLeaveLog;
