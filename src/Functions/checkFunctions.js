export const weebCheck = (msg) => {
  if (
    msg.content.toLowerCase().includes('desu') ||
    msg.content.toLowerCase().includes('sore wa') ||
    msg.content.toLowerCase().includes('sore de wa') ||
    msg.content.toLowerCase().includes('shikashi') ||
    msg.content.toLowerCase().includes('omoshiroi') ||
    msg.content.toLowerCase().includes('bakadomo') ||
    msg.content.toLowerCase().includes('omaye') ||
    msg.content.toLowerCase().includes('naruhodo') ||
    msg.content.toLowerCase().includes('webtoonsu') ||
    msg.content.toLowerCase().includes('ningendomo')
  ) {
    return 1;
  } else return 0;
};

export const otherSeriesTalkCheck = (msg) => {
  let otherSeriesChannel = msg.guild.channels.cache.find(
    (ch) => ch.name === 'other-series'
  );
  if (
    msg.channel.id !== otherSeriesChannel.id &&
    (msg.content.toLowerCase().includes('fate') ||
      msg.content.toLowerCase().includes('nasu') ||
      msg.content.toLowerCase().includes('d gray man') ||
      msg.content.toLowerCase().includes('D. Gray-man') ||
      msg.content.toLowerCase().includes('DGM'))
  ) {
    return 1;
  } else return 0;
};

export const xSeriesSucksCheck = (msg) => {
  if (
    msg.content.toLowerCase() === 'fate sucks' ||
    msg.content.toLowerCase() === 'd gray man sucks' ||
    msg.content.toLowerCase() === 'kubera sucks' ||
    msg.content.toLowerCase() === 'dgm sucks' ||
    msg.content.toLowerCase() === 'd. gray-man sucks'
  ) {
    return 1;
  } else return 0;
};

export const isSuggestionCheck = (msg) => {
  let suggestionsChannel = msg.guild.channels.cache.find(
    (ch) => ch.name === 'server-suggestions'
  );
  if (msg.channel.id === suggestionsChannel.id) {
    return 1;
  } else return 0;
};

export const containsForbiddenLinkCheck = (msg) => {
  if (msg.content.toLowerCase().includes('pornhub.com' || 'nhentai.net')) {
    return true;
  } else return false;
};

export const containsDiscordLinkCheck = (msg) => {
  if (
    msg.content.toLowerCase().includes('discord.gg/') ||
    msg.content.toLowerCase().includes('discordapp.com/invite/')
  ) {
    return true;
  } else return false;
};

export const modPermsCheck = (msg) => {
  let modRole1 = msg.guild.roles.cache.find(
    (role) => role.name === 'Special-Grade-Shaman'
  );
  let modRole2 = msg.guild.roles.cache.find((role) => role.name === 'admin');
  if (
    msg.member.roles.cache.has(modRole1.id) ||
    msg.member.roles.cache.has(modRole2.id)
  ) {
    return 1;
  } else return 0;
};
