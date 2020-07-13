import {
  userArray,
  channelArray,
  emoteArray,
  rolesArray,
} from '../utilities.js';

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
