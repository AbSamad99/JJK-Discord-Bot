const Discord = require('discord.js');
const client = new Discord.Client();
import { prefix } from './utilities';
import { prefixCommandFunction } from './helperFunctions';

import {
  weebResponse,
  nfufuResponse,
  bestModResponse,
} from './Functions/responseFunctions';

import {
  containsDiscordLinkCheck,
  containsForbiddenLinkCheck,
  isSuggestionCheck,
  otherSeriesTalkCheck,
  weebCheck,
  xSeriesSucksCheck,
} from './Functions/checkFunctions';

client.on('ready', () => {
  console.log(`Logged in as The Honored One`);
});

client.on('message', (msg) => {
  if (containsForbiddenLinkCheck(msg)) {
    msg.delete();
    msg.reply('Please refrain from posting links to NSFW sites');
  }
  if (containsDiscordLinkCheck(msg)) {
    let modRole1 = msg.guild.roles.cache.find((role) => role.name === 'admin');
    console.log(
      msg.member.roles.cache.has(modRole1.id),
      msg.member.roles.cache.entries.length
    );
    if (msg.member.roles.cache.has(modRole1.id)) {
      console.log('mod');
    } else {
      msg.delete();
      msg.channel.send('Please do not link invites to other servers');
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
    msg.channel.send('I agree <:100:730318095821963357>');
  } else if (otherSeriesTalkCheck(msg)) {
    let chance = Math.random() * 100;
    if (chance > 30) {
      msg.channel.send('Go to <#730126519833329706>');
    }
  }
  if (msg.content.startsWith(prefix)) {
    prefixCommandFunction(msg);
  }
  if (isSuggestionCheck(msg)) {
    msg.react('👍').then(() => msg.react('👎'));
  }
});

client.login(process.env.token);
