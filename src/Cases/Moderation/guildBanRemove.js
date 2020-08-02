/*Handles Logging of whenever a user is unbanned from the server*/

const utilities = require('../../utilities.js');

//getting the required logging function
const userBanRemoveLog = require('../../Loggers/Moderation/userBanRemoveLog.js');

const guildBanRemoveCaseHandler = async (guild, mem) => {
  try {
    let banRemoveAuditLog, logsChannel;

    //getting the logs channel
    logsChannel = guild.channels.cache.get('447513266395283476');

    //fetching the ban remove audit log
    banRemoveAuditLog = await guild
      .fetchAuditLogs({
        type: 'MEMBER_BAN_REMOVE',
      })
      .then((audit) => audit.entries.first());

    //checking if a ban was removed
    if (utilities.previousMemberBanRemoveLogId !== banRemoveAuditLog.id) {
      utilities.previousMemberBanRemoveLogId = banRemoveAuditLog.id;
      userBanRemoveLog(banRemoveAuditLog, logsChannel);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = guildBanRemoveCaseHandler;
