/*Function to log the change in channel name*/

const Discord = require('discord.js');
const gifOrPngCheck = require('../../Checks/gifOrPngCheck');

const channelNameUpdateLog = async (
  excecutor,
  channelNameChange,
  logsChannel,
  newChannel
) => {
  try {
    let channelEmbed;
    channelEmbed = new Discord.MessageEmbed()
      .setAuthor(excecutor.tag, await gifOrPngCheck(excecutor))
      .setTitle('Channel name changed')
      .setColor(15854089)
      .setFooter(new Date())
      .setDescription(`Channel: ${newChannel}`)
      .addField('Before', channelNameChange.old)
      .addField('After', channelNameChange.new);

    logsChannel.send(channelEmbed).catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

module.exports = channelNameUpdateLog;
