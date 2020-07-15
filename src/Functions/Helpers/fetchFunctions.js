import {
  userArray,
  channelArray,
  emoteArray,
  rolesArray,
  previousDeleteLogCount,
  previousDeleteLogId,
  previousMemberRoleUpdateLogId,
  previousMemberUpdateLogId,
} from '../../utilities';

//fetches array of all users
export const fetchUsers = (client) => {
  client.users.cache.array().forEach((user) => {
    userArray.push({ name: user.username, id: user.id });
  });
};

//fetches array of all channels
export const fetchChannels = (client) => {
  client.channels.cache.array().forEach((channel) => {
    if (channel.type === 'category') {
      return;
    }
    channelArray.push({
      type: channel.type,
      name: channel.name,
      id: channel.id,
      nsfw: channel.nsfw,
    });
  });
};

//fetches array of all emotes
export const fetchEmotes = (client) => {
  client.emojis.cache.array().forEach((emote) => {
    emoteArray.push({
      name: emote.name,
      id: emote.id,
      animated: emote.animated,
    });
  });
};

//fetches array of all roles
export const fetchRoles = (client) => {
  client.guilds.cache
    .array()[0]
    .roles.cache.array()
    .forEach((role) => {
      rolesArray.push({
        name: role.name,
        id: role.id,
        color: role.color,
      });
    });
};

//fetches message delete log id and count
export const fetchMessageDeleteLogIdAndCount = async (client) => {
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
export const fetchMemberUpdateLogId = async (client) => {
  let temp = await client.guilds.cache
    .first()
    .fetchAuditLogs({
      type: 'MEMBER_UPDATE',
    })
    .then((audit) => audit.entries.first());
  previousMemberUpdateLogId.push(temp.id);
};

//fetches member role update log id
export const fetchMemberRoleUpdateLogId = async (client) => {
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
