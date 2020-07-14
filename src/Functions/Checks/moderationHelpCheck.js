import { channelArray } from '../../utilities';

export const isSuggestionCheck = (msg) => {
  let suggestionsChannel = channelArray.find(
    (ch) => ch.name === 'server-suggestions'
  );
  if (!suggestionsChannel) {
    return 0;
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
