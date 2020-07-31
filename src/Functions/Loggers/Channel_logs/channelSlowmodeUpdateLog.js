const Discord = require('discord.js');
const gifOrPngCheck = require('../../Checks/gifOrPngCheck');
const prettyMilliseconds = require('pretty-ms');

const channelSlowmodeUpdateLog = async (
  excecutor,
  channelSlowmodeChange,
  logsChannel,
  newChannel
) => {
  try {
    let channelEmbed;
    channelEmbed = new Discord.MessageEmbed()
      .setAuthor(excecutor.tag, await gifOrPngCheck(excecutor))
      .setTitle('Channel slowmode duration changed')
      .setColor(15854089)
      .setFooter(new Date())
      .setDescription(`Channel: ${newChannel}`)
      .addField(
        'Before',
        channelSlowmodeChange.old
          ? prettyMilliseconds(channelSlowmodeChange.old * 1000)
          : 'Off',
        true
      )
      .addField(
        'After',
        channelSlowmodeChange.new
          ? prettyMilliseconds(channelSlowmodeChange.new * 1000)
          : 'Off',
        true
      );

    logsChannel.send(channelEmbed).catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

module.exports = channelSlowmodeUpdateLog;
