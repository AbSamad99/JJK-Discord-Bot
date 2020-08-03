/*Functions to handle the various other mod commands*/

const Discord = require('discord.js');
const ms = require('ms');

const urlExist = require('url-exist');

const { channelCheck } = require('../../Checks/Other/helperChecks.js');

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

    //getting the manga news role
    mangaNewsRole = msg.guild.roles.cache.get('720949312984580146');

    //getting the announcement channel
    announcementChannel = msg.guild.channels.cache.get('447513385211396096');

    //getting info from the message
    temp = msg.content.slice(1);
    temp = temp.split(' ');

    //getting chapter number
    if (temp[1]) {
      chapterNumber = temp[1];
    } else {
      msg.channel.send('Please provide the chapter number');
      return;
    }

    //getting the viz link
    if (temp[2]) {
      vizLink = temp[2];
    } else {
      msg.channel.send('Please provide the viz link');
      return;
    }

    //getting the mplus link
    if (temp[3]) {
      mpLink = temp[3];
    } else {
      msg.channel.send('Please provide the manga plus link');
      return;
    }

    //checking if the viz and mplus links exist or not
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

    //timeout to make sure we get the thumbnail image
    setTimeout(() => {
      //constructing the embed
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

      //setting announcement channel to #syed-bot-practice if it was the msg channel
      if (channelCheck(msg, 'syed-bot-practice')) {
        announcementChannel = msg.channel;
      }
      //returning if the command was not issued in #mod-bots
      else if (!channelCheck(msg, 'mod-bots')) {
        return;
      }

      //sending the required channel
      announcementChannel
        .send(`${mangaNewsRole}`, {
          embed: chapEmbed,
        })
        .then(async (botMsg) => {
          await botMsg.react('5️⃣');
          await botMsg.react('4️⃣');
          await botMsg.react('3️⃣');
          await botMsg.react('2️⃣');
          await botMsg.react('1️⃣');
        })
        .then(() => msg.suppressEmbeds())
        .catch(console.error);
    }, ms('3s'));
  } catch (err) {
    console.log(err);
  }
};

module.exports = chapterAnnouncement;
