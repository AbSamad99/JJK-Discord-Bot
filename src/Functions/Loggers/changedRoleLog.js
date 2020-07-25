const Discord = require('discord.js');

const checkIfGifOrPng = require('../Helpers/checkIfGifOrPng.js');

//logs role addition/removal
const changedRoleLog = async (newMem, roleLogs, roleId) => {
  try {
    let roleEmbed, authorUrl;

    //selcting the log channel
    let modChannel = newMem.guild.channels.cache.find(
      (ch) => ch.name === 'syed-bot-practice'
    );

    //getting url
    authorUrl = await checkIfGifOrPng(roleLogs.executor);

    roleEmbed = new Discord.MessageEmbed()
      .setAuthor(roleLogs.executor.tag, authorUrl)
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
    modChannel.send(roleEmbed).catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

module.exports = changedRoleLog;
