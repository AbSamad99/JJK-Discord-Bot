/*Function to log nickname addition, change and removal*/

const { MessageEmbed } = require('discord.js');

const gifOrPngCheck = require('../../Checks/Other/gifOrPngCheck.js');

const changedNicknameLog = async (newMem, nick, mod) => {
  let changedNicknameEmbed, authorUrl, logsChannel;

  //selcting the log channel
  logsChannel = newMem.guild.channels.cache.get('447513266395283476');

  //setting necessary fields
  changedNicknameEmbed = new MessageEmbed()
    .setColor(15854089)
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
  logsChannel.send(changedNicknameEmbed).catch(console.error);
};

module.exports = changedNicknameLog;
