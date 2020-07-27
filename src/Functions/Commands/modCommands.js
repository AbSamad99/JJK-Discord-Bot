const Discord = require('discord.js');
const fs = require('fs');
const urlExist = require('url-exist');

const UserSchema = require('../../Schemas/UserSchema.js');

const { assignMuteRole } = require('../Roles/roleFunctions.js');
const userKickLog = require('../Loggers/userKickLog.js');
const userBanLog = require('../Loggers/userBanLog.js');
const { channelCheck, roleCheck } = require('../Checks/helperChecks.js');
const checkIfGifOrPng = require('../Helpers/checkIfGifOrPng.js');

//command to help with chapter announcement
const chapterAnnouncement = async (msg) => {
  try {
    let mangaNewsRole = msg.guild.roles.cache
      .array()
      .find((role) => role.name === 'Manga News');
    let announcementChannel = msg.guild.channels.cache.find(
      (ch) => ch.name === 'announcements'
    );
    let temp = msg.content.slice(1);
    temp = temp.split(' ');
    let chapterNumber = temp[1];
    let vizLink = temp[2];
    if (!(await urlExist(vizLink))) {
      msg.channel.send('Viz link is invalid').catch(console.log);
      return;
    }
    let mpLink = temp[3];
    if (!(await urlExist(mpLink))) {
      msg.channel.send('Manga Plus link is invalid').catch(console.log);
      return;
    }
    let replyMessage = `<@&${mangaNewsRole.id}> Chapter ${chapterNumber} is out!
      
Viz: ${vizLink}
          
Manga Plus: ${mpLink}`;
    if (temp[1] && temp[2] && temp[3]) {
      if (channelCheck(msg, 'syed-bot-practice')) {
        msg.channel.send(replyMessage).catch(console.log);
      } else if (channelCheck(msg, 'mod-bots')) {
        announcementChannel.send(replyMessage).catch(console.log);
      }
    } else {
      msg.channel
        .send('Please follow the proper syntax of the command')
        .catch(console.log);
    }
  } catch (err) {
    console.log(err);
  }
};

//command to help with poll announcement
const pollAnnouncement = (msg) => {
  try {
    let announcementChannel = msg.guild.channels.cache
      .array()
      .find((ch) => ch.name === 'announcements');
    let temp = msg.content.slice(1);
    temp = temp.split(' ');
    let pollNumber = Number(temp[1]);
    let replyMessage = `<:globe_with_meridians:729386644259471390> Chapter ${pollNumber} rating. <:globe_with_meridians:729386644259471390>
            
\:five: Great
\:four: Good
\:three: Okay 
\:two: Bad
\:one: Awful`;
    if (pollNumber) {
      if (channelCheck(msg, 'syed-bot-practice')) {
        msg.channel
          .send(replyMessage)
          .then((botMsg) => {
            botMsg.react('5️⃣');
            botMsg.react('4️⃣');
            botMsg.react('3️⃣');
            botMsg.react('2️⃣');
            botMsg.react('1️⃣');
          })
          .catch(console.log);
      } else if (channelCheck(msg, 'mod-bots')) {
        announcementChannel
          .send(replyMessage)
          .then((botMsg) => {
            botMsg.react('5️⃣');
            botMsg.react('4️⃣');
            botMsg.react('3️⃣');
            botMsg.react('2️⃣');
            botMsg.react('1️⃣');
          })
          .catch(console.log);
      }
    } else {
      msg.channel.send('Please provide a number');
    }
  } catch (err) {
    console.log(err);
  }
};

//command to send bot messages
const botMessageCommand = (msg) => {
  try {
    let modBotChannel = msg.guild.channels.cache.find(
      (ch) => ch.name === 'mod-bots'
    );
    if (msg.channel.id !== modBotChannel.id) return;
    let temp = msg.content.slice(1);
    temp = temp.split(' ');
    let temp1 = temp.slice(2);
    let message = temp1.join(' ');
    let messageChannelId = temp[1].slice(2, temp[1].length - 1);
    let messageChannel = msg.guild.channels.cache.find(
      (ch) => ch.id === messageChannelId
    );
    messageChannel.send(message).catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

//command to send bot embedded messages
const botEmbedMessageCommand = async (msg) => {
  try {
    let modBotChannel,
      embeddedMessage,
      temp,
      messageChannelId,
      messageChannel,
      tempArray,
      title,
      desc,
      thumbnail,
      field1,
      field2,
      image;

    modBotChannel = msg.guild.channels.cache.find(
      (ch) => ch.name === 'mod-bots'
    );

    embeddedMessage = new Discord.MessageEmbed();

    if (msg.channel.id !== modBotChannel.id) return;
    temp = msg.content.slice(1);
    temp = temp.split(' ');
    messageChannelId = temp[1].slice(2, temp[1].length - 1);

    messageChannel = msg.guild.channels.cache.find(
      (ch) => ch.id === messageChannelId
    );
    if (!messageChannel) {
      msg.channel.send('Invalid Channel');
      return;
    }
    tempArray = msg.content.split('>');
    tempArray.splice(0, 1);
    for (let i = 1; i < tempArray.length - 1; i++) {
      tempArray[i] = tempArray[i].slice(0, tempArray[i].length - 2);
    }
    title = tempArray[1].split('::');
    desc = tempArray[2].split('::');
    thumbnail = tempArray[3].split('::');
    field1 = tempArray[4].split('::');
    field2 = tempArray[5].split('::');
    image = tempArray[6].split('::');

    if (
      title[0].toLowerCase() !== 'title' ||
      desc[0].toLowerCase() !== 'description' ||
      thumbnail[0].toLowerCase() !== 'thumbnail' ||
      field1[0].toLowerCase() !== 'field1' ||
      field2[0].toLowerCase() !== 'field2' ||
      image[0].toLowerCase() !== 'image'
    ) {
      console.log(
        'Invalid format, please follow the proper syntax of the command'
      );
      return;
    }

    embeddedMessage.setAuthor(
      msg.author.tag,
      await checkIfGifOrPng(msg.author)
    );

    embeddedMessage.setTitle(title[1]);

    embeddedMessage.setDescription(desc[1]);

    if (thumbnail[1].toLowerCase() !== 'null') {
      embeddedMessage.setThumbnail(thumbnail[1]);
    }

    if (field1[1].toLowerCase() !== 'null') {
      field1 = field1[1].split(',,');
      embeddedMessage.addField(field1[0], field1[1]);
    }

    if (field2[1].toLowerCase() !== 'null') {
      field2 = field2[1].split(',,');
      embeddedMessage.addField(field2[0], field2[1]);
    }

    if (image[1].toLowerCase() !== 'null') {
      embeddedMessage.setImage(image[1]);
    } else if (msg.attachments.array()[0]) {
      embeddedMessage.setImage(msg.attachments.array()[0].url);
    }

    messageChannel.send(embeddedMessage).catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

//command to mute users
const muteCommand = (msg) => {
  try {
    let toMute, muteRole, temp, reason, time, logsChannel;
    toMute = msg.mentions.members.array()[0];
    logsChannel = msg.guild.channels.cache.find(
      (ch) => ch.name === 'syed-bot-practice'
    );
    if (!toMute) {
      msg.channel.send('Please mention a user to mute');
      return;
    }
    if (
      roleCheck(toMute, 'Special-Grade Shaman') ||
      roleCheck(toMute, 'admin')
    ) {
      msg.channel.send('You cannot mute this user');
      return;
    }
    muteRole = msg.guild.roles.cache
      .array()
      .find((role) => role.name === 'Muted');
    toMute = msg.guild.member(toMute);
    temp = msg.content.slice(1);
    temp = temp.split(' ');
    if (!temp[2] || !temp[3]) {
      msg.channel.send('Please mention duration of the mute');
      return;
    } else if (
      isNaN(temp[2]) ||
      (temp[3] !== 'm' && temp[3] !== 's' && temp[3] !== 'd' && temp[3] !== 'h')
    ) {
      msg.channel.send('Please specify valid time format');
      return;
    }
    if (toMute.roles.cache.has(muteRole.id)) {
      msg.channel.send('User is Already Muted');
      return;
    }
    if (temp.length > 4) {
      reason = temp.slice(4);
      reason = reason.join(' ');
    } else {
      msg.channel.send('Please provide a reason for mute');
      return;
    }
    time = temp[2].concat(temp[3]);
    assignMuteRole(msg, toMute, muteRole, time, logsChannel, reason);
  } catch (err) {
    console.log(err);
  }
};

//command to kick users
const kickCommand = (msg) => {
  try {
    let toKick, temp, reason, logsChannel;
    toKick = msg.mentions.members.array()[0];
    logsChannel = msg.guild.channels.cache.find(
      (ch) => ch.name === 'syed-bot-practice'
    );
    if (!toKick) {
      msg.channel.send('Please mention a user to kick');
      return;
    }
    if (
      roleCheck(toKick, 'Special-Grade Shaman') ||
      roleCheck(toKick, 'admin')
    ) {
      msg.channel.send('You cannot kick this user');
      return;
    }
    temp = msg.content.slice(1);
    temp = temp.split(' ');
    if (temp.length > 2) {
      reason = temp.slice(2);
      reason = reason.join(' ');
    } else {
      msg.channel.send('Please provide a reason for kick');
      return;
    }

    toKick
      .kick(reason)
      .then(() => {
        userKickLog(null, msg, logsChannel, toKick, reason);
      })
      .catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

//command to ban users
const banCommand = (msg) => {
  try {
    let toBan, temp, reason, logsChannel;
    toBan = msg.mentions.members.array()[0];
    logsChannel = msg.guild.channels.cache.find(
      (ch) => ch.name === 'syed-bot-practice'
    );
    if (!toBan) {
      msg.channel.send('Please mention a user to ban');
      return;
    }
    if (roleCheck(toBan, 'Special-Grade Shaman') || roleCheck(toBan, 'admin')) {
      msg.channel.send('You cannot ban this user');
      return;
    }
    temp = msg.content.slice(1);
    temp = temp.split(' ');
    if (temp.length > 2) {
      reason = temp.slice(2);
      reason = reason.join(' ');
    } else {
      msg.channel.send('Please provide a reason for ban');
      return;
    }
    console.log({
      user: toBan.user.username,
      reason: reason,
    });

    toBan
      .ban({ reason: reason })
      .then(() => {
        userBanLog(null, msg, logsChannel, toBan, reason);
      })
      .catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

//command to purge messages
const purgeCommand = (msg) => {
  try {
    let temp, number, logsChannel;
    logsChannel = msg.guild.channels.cache
      .array()
      .find((ch) => ch.name === 'syed-bot-practice');
    temp = msg.content.slice(1);
    temp = temp.split(' ');
    number = parseInt(temp[1]);
    if (isNaN(number)) {
      msg.channel.send('Please provide a valid number');
      return;
    }
    if (number > 300) {
      msg.channel.send('Please input a lower number');
      return;
    }
    if (msg.channel.id === logsChannel.id) {
      msg.channel.send('Cannot purge messages here');
      return;
    }
    let purgeEmbed = new Discord.MessageEmbed()
      .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
      .setTitle('Messages purged')
      .setDescription(
        `<@${msg.author.id}> has purged ${number - 1} messages in <#${
          msg.channel.id
        }>`
      )
      .setColor(3447003)
      .setFooter(new Date());
    msg.channel
      .bulkDelete(number)
      .then(() => logsChannel.send(purgeEmbed))
      .catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

//command to issue strikes
const strikeCommand = async (msg) => {
  try {
    let toStrike, user, temp, muteRole, reason, logsChannel, strikesCount;

    toStrike = msg.mentions.members.array()[0];
    logsChannel = msg.guild.channels.cache.find(
      (ch) => ch.name === 'syed-bot-practice'
    );
    if (!toStrike) {
      msg.channel.send('Please mention a user to ban');
      return;
    }
    user = await UserSchema.findOne({ id: toStrike.user.id });
    if (!user) {
      await UserSchema.create({
        name: toStrike.user.username,
        id: toStrike.user.id,
        avatarUrl: toStrike.user.displayAvatarURL(),
        avatar: toStrike.user.avatar,
        discriminator: toStrike.user.discriminator,
        strikes: 0,
      });
    }
    if (
      roleCheck(toStrike, 'Special-Grade Shaman') ||
      roleCheck(toStrike, 'admin')
    ) {
      msg.channel.send('You cannot issue strikes to this user');
      return;
    }
    temp = msg.content.slice(1);
    temp = temp.split(' ');
    if (temp.length > 2) {
      reason = temp.slice(2);
      reason = reason.join(' ');
    } else {
      msg.channel.send('Please provide a reason for strike');
      return;
    }

    strikesCount = user.strikes;
    strikesCount++;

    await UserSchema.findOneAndUpdate(
      { id: toStrike.user.id },
      { strikes: strikesCount },
      { useFindAndModify: false }
    );

    user = await UserSchema.findOne({ id: toStrike.user.id });

    let strikeEmbed = new Discord.MessageEmbed()
      .setAuthor(msg.author.tag, await checkIfGifOrPng(msg.author))
      .setTitle('Strike Issued')
      .setColor(3447003)
      .setThumbnail(await checkIfGifOrPng(toStrike.user))
      .setFooter(new Date());
    //1 strike
    if (user.strikes === 1) {
      strikeEmbed.setDescription(`<@${toStrike.user.id}> has been issued a strike for the following reason: ${reason}. 
This is their first strike, therefore they are only being warned. The next strike will result in them being muted for 24 hours`);

      msg.channel
        .send(strikeEmbed)
        .then(() => logsChannel.send(strikeEmbed))
        .catch(console.log);
    }
    //2 strikes
    else if (user.strikes === 2) {
      muteRole = msg.guild.roles.cache
        .array()
        .find((role) => role.name === 'Muted');

      strikeEmbed.setDescription(`<@${toStrike.user.id}> has been issued a strike for the following reason: ${reason}. 
This is their second strike, therefore they shall be muted for 24 hours. The next strike will result in them being kicked from the server`);

      msg.channel
        .send(strikeEmbed)
        .then(() => logsChannel.send(strikeEmbed))
        .then(() =>
          assignMuteRole(
            msg,
            toStrike,
            muteRole,
            '24h',
            logsChannel,
            `Muted for getting issued a 2nd strike for the following reason: ${reason}`
          )
        )
        .catch(console.log);
    }
    //3 strikes
    else if (user.strikes === 3) {
      strikeEmbed.setDescription(`<@${toStrike.user.id}> has been issued a strike for the following reason: ${reason}. 
This is their third strike, therefore they shall be kicked from the server. The next strike will result in them being permanentally banned from the server`);

      msg.channel
        .send(strikeEmbed)
        .then(() => logsChannel.send(strikeEmbed))
        .catch(console.log);

      toStrike
        .kick(
          `Kicked for getting issued a 3rd strike for the following reason: ${reason}`
        )
        .then(() => {
          userKickLog(
            null,
            msg,
            logsChannel,
            toStrike,
            `Kicked for getting issued a 3rd strike for the following reason: ${reason}`
          );
        })
        .catch(console.log);
    }
    //4 strikes
    else if (user.strikes === 4) {
      strikeEmbed.setDescription(`<@${toStrike.user.id}> has been issued a strike for the following reason: ${reason}. 
This is their fourth strike, therefore they shall be permanentally banned from the server.`);

      msg.channel
        .send(strikeEmbed)
        .then(() => {
          logsChannel.send(strikeEmbed);
        })
        .catch(console.log);

      toStrike
        .ban({
          reason: `Banned for getting issued a 4th strike for the following reason: ${reason}`,
        })
        .then(() => {
          userBanLog(
            null,
            msg,
            logsChannel,
            toStrike,
            `Banned for getting issued a 4th strike for the following reason: ${reason}`
          );
        })
        .catch(console.log);

      await UserSchema.findOneAndUpdate(
        { id: toStrike.user.id },
        { strikes: 0 },
        { useFindAndModify: false }
      );
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  chapterAnnouncement: chapterAnnouncement,
  pollAnnouncement: pollAnnouncement,
  botMessageCommand: botMessageCommand,
  botEmbedMessageCommand: botEmbedMessageCommand,
  muteCommand: muteCommand,
  kickCommand: kickCommand,
  banCommand: banCommand,
  purgeCommand: purgeCommand,
  strikeCommand: strikeCommand,
};
