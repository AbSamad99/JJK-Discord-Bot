const Discord = require('discord.js');
const client = new Discord.Client();
import { prefix } from './utilities';
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
    const modRole1 = msg.guild.roles.cache.find(
      (role) => (role.name = 'Special-Grade-Shaman')
    );
    let modRole2 = msg.guild.roles.cache.find((role) => role.name === 'admin');
    if (
      msg.member.roles.cache.has(modRole1.id) ||
      msg.member.roles.cache.has(modRole2.id)
    ) {
      console.log(
        msg.member.roles.cache.has(modRole1.id),
        msg.member.roles.cache.has(modRole2.id)
      );
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
    let modRole1 = msg.guild.roles.cache.find(
      (role) => role.name === 'Special-Grade-Shaman'
    );
    let modRole2 = msg.guild.roles.cache.find((role) => role.name === 'admin');
    if (
      msg.content.toLowerCase().includes('poll') &&
      (msg.member.roles.cache.has(modRole1.id) ||
        msg.member.roles.cache.has(modRole2.id))
    ) {
      pollAnnouncement(msg);
    } else if (
      msg.content.toLowerCase().includes('chapter') &&
      (msg.member.roles.cache.has(modRole1.id) ||
        msg.member.roles.cache.has(modRole2.id))
    ) {
      chapterAnnouncement(msg);
    }
  }
  if (isSuggestion(msg)) {
    msg.react('👍').then(() => msg.react('👎'));
  }
});

client.login(process.env.token);
