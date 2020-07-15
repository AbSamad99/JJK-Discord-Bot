const Discord = require('discord.js');
const createEmbed = require('../Helpers/createEmbed.js');

//Logs deleted messages or attachments and who deleted them
export const deleteMessageAndAttachmentLog = (msg, type, excecuter, target) => {
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

    if (!excecuter && !target) {
      //self delete
      authorName = msg.author.tag;
      authorUrl = msg.author.displayAvatarURL();
      field1.content = `<@${msg.author.id}>`;
    } else {
      //mod delete
      authorName = excecuter.tag;
      authorUrl = excecuter.displayAvatarURL();
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
  } catch (err) {
    console.log(err);
  }
};

//logs role addition/removal
export const changedRoleLog = (newMem, target, roleId, type, excecuter) => {
  try {
    let roleEmbed, authorName, authorUrl, title, color, description;

    //selcting the log channel
    let modChannel = newMem.guild.channels.cache.find(
      (ch) => ch.name === 'syed-bot-practice'
    );

    //setting commom fields
    authorName = excecuter.tag;
    authorUrl = excecuter.displayAvatarURL();
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
    changedUsernameEmbed = createEmbed.createEmbed(
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
    changedAvatarEmbed = createEmbed.createEmbed(
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
