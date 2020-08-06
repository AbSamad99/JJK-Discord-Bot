/*Function to log deletion of channel*/

const Discord = require('discord.js');

const gifOrPngCheck = require('../../Checks/Other/gifOrPngCheck');

const channelDeleteLog = async (channel, channelDeleteAuditLog) => {
  try {
    let channelCreateEmbed, logsChannel;

    //getting logs channel
    logsChannel = channel.guild.channels.cache.get('447513266395283476');

    //creating embed
    channelCreateEmbed = new Discord.MessageEmbed()
      .setAuthor(
        channelDeleteAuditLog.executor.tag,
        await gifOrPngCheck(channelDeleteAuditLog.executor)
      )
      .setTitle('Channel deleted')
      .setColor(10038562)
      .setFooter(new Date())
      .addField(
        'Details:',
        `Name: ${channel.name}
Type: ${channel.type}
Topic: ${channel.topic ? channel.topic : 'None'}
NSFW: ${channel.nsfw ? 'Yes' : 'No'}`
      );

    //logging
    logsChannel.send(channelCreateEmbed).catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

module.exports = channelDeleteLog;
