/*Handles the logging of whenever a channel is created*/

const channelDeleteLog = require('../../Loggers/Channel/channelDeleteLog');

const channelDeleteCaseHandler = async (channel) => {
  let channelDeleteAuditLog;

  //fetching the audit logs
  channelDeleteAuditLog = await channel.guild
    .fetchAuditLogs({
      type: 'CHANNEL_DELETE',
    })
    .then((audit) => audit.entries.first());

  channelDeleteLog(channel, channelDeleteAuditLog).catch(console.log);
};

module.exports = channelDeleteCaseHandler;
