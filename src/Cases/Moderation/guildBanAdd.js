/*Handles Logging of whenever a user is banned from the server*/

const utilities = require('../../utilities.js');

//getting the required logging function
const userBanLog = require('../../Loggers/Moderation/userBanLog.js');

const UserSchema = require('../../Schemas/UserSchema.js');

const guildBanAddCaseHandler = async (guild, mem) => {
  try {
    let theHonoredOne, banAuditLog, logsChannel;

    //getting the logs channel
    logsChannel = guild.channels.cache.get('447513266395283476');

    //getting the honored one user
    theHonoredOne = await UserSchema.findOne({ id: '730109162616389644' });

    //fetching the ban audit log
    banAuditLog = await guild
      .fetchAuditLogs({
        type: 'MEMBER_BAN_ADD',
      })
      .then((audit) => audit.entries.first());

    //checking if a new ban was added
    if (utilities.previousMemberBanLogId !== banAuditLog.id) {
      utilities.previousMemberBanLogId = banAuditLog.id;
      if (theHonoredOne.id === banAuditLog.executor.id) {
        return;
      } else {
        await userBanLog(banAuditLog, mem, null, logsChannel);
      }
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = guildBanAddCaseHandler;
