const Discord = require('discord.js');

//Logs deleted messages and who deleted them
export const deleteMessageLog = (msg, excecuter, target) => {
  let delEmbed;
  let modChannel = msg.guild.channels.cache.find(
    (ch) => ch.name === 'syed-bot-practice'
  );
  let deletedChannel = msg.channel;
  if (!excecuter && !target) {
    //self delete
    delEmbed = new Discord.MessageEmbed()
      .setAuthor(msg.author.tag, msg.author.avatarURL())
      .setTitle(`Message deleted in #${deletedChannel.name}`)
      .setColor(3447003)
      .setThumbnail(msg.author.avatarURL())
      .addField('Author:', `<@${msg.author.id}>`)
      .addField('Message:', msg.content)
      .setFooter(new Date());
  } else {
    //mod delete
    delEmbed = new Discord.MessageEmbed()
      .setAuthor(excecuter.tag, excecuter.avatarURL())
      .setTitle(`Message deleted in #${deletedChannel.name}`)
      .setColor(3447003)
      .setThumbnail(msg.author.avatarURL())
      .addField('Author:', `<@${target.id}>`)
      .addField('Message:', msg.content)
      .setFooter(new Date());
  }
  modChannel.send(delEmbed).catch(console.log);
};

//Logs deleted attachments and who deleted them
export const deleteAttachmentLog = (msg, excecuter, target) => {
  let modChannel = msg.guild.channels.cache.find(
    (ch) => ch.name === 'syed-bot-practice'
  );
  let deletedChannel = msg.channel;
  let delEmbed;
  if (!excecuter && !target) {
    console.log(msg.attachments.array()[0].proxyURL);
    //self delete
    delEmbed = new Discord.MessageEmbed()
      .setAuthor(msg.author.tag, msg.author.avatarURL())
      .setTitle(`Attachment deleted in #${deletedChannel.name}`)
      .setColor(3447003)
      .setThumbnail(msg.author.avatarURL())
      .addField('Author:', `<@${msg.author.id}>`)
      .addField('Attachment:', msg.attachments.array()[0].name)
      .setFooter(new Date());
  } else {
    //mod delete
    delEmbed = new Discord.MessageEmbed()
      .setAuthor(excecuter.tag, excecuter.avatarURL())
      .setTitle(`Attachment deleted in #${deletedChannel.name}`)
      .setColor(3447003)
      .setThumbnail(msg.author.avatarURL())
      .addField('Author:', `<@${target.id}>`)
      .addField('Attachment:', msg.attachments.array()[0].name)
      .setFooter(new Date());
  }
  modChannel.send(delEmbed).catch(console.log);
};

//logs edited messages
export const editMessageLog = (oldMsg, newMsg) => {
  let modChannel = newMsg.guild.channels.cache.find(
    (ch) => ch.name === 'syed-bot-practice'
  );
  let editedChannel = newMsg.channel;
  let editEmbed = new Discord.MessageEmbed()
    .setAuthor(newMsg.author.tag, newMsg.author.avatarURL())
    .setTitle(`Message edited in #${editedChannel.name}`)
    .setColor(3447003)
    .setThumbnail(newMsg.author.avatarURL())
    .addField('Before:', oldMsg.content)
    .addField('After:', newMsg.content)
    .setFooter(new Date());
  modChannel.send(editEmbed).catch(console.log);
};

//logs nickname addition
export const addedNicknameLog = (newMem, newNick) => {
  let modChannel = newMem.guild.channels.cache.find(
    (ch) => ch.name === 'syed-bot-practice'
  );
  let addedNicknameEmbed = new Discord.MessageEmbed()
    .setAuthor(newMem.user.tag, newMem.user.avatarURL())
    .setTitle(`Nickname added`)
    .setColor(3447003)
    .setThumbnail(newMem.user.avatarURL())
    .addField('Before:', newMem.user.username)
    .addField('After:', newNick)
    .setFooter(new Date());
  modChannel.send(addedNicknameEmbed).catch(console.log);
};

//logs nickname removal
export const removedNicknameLog = (newMem, oldNick) => {
  let modChannel = newMem.guild.channels.cache.find(
    (ch) => ch.name === 'syed-bot-practice'
  );
  let removedNicknameEmbed = new Discord.MessageEmbed()
    .setAuthor(newMem.user.tag, newMem.user.avatarURL())
    .setTitle(`Nickname removed`)
    .setColor(3447003)
    .setThumbnail(newMem.user.avatarURL())
    .addField('Before:', oldNick)
    .addField('After:', newMem.user.username)
    .setFooter(new Date());
  modChannel.send(removedNicknameEmbed).catch(console.log);
};

//logs nickname changes
export const changedNicknameLog = (newMem, oldNick, newNick) => {
  let modChannel = newMem.guild.channels.cache.find(
    (ch) => ch.name === 'syed-bot-practice'
  );
  let changedNicknameEmbed = new Discord.MessageEmbed()
    .setAuthor(newMem.user.tag, newMem.user.avatarURL())
    .setTitle(`Nickname changed`)
    .setColor(3447003)
    .setThumbnail(newMem.user.avatarURL())
    .addField('Before:', oldNick)
    .addField('After:', newNick)
    .setFooter(new Date());
  modChannel.send(changedNicknameEmbed).catch(console.log);
};

//logs username changes
export const changedUsername = (newMem, oldUsn, newUsn) => {
  let modChannel = newMem.guild.channels.cache.find(
    (ch) => ch.name === 'syed-bot-practice'
  );
  let changedNicknameEmbed = new Discord.MessageEmbed()
    .setAuthor(newMem.user.tag, newMem.user.avatarURL())
    .setThumbnail(newMem.user.avatarURL())
    .setTitle(`Nickname changed`)
    .setColor(3447003)
    .addField('Before:', oldNick)
    .addField('After:', newNick)
    .setFooter(new Date());
  modChannel.send(changedNicknameEmbed).catch(console.log);
};

//logs avatar updates-needs work
export const changedAvatarLog = (oldMem, newMem) => {
  let modChannel = newMem.guild.channels.cache.find(
    (ch) => ch.name === 'syed-bot-practice'
  );
  let user = newMem.guild.members.cache.find(
    (mem) => mem.id === newMem.user.id
  );
  // console.log(user.id);
  if (!user) return;
  // console.log('passed');
  let changedAvatarEmbed = new Discord.MessageEmbed()
    .setAuthor(newMem.user.tag, newMem.user.avatarURL())
    .setTitle(`Avatar changed`)
    .setColor(3447003)
    .setImage(`${newMem.user.avatarURL()}?size=1024`)
    .setDescription(`<@${newMem.user.id}>`)
    .setFooter(new Date());
  modChannel.send(changedAvatarEmbed).catch(console.log);
};
