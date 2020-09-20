/*Function to log when a user joins*/

const { MessageEmbed } = require('discord.js');
const TimeAgo = require('javascript-time-ago');
const en = require('javascript-time-ago/locale/en');

const gifOrPngCheck = require('../../Helpers/gifOrPngCheck.js');

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');

//logs when user joins the server
const userJoinLog = async (mem, logsChannel) => {
  let joinEmbed, authorUrl;

  //setting relevant fields
  authorUrl = await gifOrPngCheck(mem.user);

  joinEmbed = new MessageEmbed()
    .setAuthor(mem.user.tag, authorUrl)
    .setTitle('Member joined')
    .setColor(3066993)
    .setThumbnail(authorUrl)
    .setDescription(
      `${mem.user} has joined the server. The total number of users is now at ${
        mem.guild.memberCount
      }.
      Account was created ${timeAgo.format(
        Date.now() - mem.user.createdTimestamp
      )}.`
    )
    .setFooter(new Date());

  //logging
  logsChannel.send(joinEmbed).catch(console.error);
};

module.exports = userJoinLog;
