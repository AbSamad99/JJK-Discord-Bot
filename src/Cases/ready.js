const {
  fetchUsers,
  fetchMemberRoleUpdateLogId,
  fetchMemberUpdateLogId,
  fetchMessageDeleteLogIdAndCount,
  fetchMemberKickLogId,
  fetchMemberBanLogId,
  fetchMemberBanRemoveLogId,
  stringifyCharacterArtObj,
} = require('../Functions/Helpers/fetchFunctions.js');

const readyCaseHandler = async (client) => {
  try {
    console.log(`Logged in as The Honored One`);
    fetchUsers(client);
    fetchMemberRoleUpdateLogId(client);
    fetchMemberUpdateLogId(client);
    fetchMessageDeleteLogIdAndCount(client);
    fetchMemberKickLogId(client);
    fetchMemberBanLogId(client);
    fetchMemberBanRemoveLogId(client);
    stringifyCharacterArtObj();
  } catch (err) {
    console.log(err);
  }
};

module.exports = readyCaseHandler;
