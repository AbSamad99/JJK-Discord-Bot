/*Functions to handle the various other mod commands*/

const { MessageEmbed } = require('discord.js');

const urlExist = require('url-exist');

//command to help with chapter announcement
const chapterAnnouncement = async (msg) => {
  if (
    !(
      msg.member.roles.cache.has(
        '447512454810042369'
      ) /*Special Grade role*/ ||
      msg.member.roles.cache.has('447512449248395267') /*admin role*/ ||
      msg.member.roles.cache.has('665268720163225610')
        /*vengeful spirit role*/ ||
      msg.author.id === '390450196711997440'
    )
  )
    return;

  let chapterRelease,
    announcementChannel,
    temp,
    chapterNumber,
    vizLink,
    mpLink,
    chapEmbed;

  //getting the chapter release role
  chapterRelease = msg.guild.roles.cache.get('751774267783381075');

  //getting the announcement channel
  announcementChannel = msg.guild.channels.cache.get('447513385211396096');

  //getting info from the message
  temp = msg.content.slice(1);
  temp = temp.split(' ');

  //getting the viz link
  if (temp[1]) {
    vizLink = temp[1];
  } else {
    msg.channel.send('Please provide the viz link').catch(console.log);
    return;
  }

  //getting the mplus link
  if (temp[2]) {
    mpLink = temp[2];
  } else {
    msg.channel.send('Please provide the manga plus link').catch(console.log);
    return;
  }

  //checking if the viz and mplus links exist or not
  if (!(await urlExist(vizLink)) && !(await urlExist(mpLink))) {
    msg.channel.send('Both links are Invalid').catch(console.log);
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
    chapterNumber = msg.embeds[0].title.split(' ')[5]
    //constructing the embed
    chapEmbed = new MessageEmbed()
      .setTitle(`**__Jujutsu Kaisen chapter ${chapterNumber} is out!__**`)
      .setDescription(
        `**Viz Link:-** [Click Here](${vizLink})
    
**Manga Plus Link:-** [Click Here](${mpLink})

**__Rate The Chapter:-__**

\:five: - Great
\:four: - Good
\:three: - Okay 
\:two: - Bad
\:one: - Awful`
      )
      .setColor(16711680)
      .setImage('https://media.discordapp.net/attachments/714903391075303507/779596305076060170/Jujutsu_Kaisen_-_Chapter_1_-_1.jpg');

    //setting announcement channel to #syed-bot-practice if it was the msg channel
    if (msg.channel.id === '720958791432011789' /*Syed bot channel*/) {
      announcementChannel = msg.channel;
    }
    //returning if the command was not issued in #mod-bots
    else if (!(msg.channel.id === '460890234788249600') /*mod bot channel*/) {
      return;
    }

    //sending the required channel
    announcementChannel
      .send(`${chapterRelease}`, {/*Placeholder*/
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
  }, 2000);
};

module.exports = chapterAnnouncement;
