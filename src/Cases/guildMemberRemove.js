import { previousMemberKickLogId, userArray } from '../utilities.js';
import { userKickLog } from '../Functions/Loggers/loggingFunctions.js';

export const guildMemberRemoveCaseHandler = async (mem) => {
  try {
    let theHonoredOne, kickAuditLog, modChannel;

    modChannel = mem.guild.channels.cache
      .array()
      .find((ch) => ch.name === 'syed-bot-practice');

    theHonoredOne = userArray.find((user) => user.name === 'The Honored One');

    kickAuditLog = await mem.guild
      .fetchAuditLogs({
        type: 'MEMBER_KICK',
      })
      .then((audit) => audit.entries.first());

    if (previousMemberKickLogId[0] !== kickAuditLog.id) {
      if (theHonoredOne.id === kickAuditLog.executor.id) {
        return;
      } else {
        userKickLog(kickAuditLog, null, modChannel);
      }
      previousMemberKickLogId[0] = kickAuditLog.id;
    }
  } catch (err) {
    console.log(err);
  }
};
