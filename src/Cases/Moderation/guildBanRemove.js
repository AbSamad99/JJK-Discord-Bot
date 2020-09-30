/*Handles Logging of whenever a user is unbanned from the server*/

//getting the required logging function
const userBanRemoveLog = require('../../Loggers/Moderation/userBanRemoveLog.js');

const guildBanRemoveCaseHandler = async (guild, mem) => {
  let banRemoveAuditLog, logsChannel;

  //getting the logs channel
  logsChannel = guild.channels.cache.get('757852261329272853');

  //fetching the ban remove audit log
  banRemoveAuditLog = await guild
    .fetchAuditLogs({
      type: 'MEMBER_BAN_REMOVE',
    })
    .then((audit) => audit.entries.first());

  if (banRemoveAuditLog.executor.id === '730109162616389644') return;

  await userBanRemoveLog(banRemoveAuditLog, logsChannel).catch(console.log);
};

module.exports = guildBanRemoveCaseHandler;
