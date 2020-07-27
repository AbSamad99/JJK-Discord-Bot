const Discord = require('discord.js');

const checkIfGifOrPng = require('../Helpers/checkIfGifOrPng.js');

//logs when user joins the server
const userJoinLog = async (mem, logsChannel) => {
  try {
    let joinEmbed, authorUrl;

    //setting relevant fields
    authorUrl = await checkIfGifOrPng(mem.user);

    joinEmbed = new Discord.MessageEmbed()
      .setAuthor(mem.user.tag, authorUrl)
      .setTitle('Member Joined')
      .setColor(3447003)
      .setThumbnail(authorUrl)
      .setDescription(
        `<@${mem.user.id}> has joined the server. The total number of users is now at ${mem.guild.memberCount}`
      )
      .setFooter(new Date());

    //logging
    logsChannel.send(joinEmbed).catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

module.exports = userJoinLog;
