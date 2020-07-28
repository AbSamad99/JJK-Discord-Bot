const Discord = require('discord.js');

const gifOrPngCheck = require('../Checks/gifOrPngCheck.js');

//logs when user joins the server
const userJoinLog = async (mem, logsChannel) => {
  try {
    let joinEmbed, authorUrl;

    //setting relevant fields
    authorUrl = await gifOrPngCheck(mem.user);

    joinEmbed = new Discord.MessageEmbed()
      .setAuthor(mem.user.tag, authorUrl)
      .setTitle('Member Joined')
      .setColor(3066993)
      .setThumbnail(authorUrl)
      .setDescription(
        `<@${mem.user.id}> has joined the server. The total number of users is now at ${mem.guild.memberCount}`
      )
      .setFooter(new Date());

    //logging
    logsChannel.send(joinEmbed).catch(console.error);
  } catch (err) {
    console.log(err);
  }
};

module.exports = userJoinLog;
