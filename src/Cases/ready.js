import {
  fetchUsers,
  fetchChannels,
  fetchEmotes,
  fetchRoles,
  fetchMemberRoleUpdateLogId,
  fetchMemberUpdateLogId,
  fetchMessageDeleteLogIdAndCount,
} from '../Functions/Helpers/fetchFunctions.js';

export const readyCaseHandler = async (client) => {
  console.log(`Logged in as The Honored One`);
  fetchChannels(client);
  fetchEmotes(client);
  fetchRoles(client);
  fetchUsers(client);
  fetchMemberRoleUpdateLogId(client);
  fetchMemberUpdateLogId(client);
  fetchMessageDeleteLogIdAndCount(client);
};
