import { channelArray, rolesArray } from '../utilities.js';

// export const weebCheck = (msg) => {
//   let temp = msg.content.toLowerCase();
//   if (
//     temp.includes('desu') ||
//     temp.includes('sore wa') ||
//     temp.includes('sore de wa') ||
//     temp.includes('shikashi') ||
//     temp.includes('omoshiroi') ||
//     temp.includes('bakadomo') ||
//     temp.includes('omaye') ||
//     temp.includes('naruhodo') ||
//     temp.includes('webtoonsu') ||
//     temp.includes('ningendomo') ||
//     temp.includes('zasshu') ||
//     temp.includes('subarashi')
//   ) {
//     return 1;
//   } else return 0;
// };

export const otherSeriesTalkCheck = (msg) => {
  let temp = msg.content.toLowerCase();
  let otherSeriesChannel = channelArray.find(
    (ch) => ch.name === 'other-series'
  );
  if (!otherSeriesChannel) {
    return;
  }
  if (
    msg.channel.id !== otherSeriesChannel.id &&
    (temp.includes('fate') ||
      temp.includes('nasu') ||
      temp.includes('d gray man') ||
      temp.includes('d. gray-man') ||
      temp.includes('d-gray man') ||
      temp.includes('dgm') ||
      temp.includes('kubera'))
  ) {
    return 1;
  } else return 0;
};

export const xSeriesSucksCheck = (msg) => {
  let temp = msg.content.toLowerCase();
  if (
    temp === 'fate sucks' ||
    temp === 'd gray man sucks' ||
    temp === 'kubera sucks' ||
    temp === 'dgm sucks' ||
    temp === 'd. gray-man sucks'
  ) {
    return 1;
  } else return 0;
};

export const isSuggestionCheck = (msg) => {
  let suggestionsChannel = channelArray.find(
    (ch) => ch.name === 'server-suggestions'
  );
  if (!suggestionsChannel) {
    return;
  }
  if (msg.channel.id === suggestionsChannel.id) {
    return 1;
  } else return 0;
};

export const containsForbiddenLinkCheck = (msg) => {
  let temp = msg.content.toLowerCase();
  if (temp.includes('pornhub.com') || temp.includes('nhentai.net')) {
    return 1;
  } else return 0;
};

export const containsDiscordLinkCheck = (msg) => {
  let temp = msg.content.toLowerCase();
  if (temp.includes('discord.gg/') || temp.includes('discordapp.com/invite/')) {
    return 1;
  } else return 0;
};

export const modPermsCheck = (msg) => {
  let temp = msg.member.roles.cache;
  let modRole1 = rolesArray.find(
    (role) => role.name === 'Special-Grade Shaman'
  );
  let modRole2 = rolesArray.find((role) => role.name === 'admin');
  if (temp.has(modRole1.id) || temp.has(modRole2.id)) {
    return 1;
  } else return 0;
};
