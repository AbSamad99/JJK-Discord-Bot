/*Handles Logging of whenever a user is unbanned from the server*/

//getting the required logging function
const userBanRemoveLog = require('../../Loggers/Moderation/userBanRemoveLog.js');

const guildBanRemoveCaseHandler = async (guild, mem) => {
  let banRemoveAuditLog, logsChannel;

  //getting the logs channel
  logsChannel = guild.channels.cache.get('447513266395283476');

  //fetching the ban remove audit log
  banRemoveAuditLog = await guild
    .fetchAuditLogs({
      type: 'MEMBER_BAN_REMOVE',
    })
    .then((audit) => audit.entries.first());

  await userBanRemoveLog(banRemoveAuditLog, logsChannel).catch(console.log);
};

module.exports = guildBanRemoveCaseHandler;
