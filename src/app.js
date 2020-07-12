const Discord = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();

const client = new Discord.Client({ partials: ['MESSAGE'] });

import { prefix } from './utilities';
import { prefixCommandFunction } from './helperFunctions';
import { userArray } from './utilities.js';

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

import {
  fetchUsers,
  fetchChannels,
  fetchEmotes,
  fetchRoles,
} from './Functions/fetchFunctions';

import {
  deleteMessageLog,
  deleteAttachmentLog,
  editMessageLog,
  addedNicknameLog,
  changedNicknameLog,
  removedNicknameLog,
  changedAvatarLog,
} from './Functions/loggingFunctions.js';

client.on('ready', async () => {
  console.log(`Logged in as The Honored One`);
  await fetchUsers(client);
  await fetchChannels(client);
  await fetchEmotes(client);
  await fetchRoles(client);
});

client.on('messageDelete', async (msg) => {
  try {
    if (!msg.partial) {
      if (msg.attachments.array()[0]) {
        await deleteAttachmentLog(msg);
      } else {
        await deleteMessageLog(msg);
      }
    }
  } catch (error) {
    console.log(error);
  }
});

client.on('message', (msg) => {
  try {
    if (msg.content.startsWith(prefix)) {
      prefixCommandFunction(msg);
    }
    if (containsForbiddenLinkCheck(msg)) {
      msg.delete().catch(console.log);
      msg
        .reply('Please refrain from posting links to NSFW sites')
        .catch(console.log);
    }
    if (containsDiscordLinkCheck(msg)) {
      if (!modPermsCheck(msg)) {
        msg.delete().catch(console.log);
        msg.channel
          .send('Please do not link invites to other servers')
          .catch(console.log);
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
    if (isSuggestionCheck(msg)) {
      msg
        .react('👍')
        .then(() => msg.react('👎'))
        .catch(console.log);
    }
  } catch (err) {
    console.log(err);
  }
});

client.on('messageUpdate', async (oldMsg, newMsg) => {
  let honoredOne = userArray.find((user) => user.name === 'The Honored One');
  if (newMsg.author.id !== honoredOne.id && oldMsg.content !== newMsg.content) {
    try {
      await editMessageLog(oldMsg, newMsg);
    } catch (error) {
      console.log(error);
    }
  }
});

client.on('guildMemberUpdate', async (oldMem, newMem) => {
  try {
    if (!oldMem.nickname && newMem.nickname) {
      addedNicknameLog(oldMem, newMem);
    } else if (oldMem.nickname && !newMem.nickname) {
      removedNicknameLog(oldMem, newMem);
    } else if (
      oldMem.nickname &&
      newMem.nickname &&
      oldMem.nickname !== newMem.nickname
    ) {
      changedNicknameLog(oldMem, newMem);
    } else if (
      oldMem.roles.cache.array().length === newMem.roles.cache.array().length
    ) {
      changedAvatarLog(oldMem, newMem);
    }
  } catch (err) {
    console.log(err);
  }
});

client.login(process.env.token);
