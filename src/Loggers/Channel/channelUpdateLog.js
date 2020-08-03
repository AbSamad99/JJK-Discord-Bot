/*Function to log the change in channel name*/

const Discord = require('discord.js');
const prettyMilliseconds = require('pretty-ms');

const gifOrPngCheck = require('../../Checks/Other/gifOrPngCheck');

const channelUpdateLog = async (
  excecutor,
  channelNameChange,
  channelSlowmodeChange,
  logsChannel,
  newChannel
) => {
  try {
    let channelUpdateEmbed;
    channelUpdateEmbed = new Discord.MessageEmbed()
      .setAuthor(excecutor.tag, await gifOrPngCheck(excecutor))
      .setTitle('Channel settings changed')
      .setColor(15854089)
      .setFooter(new Date())
      .setDescription(`Channel: ${newChannel}`);

    if (channelNameChange) {
      channelUpdateEmbed.addField(
        'Name:',
        `Before: ${channelNameChange.old}
After: ${channelNameChange.new}`,
        true
      );
    }

    if (channelSlowmodeChange) {
      channelUpdateEmbed.addField(
        'Slowmode:',
        `Before: ${
          channelSlowmodeChange.old
            ? prettyMilliseconds(channelSlowmodeChange.old * 1000)
            : 'Off'
        }
After: ${
          channelSlowmodeChange.new
            ? prettyMilliseconds(channelSlowmodeChange.new * 1000)
            : 'Off'
        }`,
        true
      );
    }

    logsChannel.send(channelUpdateEmbed).catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

module.exports = channelUpdateLog;
