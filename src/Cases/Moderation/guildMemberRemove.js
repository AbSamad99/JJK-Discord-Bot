/*Handles Logging of whenever a user leaves, is kicked, or is banned*/

const UserSchema = require('../../Schemas/UserSchema.js');

//getting the required logging functions
const userKickLog = require('../../Loggers/Moderation/userKickLog.js');
const userLeaveLog = require('../../Loggers/Moderation/userLeaveLog.js');
const userBanLog = require('../../Loggers/Moderation/userBanLog.js');

const guildMemberRemoveCaseHandler = async (mem, myCache) => {
  let banAuditLog, kickAuditLog, logsChannel, temp1, temp2;

  //getting the logs channel
  logsChannel = mem.guild.channels.cache.get('447513266395283476');

  //getting audit log - kick
  kickAuditLog = await mem.guild
    .fetchAuditLogs({
      type: 'MEMBER_KICK',
    })
    .then((audit) => audit.entries.first());

  //getting audit log - ban
  banAuditLog = await mem.guild
    .fetchAuditLogs({
      type: 'MEMBER_BAN_ADD',
    })
    .then((audit) => audit.entries.first());

  temp1 = myCache.get('previousMemberKickLogId');
  temp2 = myCache.get('previousMemberBanLogId');

  //checking if the user was kicked and then logging
  if (kickAuditLog.id !== temp1) {
    myCache.del('previousMemberKickLogId');
    myCache.set('previousMemberKickLogId', kickAuditLog.id);

    if (kickAuditLog.executor.id === '730109162616389644') return;

    userKickLog(kickAuditLog, mem, null, logsChannel).catch(console.log);
  }

  //checking if user was banned and then logging
  else if (banAuditLog.id !== temp2) {
    myCache.del('previousMemberKickLogId');
    myCache.set('previousMemberKickLogId', banAuditLog.id);

    if (kickAuditLog.executor.id === '730109162616389644') return;

    userBanLog(banAuditLog, mem, null, logsChannel).catch(console.log);
  }
  //logging that user left themselves
  else {
    userLeaveLog(mem, logsChannel).catch(console.log);
  }
};

module.exports = guildMemberRemoveCaseHandler;
