const Discord = require('discord.js');
const createEmbed = require('./Helpers/createEmbed.js');

//Logs deleted messages or attachments and who deleted them
export const deleteMessageAndAttachmentLog = (msg, type, excecuter, target) => {
  let delEmbed, authorName, authorUrl, title, color, field1, field2, thumbnail;

  //selecting logs channel
  let modChannel = msg.guild.channels.cache.find(
    (ch) => ch.name === 'syed-bot-practice'
  );

  //selecting channel where message was deleted
  let deletedChannel = msg.channel;

  //setting common fields for both cases
  thumbnail = msg.author.avatarURL();
  title = `Message deleted in #${deletedChannel.name}`;
  field2 = { title: 'Message:', content: '' };
  field1 = { title: 'Author:', content: '' };
  color = 3447003;

  //finding if message or attachment was deleted
  if (type === 'message') {
    field2.content = msg.content;
  } else if (type === 'attachment') {
    field2.content = msg.attachments.array()[0].name;
  }

  if (!excecuter && !target) {
    //self delete
    authorName = msg.author.tag;
    authorUrl = msg.author.avatarURL();
    field1.content = `<@${msg.author.id}>`;
  } else {
    //mod delete
    authorName = excecuter.tag;
    authorUrl = excecuter.avatarURL();
    field1.content = `<@${target.id}>`;
  }

  //creating the embed
  delEmbed = createEmbed.createEmbed(
    authorName,
    authorUrl,
    title,
    color,
    field1,
    field2,
    thumbnail
  );

  //sending the embeded message
  modChannel.send(delEmbed).catch(console.log);
};

//logs edited messages
export const editMessageLog = (oldMsg, newMsg) => {
  let editEmbed, authorName, authorUrl, title, color, field1, field2;

  //selecting log channel
  let modChannel = newMsg.guild.channels.cache.find(
    (ch) => ch.name === 'syed-bot-practice'
  );

  //slecting channel where message was edited
  let editedChannel = newMsg.channel;

  //setting the fields
  authorName = newMsg.author.tag;
  authorUrl = newMsg.author.avatarURL();
  title = `Message edited in #${editedChannel.name}`;
  color = 3447003;
  field1 = { title: 'Before:', content: oldMsg.content };
  field2 = { title: 'After:', content: newMsg.content };

  //creating the embed
  editEmbed = createEmbed.createEmbed(
    authorName,
    authorUrl,
    title,
    color,
    field1,
    field2
  );

  //sending message to logs
  modChannel.send(editEmbed).catch(console.log);
};

//logs nickname addition, change and removal
export const changedNicknameLog = (newMem, oldNick, newNick, type, mod) => {
  let changedNicknameEmbed,
    authorName,
    authorUrl,
    title,
    color,
    field1,
    field2,
    thumbnail;

  //selcting the log channel
  let modChannel = newMem.guild.channels.cache.find(
    (ch) => ch.name === 'syed-bot-practice'
  );

  //setting necessary fields
  color = 3447003;
  field1 = { title: 'Before:', content: '' };
  field2 = { title: 'After:', content: '' };
  thumbnail = newMem.user.avatarURL();

  //seeing if user edited nickname or a mod
  if (!mod) {
    authorName = newMem.user.tag;
    authorUrl = newMem.user.avatarURL();
  } else {
    authorName = mod.tag;
    authorUrl = mod.avatarURL();
  }

  //determining type of nickname edit
  if (type === 'add') {
    title = `Nickname added for ${newMem.user.tag}`;
    field1.content = newMem.user.username;
    field2.content = newNick;
  } else if (type === 'remove') {
    title = `Nickname removed for ${newMem.user.tag}`;
    field1.content = oldNick;
    field2.content = newMem.user.username;
  } else if (type === 'edit') {
    title = `Nickname changed for ${newMem.user.tag}`;
    field1.content = oldNick;
    field2.content = newNick;
  }

  //creating the embed
  changedNicknameEmbed = createEmbed.createEmbed(
    authorName,
    authorUrl,
    title,
    color,
    field1,
    field2,
    thumbnail
  );

  //sending the messages
  modChannel.send(changedNicknameEmbed).catch(console.log);
};

//logs role addition/removal
export const changedRoleLog = (newMem, target, roleId, type, excecuter) => {
  let roleEmbed, authorName, authorUrl, title, color, description;

  //selcting the log channel
  let modChannel = newMem.guild.channels.cache.find(
    (ch) => ch.name === 'syed-bot-practice'
  );

  //setting commom fields
  authorName = excecuter.tag;
  authorUrl = excecuter.avatarURL();
  color = 3447003;

  //adding fields based on type
  if (type === 'add') {
    title = 'Role Added';
    description = `Added <@&${roleId}> to <@${target.id}>`;
  } else if (type === 'remove') {
    title = 'Role Removed';
    description = `Removed <@&${roleId}> from <@${target.id}>`;
  } else if (type == 'mute') {
    title = 'User Muted';
    description = `<@${target.id}> has been <@&${roleId}>`;
  } else if (type == 'unmute') {
    title = 'User Unmuted';
    description = `<@${target.id}> is no longer <@&${roleId}>`;
  }

  //creating the embed
  roleEmbed = createEmbed.createEmbed(
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
