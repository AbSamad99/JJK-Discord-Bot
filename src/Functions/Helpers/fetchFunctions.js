const fs = require('fs');

const {
  previousDeleteLogCount,
  previousDeleteLogId,
  previousMemberRoleUpdateLogId,
  previousMemberUpdateLogId,
  previousMemberKickLogId,
  previousMemberBanLogId,
  previousMemberBanRemoveLogId,
  characterArtObj,
} = require('../../utilities');

//fetches message delete log id and count
const fetchMessageDeleteLogIdAndCount = async (client) => {
  try {
    let temp = await client.guilds.cache
      .first()
      .fetchAuditLogs({
        type: 'MESSAGE_DELETE',
      })
      .then((audit) => audit.entries.first());
    previousDeleteLogId.push(temp.id);
    previousDeleteLogCount.push(temp.extra.count);
  } catch (err) {
    console.log(err);
  }
};

//fetches member update log id
const fetchMemberUpdateLogId = async (client) => {
  try {
    let temp = await client.guilds.cache
      .first()
      .fetchAuditLogs({
        type: 'MEMBER_UPDATE',
      })
      .then((audit) => audit.entries.first());
    previousMemberUpdateLogId.push(temp.id);
  } catch (err) {
    console.log(err);
  }
};

//fetches member role update log id
const fetchMemberRoleUpdateLogId = async (client) => {
  try {
    let temp = await client.guilds.cache
      .first()
      .fetchAuditLogs({
        type: 'MEMBER_ROLE_UPDATE',
      })
      .then((audit) => audit.entries.first());
    previousMemberRoleUpdateLogId.push(temp.id);
  } catch (err) {
    console.log(err);
  }
};

//fetches member kick log id
const fetchMemberKickLogId = async (client) => {
  try {
    let temp = await client.guilds.cache
      .first()
      .fetchAuditLogs({
        type: 'MEMBER_KICK',
      })
      .then((audit) => audit.entries.first());
    previousMemberKickLogId.push(temp.id);
  } catch (err) {
    console.log(err);
  }
};

//fetches member ban log id
const fetchMemberBanLogId = async (client) => {
  try {
    let temp = await client.guilds.cache
      .first()
      .fetchAuditLogs({
        type: 'MEMBER_BAN_ADD',
      })
      .then((audit) => audit.entries.first());
    if (!temp) temp = { id: null };
    previousMemberBanLogId.push(temp.id);
  } catch (err) {
    console.log(err);
  }
};

//fetches member ban remove log id
const fetchMemberBanRemoveLogId = async (client) => {
  try {
    let temp = await client.guilds.cache
      .first()
      .fetchAuditLogs({
        type: 'MEMBER_BAN_REMOVE',
      })
      .then((audit) => audit.entries.first());
    if (!temp) temp = { id: null };
    previousMemberBanRemoveLogId.push(temp.id);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  fetchMessageDeleteLogIdAndCount: fetchMessageDeleteLogIdAndCount,
  fetchMemberUpdateLogId: fetchMemberUpdateLogId,
  fetchMemberRoleUpdateLogId: fetchMemberRoleUpdateLogId,
  fetchMemberKickLogId: fetchMemberKickLogId,
  fetchMemberBanLogId: fetchMemberBanLogId,
  fetchMemberBanRemoveLogId: fetchMemberBanRemoveLogId,
};
