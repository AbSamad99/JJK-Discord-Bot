import {
  userArray,
  channelArray,
  emoteArray,
  rolesArray,
} from '../utilities.js';

export const fetchUsers = (client) => {
  client.users.cache.array().forEach((user) => {
    userArray.push({ name: user.username, id: user.id });
  });
};

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

export const fetchEmotes = (client) => {
  client.emojis.cache.array().forEach((emote) => {
    emoteArray.push({
      name: emote.name,
      id: emote.id,
      animated: emote.animated,
    });
  });
};

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
