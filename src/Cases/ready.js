const {
  fetchMemberRoleUpdateLogId,
  fetchMemberUpdateLogId,
  fetchMessageDeleteLogIdAndCount,
  fetchMemberKickLogId,
  fetchMemberBanLogId,
  fetchMemberBanRemoveLogId,
} = require('../Functions/Helpers/fetchFunctions.js');

const readyCaseHandler = async (client) => {
  try {
    console.log(`Logged in as The Honored One`);
    fetchMemberRoleUpdateLogId(client);
    fetchMemberUpdateLogId(client);
    fetchMessageDeleteLogIdAndCount(client);
    fetchMemberKickLogId(client);
    fetchMemberBanLogId(client);
    fetchMemberBanRemoveLogId(client);
  } catch (err) {
    console.log(err);
  }
};

module.exports = readyCaseHandler;
