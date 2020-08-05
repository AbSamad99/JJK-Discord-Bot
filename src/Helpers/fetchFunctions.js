/*Function to fetch audit log id and count*/

const fetchAuditLogIdAndCount = async (client, myCache) => {
  try {
    let temp;

    //getting message delete audit log and setting required values
    temp = await client.guilds.cache
      .first()
      .fetchAuditLogs({
        type: 'MESSAGE_DELETE',
      })
      .then((audit) => audit.entries.first());

    myCache.set('previousDeleteLogId', temp.id);
    myCache.set('previousDeleteLogCount', temp.extra.count);

    //getting member update audit log and setting required value
    temp = await client.guilds.cache
      .first()
      .fetchAuditLogs({
        type: 'MEMBER_UPDATE',
      })
      .then((audit) => audit.entries.first());

    myCache.set('previousMemberUpdateLogId', temp.id);

    //getting member role update audit log and setting required value
    temp = await client.guilds.cache
      .first()
      .fetchAuditLogs({
        type: 'MEMBER_ROLE_UPDATE',
      })
      .then((audit) => audit.entries.first());

    myCache.set('previousMemberRoleUpdateLogId', temp.id);

    //getting member kick audit log and setting required value
    temp = await client.guilds.cache
      .first()
      .fetchAuditLogs({
        type: 'MEMBER_KICK',
      })
      .then((audit) => audit.entries.first());

    myCache.set('previousMemberKickLogId', temp.id);

    //getting member ban add audit log and setting required value
    temp = await client.guilds.cache
      .first()
      .fetchAuditLogs({
        type: 'MEMBER_BAN_ADD',
      })
      .then((audit) => audit.entries.first());
    if (!temp) temp = { id: null };

    myCache.set('previousMemberBanLogId', temp.id);

    //getting member ban remove audit log and setting required value
    temp = await client.guilds.cache
      .first()
      .fetchAuditLogs({
        type: 'MEMBER_BAN_REMOVE',
      })
      .then((audit) => audit.entries.first());
    if (!temp) temp = { id: null };

    myCache.set('previousMemberBanRemoveLogId', temp.id);

    //getting channel update audit log and setting required value
    temp = await client.guilds.cache
      .first()
      .fetchAuditLogs({
        type: 'CHANNEL_UPDATE',
      })
      .then((audit) => audit.entries.first());

    myCache.set('previousChannelUpdateLogId', temp.id);

    //getting role update audit log and setting required value
    temp = await client.guilds.cache
      .first()
      .fetchAuditLogs({
        type: 'ROLE_UPDATE',
      })
      .then((audit) => audit.entries.first());

    myCache.set('previousRoleUpdateAuditLog', temp.id);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  fetchAuditLogIdAndCount: fetchAuditLogIdAndCount,
};
