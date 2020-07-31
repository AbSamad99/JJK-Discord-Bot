const {
  previousDeleteLogCount,
  previousDeleteLogId,
  previousMemberRoleUpdateLogId,
  previousMemberUpdateLogId,
  previousMemberKickLogId,
  previousMemberBanLogId,
  previousMemberBanRemoveLogId,
  previousChannelUpdateLogId,
} = require('../../utilities');

//fetches message delete log id and count
const fetchAuditLogIdAndCount = async (client) => {
  try {
    let temp;
    temp = await client.guilds.cache
      .first()
      .fetchAuditLogs({
        type: 'MESSAGE_DELETE',
      })
      .then((audit) => audit.entries.first());
    previousDeleteLogId.push(temp.id);
    previousDeleteLogCount.push(temp.extra.count);

    temp = await client.guilds.cache
      .first()
      .fetchAuditLogs({
        type: 'MEMBER_UPDATE',
      })
      .then((audit) => audit.entries.first());
    previousMemberUpdateLogId.push(temp.id);

    temp = await client.guilds.cache
      .first()
      .fetchAuditLogs({
        type: 'MEMBER_ROLE_UPDATE',
      })
      .then((audit) => audit.entries.first());
    previousMemberRoleUpdateLogId.push(temp.id);

    temp = await client.guilds.cache
      .first()
      .fetchAuditLogs({
        type: 'MEMBER_KICK',
      })
      .then((audit) => audit.entries.first());
    previousMemberKickLogId.push(temp.id);

    temp = await client.guilds.cache
      .first()
      .fetchAuditLogs({
        type: 'MEMBER_BAN_ADD',
      })
      .then((audit) => audit.entries.first());
    if (!temp) temp = { id: null };
    previousMemberBanLogId.push(temp.id);

    temp = await client.guilds.cache
      .first()
      .fetchAuditLogs({
        type: 'MEMBER_BAN_REMOVE',
      })
      .then((audit) => audit.entries.first());
    if (!temp) temp = { id: null };
    previousMemberBanRemoveLogId.push(temp.id);

    temp = await client.guilds.cache
      .first()
      .fetchAuditLogs({
        type: 'CHANNEL_UPDATE',
      })
      .then((audit) => audit.entries.first());
    previousChannelUpdateLogId.push(temp.id);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  fetchAuditLogIdAndCount: fetchAuditLogIdAndCount,
};
