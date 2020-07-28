const Discord = require('discord.js');
const urlExist = require('url-exist');

const { channelCheck } = require('../Checks/helperChecks.js');

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
    let mpLink = temp[3];

    if (!(await urlExist(vizLink)) && !(await urlExist(mpLink))) {
      msg.channel.send('Both links are Invalid');
      return;
    } else if (!(await urlExist(vizLink))) {
      msg.channel.send('Viz link is invalid').catch(console.log);
      return;
    } else if (!(await urlExist(mpLink))) {
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

//command to purge messages
const purgeCommand = (msg) => {
  try {
    let temp, number, logsChannel;
    logsChannel = msg.guild.channels.cache
      .array()
      .find((ch) => ch.name === 'logs');
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

module.exports = {
  chapterAnnouncement: chapterAnnouncement,
  pollAnnouncement: pollAnnouncement,
  purgeCommand: purgeCommand,
};
