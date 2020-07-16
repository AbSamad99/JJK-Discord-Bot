const Discord = require('discord.js');

import { createEmbed } from '../Helpers/createEmbed.js';

//Logs deleted messages or attachments and who deleted them
export const deleteMessageAndAttachmentLog = (msg, type, executor, target) => {
  try {
    let delEmbed,
      authorName,
      authorUrl,
      title,
      color,
      field1,
      field2,
      thumbnail;

    //selecting logs channel
    let modChannel = msg.guild.channels.cache.find(
      (ch) => ch.name === 'syed-bot-practice'
    );

    //selecting channel where message was deleted
    let deletedChannel = msg.channel;

    //setting common fields for both cases
    thumbnail = msg.author.displayAvatarURL();
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

    if (!executor && !target) {
      //self delete
      authorName = msg.author.tag;
      authorUrl = msg.author.displayAvatarURL();
      field1.content = `<@${msg.author.id}>`;
    } else {
      //mod delete
      authorName = executor.tag;
      authorUrl = executor.displayAvatarURL();
      field1.content = `<@${target.id}>`;
    }

    //creating the embed
    delEmbed = createEmbed(
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
  } catch (err) {
    console.log(err);
  }
};

//logs edited messages
export const editMessageLog = (oldMsg, newMsg) => {
  try {
    let editEmbed, authorName, authorUrl, title, color, field1, field2;

    //selecting log channel
    let modChannel = newMsg.guild.channels.cache.find(
      (ch) => ch.name === 'syed-bot-practice'
    );

    //slecting channel where message was edited
    let editedChannel = newMsg.channel;

    //setting the fields
    authorName = newMsg.author.tag;
    authorUrl = newMsg.author.displayAvatarURL();
    title = `Message edited in #${editedChannel.name}`;
    color = 3447003;
    field1 = { title: 'Before:', content: oldMsg.content };
    field2 = { title: 'After:', content: newMsg.content };

    //creating the embed
    editEmbed = createEmbed(
      authorName,
      authorUrl,
      title,
      color,
      field1,
      field2
    );

    //sending message to logs
    modChannel.send(editEmbed).catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

//logs nickname addition, change and removal
export const changedNicknameLog = (newMem, oldNick, newNick, type, mod) => {
  try {
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
    thumbnail = newMem.user.displayAvatarURL();

    //seeing if user edited nickname or a mod
    if (!mod) {
      authorName = newMem.user.tag;
      authorUrl = newMem.user.displayAvatarURL();
    } else {
      authorName = mod.tag;
      authorUrl = mod.displayAvatarURL();
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
    changedNicknameEmbed = createEmbed(
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
  } catch (err) {
    console.log(err);
  }
};

//logs role addition/removal
export const changedRoleLog = (newMem, target, roleId, type, executor) => {
  try {
    let roleEmbed, authorName, authorUrl, title, color, description;

    //selcting the log channel
    let modChannel = newMem.guild.channels.cache.find(
      (ch) => ch.name === 'syed-bot-practice'
    );

    //setting commom fields
    authorName = executor.tag;
    authorUrl = executor.displayAvatarURL();
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

//logs username changes
export const changedUsernameAndDiscriminatorLog = (newMem, user, type) => {
  try {
    let modChannel,
      changedUsernameEmbed,
      authorName,
      authorUrl,
      title,
      color,
      field1,
      field2,
      description;

    //selecting logs channel
    modChannel = newMem.guild.channels.cache.find(
      (ch) => ch.name === 'syed-bot-practice'
    );

    //setting relevant fields
    authorName = newMem.user.tag;
    authorUrl = newMem.user.displayAvatarURL();
    color = 3447003;
    field1 = { title: 'Before:', content: '' };
    field2 = { title: 'After', content: '' };

    //deciding between Username and discriminator logs
    if (type === 'username') {
      title = 'Username Changed';
      description = `<@${newMem.user.id}> has changed their userame`;
      field1.content = user.name;
      field2.content = newMem.user.username;
    } else if (type === 'discriminator') {
      title = 'Discriminator Changed';
      description = `<@${newMem.user.id}> has changed their discriminator`;
      field1.content = user.discriminator;
      field2.content = newMem.user.discriminator;
    }

    //creating the embed
    changedUsernameEmbed = createEmbed(
      authorName,
      authorUrl,
      title,
      color,
      field1,
      field2,
      null,
      description
    );

    //sending to logs channel
    modChannel.send(changedUsernameEmbed).catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

//logs avatar updates
export const changedAvatarLog = (newMem, user) => {
  try {
    let modChannel,
      changedAvatarEmbed,
      authorName,
      authorUrl,
      title,
      color,
      thumbnail,
      description,
      image;

    //selecting the logs channel
    modChannel = newMem.guild.channels.cache.find(
      (ch) => ch.name === 'syed-bot-practice'
    );

    //setting relevant fields
    authorName = newMem.user.tag;
    authorUrl = newMem.user.displayAvatarURL();
    title = 'Avatar Changed';
    color = 3447003;
    image = user.avatar;
    description = `<@${newMem.user.id}> has updated their avatar from the one below to the one on the right`;
    thumbnail = authorUrl;

    //creating embed
    changedAvatarEmbed = createEmbed(
      authorName,
      authorUrl,
      title,
      color,
      null,
      null,
      thumbnail,
      description,
      image
    );

    //sending to the logs
    modChannel.send(changedAvatarEmbed).catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

//logs when user joins the server
export const userJoinLog = (mem, modChannel) => {
  try {
    let joinEmbed, authorName, authorUrl, title, color, thumbnail, description;

    //setting relevant fields
    authorName = mem.user.tag;
    authorUrl = mem.user.displayAvatarURL();
    title = 'Member Joined';
    color = 3447003;
    thumbnail = authorUrl;
    description = `<@${mem.user.id}> has joined the server. The total number of users is now at ${mem.guild.memberCount}`;

    //creating the embed
    joinEmbed = createEmbed(
      authorName,
      authorUrl,
      title,
      color,
      null,
      null,
      thumbnail,
      description
    );

    //logging
    modChannel.send(joinEmbed).catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

//logs when user is kicked from the server
export const userKickLog = (kickAuditLog, msg, modChannel, toKick, reason) => {
  try {
    let kickEmbed,
      authorName,
      authorUrl,
      title,
      color,
      field1,
      thumbnail,
      description;

    //setting relevant fields
    title = 'Member Kicked';
    color = 3447003;
    field1 = { title: 'Reason:', content: '' };

    if (!msg) {
      authorName = kickAuditLog.executor.tag;
      authorUrl = kickAuditLog.executor.displayAvatarURL();
      thumbnail = kickAuditLog.target.displayAvatarURL();
      description = `<@${kickAuditLog.target.id}> has been kicked from the server.`;
      field1.content = kickAuditLog.reason;
      if (!field1.content) field1.content = 'No Reason was provided';
    } else {
      authorName = msg.author.tag;
      authorUrl = msg.author.displayAvatarURL();
      thumbnail = toKick.user.displayAvatarURL();
      description = `<@${toKick.user.id}> has been kicked from the server.`;
      field1.content = reason;
    }

    //creating the embed
    kickEmbed = createEmbed(
      authorName,
      authorUrl,
      title,
      color,
      field1,
      null,
      thumbnail,
      description
    );

    //logging
    modChannel.send(kickEmbed).catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

//logs when user is banned from the server
export const userBanLog = (banAuditLog, msg, modChannel, toBan, reason) => {
  try {
    let banEmbed,
      authorName,
      authorUrl,
      title,
      color,
      field1,
      thumbnail,
      description;

    //setting relevant fields
    title = 'Member Banned';
    color = 3447003;
    field1 = { title: 'Reason:', content: '' };

    if (!msg) {
      authorName = banAuditLog.executor.tag;
      authorUrl = banAuditLog.executor.displayAvatarURL();
      thumbnail = banAuditLog.target.displayAvatarURL();
      description = `<@${banAuditLog.target.id}> has been Banned from the server.`;
      field1.content = banAuditLog.reason;
      if (!field1.content) field1.content = 'No Reason was provided';
    } else {
      authorName = msg.author.tag;
      authorUrl = msg.author.displayAvatarURL();
      thumbnail = toBan.user.displayAvatarURL();
      description = `<@${toBan.user.id}> has been Banned from the server.`;
      field1.content = reason;
    }

    //creating the embed
    banEmbed = createEmbed(
      authorName,
      authorUrl,
      title,
      color,
      field1,
      null,
      thumbnail,
      description
    );

    //logging
    modChannel.send(banEmbed).catch(console.log);
  } catch (err) {
    console.log(err);
  }
};
