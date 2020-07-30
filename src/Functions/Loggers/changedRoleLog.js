const Discord = require('discord.js');

const gifOrPngCheck = require('../Checks/gifOrPngCheck.js');

//logs role addition/removal
const changedRoleLog = async (newMem, roleLogs) => {
  try {
    let roleEmbed, logsChannel, roleColor, roles;

    //selcting the log channel
    logsChannel = newMem.guild.channels.cache.find((ch) => ch.name === 'logs');

    roleColor = newMem.guild.roles.cache
      .array()
      .find((role) => role.id === roleLogs.changes[0].new[0].id).color;

    roles = ``;

    roleLogs.changes[0].new.forEach((role) => {
      roles = `${roles} <@&${role.id}>`;
    });

    roleEmbed = new Discord.MessageEmbed()
      .setAuthor(roleLogs.executor.tag, await gifOrPngCheck(roleLogs.executor))
      .setColor(roleColor)
      .setFooter(new Date());

    //adding fields based on type
    if (roleLogs.changes[0].key === '$add') {
      roleEmbed
        .setTitle('Role Added')
        .setDescription(`Added ${roles} to <@${roleLogs.target.id}>`);
    } else if (roleLogs.changes[0].key === '$remove') {
      roleEmbed
        .setTitle('Role Removed')
        .setDescription(`Removed ${roles} from <@${roleLogs.target.id}>`);
    }

    //sending the messages
    logsChannel.send(roleEmbed).catch(console.error);
  } catch (err) {
    console.log(err);
  }
};

module.exports = changedRoleLog;
