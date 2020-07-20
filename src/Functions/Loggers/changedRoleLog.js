const Discord = require('discord.js');

const createEmbed = require('../Helpers/createEmbed.js');
const checkIfGifOrPng = require('../Helpers/checkIfGifOrPng.js');

//logs role addition/removal
const changedRoleLog = async (newMem, target, roleId, type, executor) => {
  try {
    let roleEmbed, authorName, authorUrl, title, color, description;

    //selcting the log channel
    let modChannel = newMem.guild.channels.cache.find(
      (ch) => ch.name === 'syed-bot-practice'
    );

    //setting commom fields
    authorName = executor.tag;
    authorUrl = await checkIfGifOrPng(executor);
    color = 3447003;

    //adding fields based on type
    if (type === 'add') {
      title = 'Role Added';
      description = `Added <@&${roleId}> to <@${target.id}>`;
    } else if (type === 'remove') {
      title = 'Role Removed';
      description = `Removed <@&${roleId}> from <@${target.id}>`;
    }

    //creating the embed
    roleEmbed = createEmbed(
      authorName,
      authorUrl,
      title,
      color,
      null,
      null,
      null,
      description
    );

    //sending the messages
    modChannel.send(roleEmbed).catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

module.exports = changedRoleLog;
