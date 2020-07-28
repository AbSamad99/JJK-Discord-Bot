const { previousMemberBanLogId } = require('../utilities.js');
const userBanLog = require('../Functions/Loggers/userBanLog.js');

const UserSchema = require('../Schemas/UserSchema.js');

const guildBanAddCaseHandler = async (guild, mem) => {
  try {
    let theHonoredOne, banAuditLog, logsChannel;

    logsChannel = guild.channels.cache.array().find((ch) => ch.name === 'logs');

    theHonoredOne = await UserSchema.findOne({ id: '730109162616389644' });

    banAuditLog = await guild
      .fetchAuditLogs({
        type: 'MEMBER_BAN_ADD',
      })
      .then((audit) => audit.entries.first());

    if (previousMemberBanLogId[0] !== banAuditLog.id) {
      if (theHonoredOne.id === banAuditLog.executor.id) {
        return;
      } else {
        await userBanLog(banAuditLog, null, logsChannel);
      }
      previousMemberBanLogId[0] = banAuditLog.id;
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = guildBanAddCaseHandler;
