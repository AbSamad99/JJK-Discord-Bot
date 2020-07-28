const urlExist = require('url-exist');

const containsForbiddenLinkCheck = (temp) => {
  if (temp.includes('pornhub.com/') || temp.includes('nhentai.net/')) {
    return 1;
  } else return 0;
};

const containsDiscordLinkCheck = (temp) => {
  if (temp.includes('discord.gg/') || temp.includes('discordapp.com/invite/')) {
    return 1;
  } else return 0;
};

const containsInvalidArtLinkCheck = async (link) => {
  if (
    link.includes('twitter.com/') ||
    link.includes('pixiv.net/') ||
    link.includes('instagram.com/') ||
    link.includes('tumblr.com/') ||
    (await urlExist(link))
  )
    return 0;
  else return 1;
};

module.exports = {
  containsForbiddenLinkCheck: containsForbiddenLinkCheck,
  containsDiscordLinkCheck: containsDiscordLinkCheck,
  containsInvalidArtLinkCheck: containsInvalidArtLinkCheck,
};
