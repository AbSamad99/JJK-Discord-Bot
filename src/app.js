const Discord = require('discord.js');
const client = new Discord.Client();
import { DISCORD_TOKEN, prefix } from './constants';
import {
  containsForbiddenLink,
  containsDiscordLink,
  pollAnnouncement,
  chapterAnnouncement,
  weebResponse,
  nfufuResponse,
  bestModResponse,
  weebCheck,
  otherSeriesTalkCheck,
  xSeriesSucksCheck,
  isSuggestion,
} from './helperFunctions';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (msg) => {
  if (containsForbiddenLink(msg)) {
    msg.delete();
    msg.reply('Please refrain from posting links to NSFW sites');
  }
  if (containsDiscordLink(msg)) {
    const modRole = msg.guild.roles.cache.find((role) => (role.name = 'Mod'));
    if (msg.member.roles.cache.has(modRole.id)) {
      msg.delete();
      msg.channel.send('Please do not link invites to other servers');
    } else console.log('Mod');
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
    if (msg.content.toLowerCase().includes('poll')) {
      pollAnnouncement(msg);
    } else if (msg.content.toLowerCase().includes('chapter')) {
      chapterAnnouncement(msg);
    }
  }
  if (isSuggestion(msg)) {
    msg.react('👍').then(() => msg.react('👎'));
  }
});

client.login(DISCORD_TOKEN);
