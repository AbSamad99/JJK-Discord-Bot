const Discord = require('discord.js');

const gifOrPngCheck = require('../Checks/gifOrPngCheck.js');

//logs nickname addition, change and removal
const changedNicknameLog = async (newMem, nick, mod) => {
  try {
    let changedNicknameEmbed, authorUrl, logsChannel;

    //selcting the log channel
    logsChannel = newMem.guild.channels.cache.find((ch) => ch.name === 'logs');

    //setting necessary fields

    changedNicknameEmbed = new Discord.MessageEmbed()
      .setColor(3447003)
      .setFooter(new Date());

    //seeing if user edited nickname or a mod
    if (!mod) {
      authorUrl = await gifOrPngCheck(newMem.user);
      changedNicknameEmbed
        .setAuthor(newMem.user.tag, authorUrl)
        .setThumbnail(authorUrl);
    } else {
      changedNicknameEmbed
        .setAuthor(mod.tag, await gifOrPngCheck(mod))
        .setThumbnail(await gifOrPngCheck(newMem.user));
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
    logsChannel.send(changedNicknameEmbed).catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

module.exports = changedNicknameLog;
