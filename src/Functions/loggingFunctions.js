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
    .addField('Deleted at:', msg.createdAt);
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
    .addField('Deleted at:', msg.createdAt);
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
    .addField('Edited at:', newMsg.createdAt);
  modChannel.send(editEmbed).catch(console.log);
};
