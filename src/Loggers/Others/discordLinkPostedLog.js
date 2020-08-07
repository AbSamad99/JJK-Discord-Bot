/*Function to log the info of the invite posted in the server*/

const { MessageEmbed } = require('discord.js');
const gifOrPngCheck = require('../../Checks/Other/gifOrPngCheck');

const discordLinkPostedLog = async (msg, client) => {
  let inviteFetch, discordLinkEmbed, temp1, temp2, logsChannel;

  //getting logs channel
  logsChannel = msg.guild.channels.cache.get('447513266395283476');

  temp1 = msg.content.split('https://discord.gg/');
  temp1 = temp1[1].slice(0, 7);

  //fetching invite info
  inviteFetch = await client.fetchInvite(`https://discord.gg/${temp1}`);

  //creating the embed
  discordLinkEmbed = new MessageEmbed()
    .setAuthor(msg.author.tag, await gifOrPngCheck(msg.author))
    .setTitle(`Discord invite posted in #${msg.channel.name}`)
    .setColor(15105570)
    .setFooter(new Date()).setDescription(`**__Details:__**
Owner name: ${
    inviteFetch.guild.owner ? inviteFetch.guild.owner.user.tag : 'Unknown'
  }
Server name: ${inviteFetch.guild.name}
Invite code: ${inviteFetch.code}
Member count: ${inviteFetch.memberCount}
`);

  logsChannel.send(discordLinkEmbed).catch(console.log);
};

module.exports = discordLinkPostedLog;
