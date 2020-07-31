const { previousMemberBanRemoveLogId } = require('../utilities.js');

const userBanRemoveLog = require('../Functions/Loggers/User_logs/userBanRemoveLog.js');

const guildBanRemoveCaseHandler = async (guild, mem) => {
  try {
    let banRemoveAuditLog, logsChannel;

    logsChannel = guild.channels.cache.find((ch) => ch.name === 'logs');

    banRemoveAuditLog = await guild
      .fetchAuditLogs({
        type: 'MEMBER_BAN_REMOVE',
      })
      .then((audit) => audit.entries.first());

    if (previousMemberBanRemoveLogId[0] !== banRemoveAuditLog.id) {
      userBanRemoveLog(banRemoveAuditLog, logsChannel);
      previousMemberBanRemoveLogId[0] = banRemoveAuditLog.id;
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = guildBanRemoveCaseHandler;
