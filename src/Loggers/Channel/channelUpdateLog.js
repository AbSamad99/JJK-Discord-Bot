/*Function to log the change in channel name*/

const { MessageEmbed } = require('discord.js');
const prettyMilliseconds = require('pretty-ms');

const gifOrPngCheck = require('../../Helpers/gifOrPngCheck');

const channelUpdateLog = async (
  channelUpdateAuditLog,
  logsChannel,
  newChannel
) => {
  let channelUpdateEmbed,
    channelNameChange,
    channelSlowmodeChange,
    channelTopicChange,
    channelNsfwChange;

  channelNameChange = channelUpdateAuditLog.changes.find(
    (change) => change.key === 'name'
  );

  channelSlowmodeChange = channelUpdateAuditLog.changes.find(
    (change) => change.key === 'rate_limit_per_user'
  );

  channelTopicChange = channelUpdateAuditLog.changes.find(
    (change) => change.key === 'topic'
  );

  channelNsfwChange = channelUpdateAuditLog.changes.find(
    (change) => change.key === 'nsfw'
  );

  channelUpdateEmbed = new MessageEmbed()
    .setAuthor(
      channelUpdateAuditLog.executor.tag,
      await gifOrPngCheck(channelUpdateAuditLog.executor)
    )
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

  if (channelTopicChange) {
    channelUpdateEmbed.addField(
      'Topic:',
      `Before: ${channelTopicChange.old ? channelTopicChange.old : 'None'}
After: ${channelTopicChange.new ? channelTopicChange.new : 'None'}`,
      true
    );
  }

  if (channelNsfwChange) {
    channelUpdateEmbed.addField(
      'NSFW:',
      `Before: ${channelNsfwChange.old ? 'Yes' : 'No'}
After: ${channelNsfwChange.new ? 'Yes' : 'No'}`,
      true
    );
  }

  logsChannel.send(channelUpdateEmbed).catch(console.log);
};

module.exports = channelUpdateLog;
