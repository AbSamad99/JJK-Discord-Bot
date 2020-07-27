const fs = require('fs');

const UserSchema = require('../Schemas/UserSchema.js');

const {
  previousMemberKickLogId,
  previousMemberBanLogId,
} = require('../utilities.js');

const userKickLog = require('../Functions/Loggers/userKickLog.js');
const userLeaveLog = require('../Functions/Loggers/userLeaveLog.js');

const guildMemberRemoveCaseHandler = async (mem) => {
  try {
    let theHonoredOne, banAuditLog, kickAuditLog, logsChannel;

    logsChannel = mem.guild.channels.cache
      .array()
      .find((ch) => ch.name === 'logs');

    theHonoredOne = await UserSchema.findOne({ id: '730109162616389644' });

    kickAuditLog = await mem.guild
      .fetchAuditLogs({
        type: 'MEMBER_KICK',
      })
      .then((audit) => audit.entries.first());

    banAuditLog = await mem.guild
      .fetchAuditLogs({
        type: 'MEMBER_BAN_ADD',
      })
      .then((audit) => audit.entries.first());

    if (previousMemberKickLogId[0] !== kickAuditLog.id) {
      if (theHonoredOne.id === kickAuditLog.executor.id) {
        return;
      } else {
        await userKickLog(kickAuditLog, null, logsChannel);
      }
      previousMemberKickLogId[0] = kickAuditLog.id;
    } else if (previousMemberBanLogId[0] !== banAuditLog.id) {
      return;
    } else {
      await userLeaveLog(mem, logsChannel);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = guildMemberRemoveCaseHandler;
