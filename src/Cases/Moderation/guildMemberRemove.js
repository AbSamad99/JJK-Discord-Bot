/*Handles Logging of whenever a user leaves, is kicked, or is banned*/

import { myCache } from '../../app';

const UserSchema = require('../../Schemas/UserSchema.js');

//getting the required logging functions
const userKickLog = require('../../Loggers/Moderation/userKickLog.js');
const userLeaveLog = require('../../Loggers/Moderation/userLeaveLog.js');

const guildMemberRemoveCaseHandler = async (mem) => {
  let banAuditLog, kickAuditLog, logsChannel, temp1, temp2;

  //getting the logs channel
  logsChannel = mem.guild.channels.cache.get('447513266395283476');

  setTimeout(async () => {
    //getting audit log - kick
    kickAuditLog = await mem.guild
      .fetchAuditLogs({
        type: 'MEMBER_KICK',
      })
      .then((audit) => audit.entries.first());

    //getting audit log - ban
    banAuditLog = await mem.guild
      .fetchAuditLogs({
        type: 'MEMBER_BAN_ADD',
      })
      .then((audit) => audit.entries.first());

    temp1 = myCache.get('previousMemberKickLogId');
    temp2 = myCache.get('previousMemberBanLogId');

    //checking if the user was kicked and then logging
    if (kickAuditLog.id !== temp1) {
      myCache.del('previousMemberKickLogId');
      myCache.set('previousMemberKickLogId', kickAuditLog.id);

      if (kickAuditLog.executor.id === '730109162616389644') return;

      logsChannel = mem.guild.channels.cache.get('447513266395283476');

      await userKickLog(kickAuditLog, mem, null, logsChannel).catch(
        console.log
      );
    }

    //checking if user was banned and then logging
    else if (banAuditLog.id !== temp2) {
      myCache.del('previousMemberKickLogId');
      myCache.set('previousMemberKickLogId', banAuditLog.id);
      return;
    }
    //logging that user left themselves
    else {
      await userLeaveLog(mem, logsChannel).catch(console.log);
    }
  }, 2000);
};

module.exports = guildMemberRemoveCaseHandler;
