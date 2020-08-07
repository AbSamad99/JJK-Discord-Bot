/*Function to log when a user joins*/

const { MessageEmbed } = require('discord.js');

const gifOrPngCheck = require('../../Checks/Other/gifOrPngCheck.js');

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
      `${mem.user} has joined the server. The total number of users is now at ${mem.guild.memberCount}`
    )
    .setFooter(new Date());

  //logging
  logsChannel.send(joinEmbed).catch(console.error);
};

module.exports = userJoinLog;
