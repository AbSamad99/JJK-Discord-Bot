/*Handles Logging of whenever a user is unbanned from the server*/

//getting the required logging function
const userBanRemoveLog = require('../../Loggers/Moderation/userBanRemoveLog.js');

const guildBanRemoveCaseHandler = async (guild, mem, myCache) => {
  let banRemoveAuditLog, logsChannel, temp;

  //getting the logs channel
  logsChannel = guild.channels.cache.get('447513266395283476');

  //fetching the ban remove audit log
  banRemoveAuditLog = await guild
    .fetchAuditLogs({
      type: 'MEMBER_BAN_REMOVE',
    })
    .then((audit) => audit.entries.first());

  temp = myCache.get('previousMemberBanRemoveLogId');

  //checking if a ban was removed
  if (banRemoveAuditLog.id !== temp) {
    myCache.del('previousMemberBanRemoveLogId');
    myCache.set('previousMemberBanRemoveLogId', banRemoveAuditLog.id);
    userBanRemoveLog(banRemoveAuditLog, logsChannel).catch(console.log);
  }
};

module.exports = guildBanRemoveCaseHandler;
