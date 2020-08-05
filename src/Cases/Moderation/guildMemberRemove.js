/*Handles Logging of whenever a user leaves, is kicked, or is banned*/

const UserSchema = require('../../Schemas/UserSchema.js');

//getting the required logging functions
const userKickLog = require('../../Loggers/Moderation/userKickLog.js');
const userLeaveLog = require('../../Loggers/Moderation/userLeaveLog.js');
const userBanLog = require('../../Loggers/Moderation/userBanLog.js');

const guildMemberRemoveCaseHandler = async (mem, myCache) => {
  try {
    let theHonoredOne, banAuditLog, kickAuditLog, logsChannel, temp1, temp2;

    //getting the logs channel
    logsChannel = mem.guild.channels.cache.get('447513266395283476');

    //getting the honored one role
    theHonoredOne = await UserSchema.findOne({ id: '730109162616389644' });

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
      if (theHonoredOne.id === kickAuditLog.executor.id) {
        return;
      } else {
        await userKickLog(kickAuditLog, mem, null, logsChannel);
      }
    }

    //checking if user was banned and then logging
    else if (banAuditLog.id !== temp2) {
      myCache.del('previousMemberKickLogId');
      myCache.set('previousMemberKickLogId', banAuditLog.id);
      if (theHonoredOne.id === banAuditLog.executor.id) {
        return;
      } else {
        await userBanLog(banAuditLog, mem, null, logsChannel);
      }
    }
    //logging that user left themselves
    else {
      await userLeaveLog(mem, logsChannel);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = guildMemberRemoveCaseHandler;
