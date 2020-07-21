const Discord = require('discord.js');
const fs = require('fs');
const urlExist = require('url-exist');

const { assignMuteRole } = require('../Roles/roleFunctions.js');
const userKickLog = require('../Loggers/userKickLog.js');
const userBanLog = require('../Loggers/userBanLog.js');
const { channelCheck, roleCheck } = require('../Checks/helperChecks.js');

//command to help with chapter announcement
const chapterAnnouncement = async (msg) => {
  const channelArray = JSON.parse(
    fs.readFileSync(`${process.cwd()}/src/Json-Files/channels.json`)
  );
  const rolesArray = fs.readFileSync(
    `${process.cwd()}/src/Json-Files/roles.json`
  );
  let mangaNewsRole = rolesArray.find((role) => role.name === 'Manga News');
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
};

//command to help with poll announcement
const pollAnnouncement = (msg) => {
  const channelArray = JSON.parse(
    fs.readFileSync(`${process.cwd()}/src/Json-Files/channels.json`)
  );
  let announcementChannel = msg.guild.channels.cache.find(
    (ch) => ch.name === 'announcements'
  );
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
};

//command to send anon messages
const anonMessageCommand = (msg) => {
  let modBotChannel = msg.guild.channels.cache.find(
    (ch) => ch.name === 'mod-bots'
  );
  if (msg.channel.id === modBotChannel.id) {
    let temp = msg.content.slice(1);
    temp = temp.split(' ');
    let temp1 = temp.slice(2);
    let message = temp1.join(' ');
    let messageChannelId = temp[1].slice(2, temp[1].length - 1);
    // console.log(message, messageChannelId);
    let messageChannel = msg.guild.channels.cache.find(
      (ch) => ch.id === messageChannelId
    );
    messageChannel.send(message).catch(console.log);
  }
};

//command to mute users
const muteCommand = (msg) => {
  const rolesArray = JSON.parse(
    fs.readFileSync(`${process.cwd()}/src/Json-Files/roles.json`)
  );
  let toMute, muteRole, temp, reason, time, testChannel;
  toMute = msg.mentions.members.array()[0];
  testChannel = msg.guild.channels.cache.find(
    (ch) => ch.name === 'syed-bot-practice'
  );
  if (!toMute) {
    msg.channel.send('Please mention a user to mute');
    return;
  }
  if (roleCheck(toMute, 'Special-Grade Shaman') || roleCheck(toMute, 'admin')) {
    msg.channel.send('You cannot mute this user');
    return;
  }
  muteRole = rolesArray.find((role) => role.name === 'Muted');
  toMute = msg.guild.member(toMute);
  temp = msg.content.slice(1);
  temp = temp.split(' ');
  if (!temp[2] || !temp[3]) {
    msg.channel.send('Please mention duration of the mute');
    return;
  } else if (
    isNaN(temp[2]) ||
    (temp[3] !== 'm' && temp[3] !== 's' && temp[3] !== 'd' && temp[3] !== 'd')
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
  assignMuteRole(msg, toMute, muteRole, time, testChannel, reason);
};

//command to kick users
const kickCommand = (msg) => {
  let toKick, temp, reason, testChannel;
  toKick = msg.mentions.members.array()[0];
  testChannel = msg.guild.channels.cache.find(
    (ch) => ch.name === 'syed-bot-practice'
  );
  if (!toKick) {
    msg.channel.send('Please mention a user to kick');
    return;
  }
  if (roleCheck(toKick, 'Special-Grade Shaman') || roleCheck(toKick, 'admin')) {
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
  console.log({
    user: toKick.user.username,
    reason: reason,
  });

  toKick
    .kick(reason)
    .then(() => {
      userKickLog(null, msg, testChannel, toKick, reason);
    })
    .catch(console.log);
};

//command to ban users
const banCommand = (msg) => {
  let toBan, temp, reason, testChannel;
  toBan = msg.mentions.members.array()[0];
  testChannel = msg.guild.channels.cache.find(
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
      userBanLog(null, msg, testChannel, toBan, reason);
    })
    .catch(console.log);
};

//command to purge messages
const purgeCommand = (msg) => {
  try {
    let temp, number, logsChannel, testChannel;
    logsChannel = msg.guild.channels.cache
      .array()
      .find((ch) => ch.name === 'logs');
    testChannel = msg.guild.channels.cache
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
      .then(() => testChannel.send(purgeEmbed))
      .catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  chapterAnnouncement: chapterAnnouncement,
  pollAnnouncement: pollAnnouncement,
  anonMessageCommand: anonMessageCommand,
  muteCommand: muteCommand,
  kickCommand: kickCommand,
  banCommand: banCommand,
  purgeCommand: purgeCommand,
};
