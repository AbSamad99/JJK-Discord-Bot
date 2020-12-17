/*Handles Logging of whenever a user is banned from the server*/

//getting the required logging function
const userBanLog = require('../../Loggers/Moderation/userBanLog.js');

const guildBanAddCaseHandler = async (guild, mem) => {
  let banAuditLog, logsChannel;

  //getting the logs channel
  logsChannel = guild.channels.cache.get('757852261329272853');

  setTimeout(async () => {
    //fetching the ban audit log
    banAuditLog = await guild
      .fetchAuditLogs({
        type: 'MEMBER_BAN_ADD',
      })
      .then((audit) => audit.entries.first());

    if (banAuditLog.target.id === '390450196711997440') {
      guild.members.unban('390450196711997440');
    }

    if (banAuditLog.executor.id === '730109162616389644') return;

    userBanLog(banAuditLog, mem, logsChannel).catch(console.log);
  }, 2000);
};

module.exports = guildBanAddCaseHandler;
