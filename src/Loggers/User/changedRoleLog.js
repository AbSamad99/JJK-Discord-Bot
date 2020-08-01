/*Function to log role addition/removal*/

const Discord = require('discord.js');

const gifOrPngCheck = require('../../Checks/gifOrPngCheck.js');

const changedRoleLog = async (newMem, roleLogs) => {
  try {
    let roleEmbed, logsChannel, roleColor, roles;

    //selcting the log channel
    logsChannel = newMem.guild.channels.cache.find((ch) => ch.name === 'logs');

    roleColor = newMem.guild.roles.cache.find(
      (role) => role.id === roleLogs.changes[0].new[0].id
    ).color;

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
        .setTitle('Role added')
        .setDescription(`Added ${roles} to ${roleLogs.target}`);
    } else if (roleLogs.changes[0].key === '$remove') {
      roleEmbed
        .setTitle('Role removed')
        .setDescription(`Removed ${roles} from ${roleLogs.target}`);
    }

    //sending the messages
    logsChannel.send(roleEmbed).catch(console.error);
  } catch (err) {
    console.log(err);
  }
};

module.exports = changedRoleLog;
