const Discord = require('discord.js');

export const deleteMessageLog = (msg) => {
  let modChannel = msg.guild.channels.cache.find(
    (ch) => ch.name === 'syed-bot-practice'
  );
  let deletedChannel = msg.channel;
  let delEmbed = new Discord.MessageEmbed()
    .setAuthor(msg.author.tag, msg.author.avatarURL())
    .setTitle(`Message deleted in #${deletedChannel.name}`)
    .setColor(3447003)
    .addField('Message:', msg.content)
    .setFooter(new Date());
  modChannel.send(delEmbed).catch(console.log);
};

export const deleteAttachmentLog = (msg) => {
  let modChannel = msg.guild.channels.cache.find(
    (ch) => ch.name === 'syed-bot-practice'
  );
  let deletedChannel = msg.channel;
  let delEmbed = new Discord.MessageEmbed()
    .setAuthor(msg.author.tag, msg.author.avatarURL())
    .setTitle(`Message deleted in #${deletedChannel.name}`)
    .setColor(3447003)
    .addField('Attachment:', msg.attachments.array()[0].name)
    .setFooter(new Date());
  modChannel.send(delEmbed).catch(console.log);
};

export const editMessageLog = (oldMsg, newMsg) => {
  let modChannel = newMsg.guild.channels.cache.find(
    (ch) => ch.name === 'syed-bot-practice'
  );
  let editedChannel = newMsg.channel;
  let editEmbed = new Discord.MessageEmbed()
    .setAuthor(newMsg.author.tag, newMsg.author.avatarURL())
    .setTitle(`Message edited in #${editedChannel.name}`)
    .setColor(3447003)
    .addField('Before:', oldMsg.content)
    .addField('After:', newMsg.content)
    .setFooter(new Date());
  modChannel.send(editEmbed).catch(console.log);
};

export const addedNicknameLog = (oldMem, newMem) => {
  let modChannel = newMem.guild.channels.cache.find(
    (ch) => ch.name === 'syed-bot-practice'
  );
  let addedNicknameEmbed = new Discord.MessageEmbed()
    .setAuthor(newMem.user.tag, newMem.user.avatarURL())
    .setTitle(`Nickname added`)
    .setColor(3447003)
    .addField('Before:', oldMem.displayName)
    .addField('After:', newMem.nickname)
    .setFooter(new Date());
  modChannel.send(addedNicknameEmbed).catch(console.log);
};

export const removedNicknameLog = (oldMem, newMem) => {
  let modChannel = newMem.guild.channels.cache.find(
    (ch) => ch.name === 'syed-bot-practice'
  );
  let removedNicknameEmbed = new Discord.MessageEmbed()
    .setAuthor(newMem.user.tag, newMem.user.avatarURL())
    .setTitle(`Nickname removed`)
    .setColor(3447003)
    .addField('Before:', oldMem.nickname)
    .addField('After:', newMem.displayName)
    .setFooter(new Date());
  modChannel.send(removedNicknameEmbed).catch(console.log);
};

export const changedNicknameLog = (oldMem, newMem) => {
  let modChannel = newMem.guild.channels.cache.find(
    (ch) => ch.name === 'syed-bot-practice'
  );
  let changedNicknameEmbed = new Discord.MessageEmbed()
    .setAuthor(newMem.user.tag, newMem.user.avatarURL())
    .setTitle(`Nickname changed`)
    .setColor(3447003)
    .addField('Before:', oldMem.nickname)
    .addField('After:', newMem.nickname)
    .setFooter(new Date());
  modChannel.send(changedNicknameEmbed).catch(console.log);
};

export const changedAvatarLog = (oldMem, newMem) => {
  let modChannel = newMem.guild.channels.cache.find(
    (ch) => ch.name === 'syed-bot-practice'
  );
  let changedAvatarEmbed = new Discord.MessageEmbed()
    .setAuthor(newMem.user.tag, newMem.user.avatarURL())
    .setTitle(`Avatar changed`)
    .setColor(3447003)
    .setImage(`${newMem.user.avatarURL()}?size=1024`)
    .setDescription(`<@${newMem.user.id}>`)
    .setFooter(new Date());
  modChannel.send(changedAvatarEmbed).catch(console.log);
};
