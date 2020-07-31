const { previousMemberBanLogId } = require('../utilities.js');
const userBanLog = require('../Functions/Loggers/User_logs/userBanLog.js');

const UserSchema = require('../Schemas/UserSchema.js');

const guildBanAddCaseHandler = async (guild, mem) => {
  try {
    let theHonoredOne, banAuditLog, logsChannel;

    logsChannel = guild.channels.cache.find((ch) => ch.name === 'logs');

    theHonoredOne = await UserSchema.findOne({ id: '730109162616389644' });

    banAuditLog = await guild
      .fetchAuditLogs({
        type: 'MEMBER_BAN_ADD',
      })
      .then((audit) => audit.entries.first());

    console.log(banAuditLog.target);

    if (previousMemberBanLogId[0] !== banAuditLog.id) {
      if (theHonoredOne.id === banAuditLog.executor.id) {
        return;
      } else {
        await userBanLog(banAuditLog, mem, null, logsChannel);
      }
      previousMemberBanLogId[0] = banAuditLog.id;
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = guildBanAddCaseHandler;
