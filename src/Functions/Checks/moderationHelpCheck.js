const fs = require('fs');

const containsForbiddenLinkCheck = (msg) => {
  let temp = msg.content.toLowerCase();
  if (temp.includes('pornhub.com') || temp.includes('nhentai.net')) {
    return 1;
  } else return 0;
};

const containsDiscordLinkCheck = (msg) => {
  let temp = msg.content.toLowerCase();
  if (temp.includes('discord.gg/') || temp.includes('discordapp.com/invite/')) {
    return 1;
  } else return 0;
};

module.exports = {
  containsForbiddenLinkCheck: containsForbiddenLinkCheck,
  containsDiscordLinkCheck: containsDiscordLinkCheck,
};
