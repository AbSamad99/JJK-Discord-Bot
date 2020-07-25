const Discord = require('discord.js');

const checkIfGifOrPng = require('../Helpers/checkIfGifOrPng.js');

//logs nickname addition, change and removal
const changedNicknameLog = async (newMem, nick, mod) => {
  try {
    let changedNicknameEmbed, authorUrl, thumbnail;

    //selcting the log channel
    let modChannel = newMem.guild.channels.cache.find(
      (ch) => ch.name === 'syed-bot-practice'
    );

    //setting necessary fields

    changedNicknameEmbed = new Discord.MessageEmbed()
      .setColor(3447003)
      .setFooter(new Date());

    //seeing if user edited nickname or a mod
    if (!mod) {
      authorUrl = await checkIfGifOrPng(newMem.user);
      changedNicknameEmbed
        .setAuthor(newMem.user.tag, authorUrl)
        .setThumbnail(authorUrl);
    } else {
      authorUrl = await checkIfGifOrPng(mod);
      thumbnail = await checkIfGifOrPng(newMem.user);
      changedNicknameEmbed
        .setAuthor(mod.tag, authorUrl)
        .setThumbnail(thumbnail);
    }

    //determining type of nickname edit
    if (!nick.old && nick.new) {
      changedNicknameEmbed
        .setTitle(`Nickname added for ${newMem.user.tag}`)
        .addField('Before:', newMem.user.username)
        .addField('After:', nick.new);
    } else if (nick.old && !nick.new) {
      changedNicknameEmbed
        .setTitle(`Nickname removed for ${newMem.user.tag}`)
        .addField('Before:', nick.old)
        .addField('After:', newMem.user.username);
    } else if (nick.old && nick.new && nick.old !== nick.new) {
      changedNicknameEmbed
        .setTitle(`Nickname changed for ${newMem.user.tag}`)
        .addField('Before:', nick.old)
        .addField('After:', nick.new);
    }

    //sending the messages
    modChannel.send(changedNicknameEmbed).catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

module.exports = changedNicknameLog;
