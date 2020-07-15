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
  fetchUsers(client);
  fetchChannels(client);
  fetchEmotes(client);
  fetchRoles(client);
  fetchMemberRoleUpdateLogId(client);
  fetchMemberUpdateLogId(client);
  fetchMessageDeleteLogIdAndCount(client);
};
