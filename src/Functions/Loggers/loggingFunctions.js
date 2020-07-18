const Discord = require('discord.js');

import { createEmbed } from '../Helpers/createEmbed.js';
import { checkIfGifOrPng } from '../Helpers/checkIfGifOrPng.js';

//Logs deleted messages or attachments and who deleted them
export const deleteMessageAndAttachmentLog = async (
  msg,
  type,
  executor,
  target
) => {
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
      authorUrl = await checkIfGifOrPng(msg.author);
      field1.content = `<@${msg.author.id}>`;
    } else {
      //mod delete
      authorName = executor.tag;
      authorUrl = await checkIfGifOrPng(executor);
      field1.content = `<@${target.id}>`;
    }

    thumbnail = authorUrl;

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
export const editMessageLog = async (oldMsg, newMsg) => {
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
    authorUrl = await checkIfGifOrPng(newMsg.author);
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
export const changedNicknameLog = async (
  newMem,
  oldNick,
  newNick,
  type,
  mod
) => {
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

    //seeing if user edited nickname or a mod
    if (!mod) {
      authorName = newMem.user.tag;
      authorUrl = await checkIfGifOrPng(newMem.user);
    } else {
      authorName = mod.tag;
      authorUrl = await checkIfGifOrPng(mod);
    }

    thumbnail = authorUrl;
    console.log(authorUrl);

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
export const changedRoleLog = async (
  newMem,
  target,
  roleId,
  type,
  executor
) => {
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

//logs username changes
export const changedUsernameAndDiscriminatorLog = async (
  newMem,
  user,
  type
) => {
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
    authorUrl = await checkIfGifOrPng(newMem.user);
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
export const changedAvatarLog = async (newMem, user) => {
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
    authorUrl = await checkIfGifOrPng(newMem.user);
    title = 'Avatar Changed';
    color = 3447003;
    image = await checkIfGifOrPng(null, user);
    description = `<@${newMem.user.id}> has updated their avatar from the one below to the one on the right`;
    thumbnail = authorUrl;

    console.log(authorUrl);
    console.log(image);

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
export const userJoinLog = async (mem, modChannel) => {
  try {
    let joinEmbed, authorName, authorUrl, title, color, thumbnail, description;

    //setting relevant fields
    authorName = mem.user.tag;
    authorUrl = await checkIfGifOrPng(mem.user);
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
export const userKickLog = async (
  kickAuditLog,
  msg,
  modChannel,
  toKick,
  reason
) => {
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
      authorUrl = await checkIfGifOrPng(kickAuditLog.executor);
      thumbnail = await checkIfGifOrPng(kickAuditLog.target);
      description = `<@${kickAuditLog.target.id}> has been kicked from the server.`;
      field1.content = kickAuditLog.reason;
      if (!field1.content) field1.content = 'No Reason was provided';
    } else {
      authorName = msg.author.tag;
      authorUrl = await checkIfGifOrPng(msg.author);
      thumbnail = await checkIfGifOrPng(toKick.user);
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

export const userLeaveLog = async (mem, modChannel) => {
  try {
    let leaveEmbed, authorName, authorUrl, title, color, description;

    //setting relevant fields
    authorName = mem.user.tag;
    authorUrl = await checkIfGifOrPng(mem.user);
    title = 'Member Left';
    color = 3447003;
    description = `<@${mem.user.id}> has left the server`;

    //creating the embed
    leaveEmbed = createEmbed(
      authorName,
      authorUrl,
      title,
      color,
      null,
      null,
      null,
      description
    );

    modChannel.send(leaveEmbed).catch(console.logy);
  } catch (err) {
    console.log(err);
  }
};

//logs when user is banned from the server
export const userBanLog = async (
  banAuditLog,
  msg,
  modChannel,
  toBan,
  reason
) => {
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
      authorUrl = await checkIfGifOrPng(banAuditLog.executor);
      thumbnail = await checkIfGifOrPng(banAuditLog.target);
      description = `<@${banAuditLog.target.id}> has been Banned from the server.`;
      field1.content = banAuditLog.reason;
      if (!field1.content) field1.content = 'No Reason was provided';
    } else {
      authorName = msg.author.tag;
      authorUrl = await checkIfGifOrPng(msg.author);
      thumbnail = await checkIfGifOrPng(toBan.user);
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

//logs when user is banned from the server
export const userBanRemoveLog = async (banRemovalAuditLog, modChannel) => {
  try {
    let banRemovalEmbed,
      authorName,
      authorUrl,
      title,
      color,
      thumbnail,
      description;

    //setting relevant fields
    authorName = banRemovalAuditLog.executor.tag;
    authorUrl = await checkIfGifOrPng(banRemovalAuditLog.executor);
    title = 'Member Unbanned';
    color = 3447003;
    thumbnail = await checkIfGifOrPng(banRemovalAuditLog.target);
    description = `<@${banRemovalAuditLog.target.id}> has been Unbanned.`;

    //creating the embed
    banRemovalEmbed = createEmbed(
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
    modChannel.send(banRemovalEmbed).catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

//logs when messages are purged
export const messageBulkDeleteLog = (msgs) => {
  try {
    let modChannel, messageArray, delEmbed;
    modChannel = msgs
      .array()[0]
      .guild.channels.cache.find((ch) => ch.name === 'syed-bot-practice');
    messageArray = msgs.array();
    for (let i = messageArray.length - 1; i >= 1; i--) {
      delEmbed = new Discord.MessageEmbed()
        .setAuthor(
          messageArray[i].author.tag,
          messageArray[i].author.displayAvatarURL()
        )
        .setTitle(`Message deleted in ${messageArray[i].channel.name}`)
        .addField('Message:', messageArray[i].content)
        .setColor(3447003)
        .setFooter(new Date());
      modChannel.send(delEmbed);
    }
  } catch (err) {
    console.log(err);
  }
};
