const Discord = require('discord.js');

const gifOrPngCheck = require('../Checks/gifOrPngCheck.js');

//logs role addition/removal
const changedRoleLog = async (newMem, roleLogs, roleId) => {
  try {
    let roleEmbed, logsChannel;

    //selcting the log channel
    logsChannel = newMem.guild.channels.cache.find((ch) => ch.name === 'logs');

    //getting url

    roleEmbed = new Discord.MessageEmbed()
      .setAuthor(roleLogs.executor.tag, await gifOrPngCheck(roleLogs.executor))
      .setColor(3447003)
      .setFooter(new Date());

    //adding fields based on type
    if (roleLogs.changes[0].key === '$add') {
      roleEmbed
        .setTitle('Role Added')
        .setDescription(`Added <@&${roleId}> to <@${roleLogs.target.id}>`);
    } else if (roleLogs.changes[0].key === '$remove') {
      roleEmbed
        .setTitle('Role Removed')
        .setDescription(`Removed <@&${roleId}> from <@${roleLogs.target.id}>`);
    }

    //sending the messages
    logsChannel.send(roleEmbed).catch(console.error);
  } catch (err) {
    console.log(err);
  }
};

module.exports = changedRoleLog;
