import { userArray, previousMemberBanLogId } from '../utilities';
import { userBanLog } from '../Functions/Loggers/loggingFunctions.js';

export const guildBanAddCaseHandler = async (guild, mem) => {
  try {
    let theHonoredOne, banAuditLog, modChannel;

    modChannel = guild.channels.cache
      .array()
      .find((ch) => ch.name === 'syed-bot-practice');

    theHonoredOne = userArray.find((user) => user.name === 'The Honored One');

    banAuditLog = await guild
      .fetchAuditLogs({
        type: 'MEMBER_BAN_ADD',
      })
      .then((audit) => audit.entries.first());

    if (previousMemberBanLogId[0] !== banAuditLog.id) {
      if (theHonoredOne.id === banAuditLog.executor.id) {
        return;
      } else {
        userBanLog(banAuditLog, null, modChannel);
      }
      previousMemberBanLogId[0] = banAuditLog.id;
    }
  } catch (err) {
    console.log(err);
  }
};
