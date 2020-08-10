/*Handles Logging of whenever a user is banned from the server*/

//getting the required logging function
const userBanLog = require('../../Loggers/Moderation/userBanLog.js');

const UserSchema = require('../../Schemas/UserSchema.js');

const guildBanAddCaseHandler = async (guild, mem) => {
  let theHonoredOne, banAuditLog, logsChannel;

  //getting the logs channel
  logsChannel = guild.channels.cache.get('447513266395283476');

  //getting the honored one user
  theHonoredOne = guild.members.cache.get('730109162616389644');

  //fetching the ban audit log
  banAuditLog = await guild
    .fetchAuditLogs({
      type: 'MEMBER_BAN_ADD',
    })
    .then((audit) => audit.entries.first());

  userBanLog(banAuditLog, mem, null, logsChannel).catch(console.log);
};

module.exports = guildBanAddCaseHandler;
