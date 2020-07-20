const {
  fetchUsers,
  fetchChannels,
  fetchEmotes,
  fetchRoles,
  fetchMemberRoleUpdateLogId,
  fetchMemberUpdateLogId,
  fetchMessageDeleteLogIdAndCount,
  fetchMemberKickLogId,
  fetchMemberBanLogId,
  fetchMemberBanRemoveLogId,
  stringifyCharacterArtObj,
} = require('../Functions/Helpers/fetchFunctions.js');

const readyCaseHandler = async (client) => {
  console.log(process.cwd());
  console.log(`Logged in as The Honored One`);
  fetchChannels(client);
  fetchEmotes(client);
  fetchRoles(client);
  fetchUsers(client);
  fetchMemberRoleUpdateLogId(client);
  fetchMemberUpdateLogId(client);
  fetchMessageDeleteLogIdAndCount(client);
  fetchMemberKickLogId(client);
  fetchMemberBanLogId(client);
  fetchMemberBanRemoveLogId(client);
  stringifyCharacterArtObj();
};

module.exports = readyCaseHandler;
