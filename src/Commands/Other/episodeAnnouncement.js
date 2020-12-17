/*Command to handle the Episode Announcement*/

const { MessageEmbed } = require('discord.js');

const urlExist = require('url-exist');

const episodeAnnouncement = async (msg) => {
  if (
    !(
      msg.member.roles.cache.has('447512454810042369') /*Special Grade role*/ ||
      msg.member.roles.cache.has('447512449248395267') /*admin role*/ ||
      msg.member.roles.cache.has(
        '665268720163225610'
      ) /*vengeful spirit role*/ ||
      msg.author.id === '390450196711997440'
    )
  )
    return;

  let episodeRelease, announcementChannel, temp, episodeNumber, crLink, epEmbed;

  //getting the chapter release role
  episodeRelease = msg.guild.roles.cache.get('761460802070642698');

  //getting the announcement channel
  announcementChannel = msg.guild.channels.cache.get('447513385211396096');

  //getting info from the message
  temp = msg.content.slice(1);
  temp = temp.split(' ');

  //getting the cr link
  if (temp[1]) {
    crLink = temp[1];
  } else {
    msg.channel.send('Please provide the crunchyroll link').catch(console.log);
    return;
  }

  if (
    !crLink.includes('crunchyroll.com/jujutsu-kaisen/')
  ) {
    msg.channel.send('Crunchyroll link is invalid').catch(console.error);
    return;
  }

  setTimeout(async () => {
    temp = msg.embeds[0].description.split('-')[1].trim()
    episodeNumber=msg.embeds[0].description.split(' ')[4];
    epEmbed = new MessageEmbed()
      .setTitle(`**__Jujutsu Kaisen episode ${episodeNumber} is out!__**`)
      .setDescription(
        `**Episode Name:-** ${temp}

**Crunchyroll Link:-** [Click Here](${crLink})
**Server Stream Link:-** [Click Here](https://tutturu.it/JJK)
*__Note:__ We may not stream every episode*

**__Rate The Episode:-__**

\:five: - Great
\:four: - Good
\:three: - Okay 
\:two: - Bad
\:one: - Awful`
      )
      .setColor(16711680).setImage(msg.embeds[0].thumbnail.url);

    //setting announcement channel to #syed-bot-practice if it was the msg channel
    if (msg.channel.id === '720958791432011789' /*Syed bot channel*/) {
      announcementChannel = msg.channel;
    }

    //returning if the command was not issued in #mod-bots
    else if (!(msg.channel.id === '460890234788249600') /*mod bot channel*/) {
      return;
    }

    announcementChannel
      .send(`${episodeRelease}`, {/*Placeholder*/
        embed: epEmbed,
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

  }, 2000)
};

module.exports = episodeAnnouncement;
