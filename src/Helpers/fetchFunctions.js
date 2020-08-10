/*Function to fetch audit log id and count*/

const fetchAuditLogIdAndCount = async (client, myCache) => {
  let temp;

  //getting message delete audit log and setting required values
  temp = await client.guilds.cache
    .first()
    .fetchAuditLogs({
      type: 'MESSAGE_DELETE',
    })
    .then((audit) => audit.entries.first())
    .catch(console.log);

  myCache.set('previousDeleteLogId', temp.id);
  myCache.set('previousDeleteLogCount', temp.extra.count);

  //getting member update audit log and setting required value
  temp = await client.guilds.cache
    .first()
    .fetchAuditLogs({
      type: 'MEMBER_UPDATE',
    })
    .then((audit) => audit.entries.first())
    .catch(console.log);

  myCache.set('previousMemberUpdateLogId', temp.id);

  //getting member role update audit log and setting required value
  temp = await client.guilds.cache
    .first()
    .fetchAuditLogs({
      type: 'MEMBER_ROLE_UPDATE',
    })
    .then((audit) => audit.entries.first())
    .catch(console.log);

  myCache.set('previousMemberRoleUpdateLogId', temp.id);

  //getting member kick audit log and setting required value
  temp = await client.guilds.cache
    .first()
    .fetchAuditLogs({
      type: 'MEMBER_KICK',
    })
    .then((audit) => audit.entries.first())
    .catch(console.log);

  myCache.set('previousMemberKickLogId', temp.id);

  //getting member ban add audit log and setting required value
  temp = await client.guilds.cache
    .first()
    .fetchAuditLogs({
      type: 'MEMBER_BAN_ADD',
    })
    .then((audit) => audit.entries.first())
    .catch(console.log);
  if (!temp) temp = { id: null };

  myCache.set('previousMemberBanLogId', temp.id);

  //getting channel update audit log and setting required value
  temp = await client.guilds.cache
    .first()
    .fetchAuditLogs({
      type: 'CHANNEL_UPDATE',
    })
    .then((audit) => audit.entries.first())
    .catch(console.log);

  myCache.set('previousChannelUpdateLogId', temp.id);
};

module.exports = fetchAuditLogIdAndCount;
