const Discord = require('discord.js');
const client = new Discord.Client();
import { prefix } from './utilities';
import { prefixCommandFunction } from './helperFunctions';

import {
  weebResponse,
  nfufuResponse,
  bestModResponse,
  otherSeriesTalkResponse,
  xSeriesSucksResponse,
} from './Functions/responseFunctions';

import {
  containsDiscordLinkCheck,
  containsForbiddenLinkCheck,
  isSuggestionCheck,
  otherSeriesTalkCheck,
  weebCheck,
  xSeriesSucksCheck,
  modPermsCheck,
} from './Functions/checkFunctions';

client.on('ready', () => {
  console.log(`Logged in as The Honored One`);
});

client.on('message', (msg) => {
  try {
    if (containsForbiddenLinkCheck(msg)) {
      msg.delete();
      msg.reply('Please refrain from posting links to NSFW sites');
    }
    if (containsDiscordLinkCheck(msg)) {
      if (!modPermsCheck(msg)) {
        msg.delete();
        msg.channel.send('Please do not link invites to other servers');
      } else {
        console.log('mod');
      }
    }
    if (msg.content.includes('mod')) {
      bestModResponse(msg);
    }
    if (msg.content.toLowerCase().includes('nfufu')) {
      nfufuResponse(msg);
    } else if (weebCheck(msg)) {
      weebResponse(msg);
    }
    if (xSeriesSucksCheck(msg)) {
      xSeriesSucksResponse(msg);
    } else if (otherSeriesTalkCheck(msg)) {
      otherSeriesTalkResponse(msg);
    }
    if (msg.content.startsWith(prefix)) {
      prefixCommandFunction(msg);
    }
    if (isSuggestionCheck(msg)) {
      msg.react('👍').then(() => msg.react('👎'));
    }
  } catch (err) {
    console.log(err);
  }
});

client.login(process.env.token);
