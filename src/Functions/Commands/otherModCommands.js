const Discord = require('discord.js');
const ms = require('ms');

const urlExist = require('url-exist');

const { channelCheck } = require('../Checks/helperChecks.js');

//command to help with chapter announcement
const chapterAnnouncement = async (msg) => {
  try {
    let mangaNewsRole,
      announcementChannel,
      temp,
      chapterNumber,
      vizLink,
      mpLink,
      chapEmbed;

    mangaNewsRole = msg.guild.roles.cache.find(
      (role) => role.name === 'Manga News'
    );
    announcementChannel = msg.guild.channels.cache.find(
      (ch) => ch.name === 'announcements'
    );
    temp = msg.content.slice(1);
    temp = temp.split(' ');
    chapterNumber = temp[1];
    vizLink = temp[2];
    mpLink = temp[3];

    if (!(await urlExist(vizLink)) && !(await urlExist(mpLink))) {
      msg.channel.send('Both links are Invalid');
      return;
    } else if (!(await urlExist(vizLink))) {
      msg.channel.send('Viz link is invalid').catch(console.error);
      return;
    } else if (!(await urlExist(mpLink))) {
      msg.channel.send('Manga Plus link is invalid').catch(console.error);
      return;
    }

    setTimeout(() => {
      chapEmbed = new Discord.MessageEmbed()
        .setTitle(`**__Jujutsu Kaisen chapter ${chapterNumber} is out!__**`)
        .setDescription(
          `**Viz Link:-** [Click Here](${vizLink})
    
**Manga Plus Link:-** [Click Here](${mpLink})

**__Rate The Chapter:-__**

\:five: - Great
\:four: - Good
\:three: - Okay 
\:two: - Bad
\:one: - Awful

`
        )
        .setColor(16711680)
        .setImage(msg.embeds[0].thumbnail.url);

      if (!(temp[1] && temp[2] && temp[3])) {
        msg.channel
          .send('Please follow the proper syntax of the command')
          .catch(console.error);
        return;
      }
      if (channelCheck(msg, 'syed-bot-practice')) {
        announcementChannel = msg.channel;
      } else if (!channelCheck(msg, 'mod-bots')) {
        return;
      }
      announcementChannel
        .send(`${mangaNewsRole}`, {
          embed: chapEmbed,
        })
        .then((botMsg) => {
          botMsg.react('5️⃣');
          botMsg.react('4️⃣');
          botMsg.react('3️⃣');
          botMsg.react('2️⃣');
          botMsg.react('1️⃣');
        })
        .then(() => msg.suppressEmbeds())
        // .then(() => pollAnnouncement(announcementChannel, chapterNumber))
        .catch(console.error);
    }, ms('2s'));
  } catch (err) {
    console.log(err);
  }
};

//command to purge messages
const purgeCommand = (msg) => {
  try {
    let temp, number, logsChannel;
    logsChannel = msg.guild.channels.cache.find((ch) => ch.name === 'logs');
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
        `${msg.author} has purged ${number - 1} messages in <#${
          msg.channel.id
        }>`
      )
      .setColor(15158332)
      .setFooter(new Date());
    msg.channel
      .bulkDelete(number)
      .then(() => logsChannel.send(purgeEmbed))
      .catch(console.error);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  chapterAnnouncement: chapterAnnouncement,
  purgeCommand: purgeCommand,
};
