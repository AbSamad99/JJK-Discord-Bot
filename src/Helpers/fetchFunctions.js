/*Function to fetch audit log id and count*/

const utilities = require('../utilities');

const fetchAuditLogIdAndCount = async (client) => {
  try {
    let temp;

    //getting message delete audit log and setting required values
    temp = await client.guilds.cache
      .first()
      .fetchAuditLogs({
        type: 'MESSAGE_DELETE',
      })
      .then((audit) => audit.entries.first());
    utilities.previousDeleteLogId = temp.id;
    utilities.previousDeleteLogCount = temp.extra.count;

    //getting member update audit log and setting required value
    temp = await client.guilds.cache
      .first()
      .fetchAuditLogs({
        type: 'MEMBER_UPDATE',
      })
      .then((audit) => audit.entries.first());
    utilities.previousMemberUpdateLogId = temp.id;

    //getting member role update audit log and setting required value
    temp = await client.guilds.cache
      .first()
      .fetchAuditLogs({
        type: 'MEMBER_ROLE_UPDATE',
      })
      .then((audit) => audit.entries.first());
    utilities.previousMemberRoleUpdateLogId = temp.id;

    //getting member kick audit log and setting required value
    temp = await client.guilds.cache
      .first()
      .fetchAuditLogs({
        type: 'MEMBER_KICK',
      })
      .then((audit) => audit.entries.first());
    utilities.previousMemberKickLogId = temp.id;

    //getting member ban add audit log and setting required value
    temp = await client.guilds.cache
      .first()
      .fetchAuditLogs({
        type: 'MEMBER_BAN_ADD',
      })
      .then((audit) => audit.entries.first());
    if (!temp) temp = { id: null };
    utilities.previousMemberBanLogId = temp.id;

    //getting member ban remove audit log and setting required value
    temp = await client.guilds.cache
      .first()
      .fetchAuditLogs({
        type: 'MEMBER_BAN_REMOVE',
      })
      .then((audit) => audit.entries.first());
    if (!temp) temp = { id: null };
    utilities.previousMemberBanRemoveLogId = temp.id;

    //getting channel update audit log and setting required value
    temp = await client.guilds.cache
      .first()
      .fetchAuditLogs({
        type: 'CHANNEL_UPDATE',
      })
      .then((audit) => audit.entries.first());
    utilities.previousChannelUpdateLogId = temp.id;

    //getting role update audit log and setting required value
    temp = await client.guilds.cache
      .first()
      .fetchAuditLogs({
        type: 'ROLE_UPDATE',
      })
      .then((audit) => audit.entries.first());

    utilities.previousRoleUpdateAuditLog = temp.id;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  fetchAuditLogIdAndCount: fetchAuditLogIdAndCount,
};
