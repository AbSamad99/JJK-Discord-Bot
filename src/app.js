const Discord = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();

const client = new Discord.Client({ partials: ['MESSAGE'] });

import {
  prefix,
  previousDeleteLogCount,
  previousDeleteLogId,
  previousMemberUpdateLogId,
} from './utilities';
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
  changedUsername,
} from './Functions/loggingFunctions.js';

import { userArray } from './utilities';

client.on('ready', async () => {
  console.log(`Logged in as The Honored One`);
  await fetchUsers(client);
  await fetchChannels(client);
  await fetchEmotes(client);
  await fetchRoles(client);
  let temp = await client.guilds.cache
    .first()
    .fetchAuditLogs({
      type: 'MESSAGE_DELETE',
    })
    .then((audit) => audit.entries.first());
  previousDeleteLogId = temp.id;
  previousDeleteLogCount = temp.extra.count;
  temp = await client.guilds.cache
    .first()
    .fetchAuditLogs({
      type: 'MEMBER_UPDATE',
    })
    .then((audit) => audit.entries.first());
  previousMemberUpdateLogId = temp.id;
});

client.on('messageDelete', async (msg) => {
  const fetchedLogs = await msg.guild
    .fetchAuditLogs({
      type: 'MESSAGE_DELETE',
    })
    .then((audit) => audit.entries.first());
  if (!fetchedLogs) console.log('No Audit Was Logged');
  const { executor, target } = fetchedLogs;
  //excecutor->mod
  //target->user
  // msg.author->author of the message;
  if (
    fetchedLogs.id === previousDeleteLogId &&
    fetchedLogs.extra.count > previousDeleteLogCount
  ) {
    //when mod delete
    previousDeleteLogCount++;
    try {
      if (!msg.partial) {
        if (msg.attachments.array()[0]) {
          await deleteAttachmentLog(msg, executor, target);
        } else {
          await deleteMessageLog(msg, executor, target);
        }
      }
    } catch (error) {
      console.log(error);
    }
  } else if (
    fetchedLogs.id !== previousDeleteLogId &&
    fetchedLogs.extra.count === 1
  ) {
    //when self delete
    previousDeleteLogId = fetchedLogs.id;
    previousDeleteLogCount = 1;
    try {
      if (msg.attachments.array()[0]) {
        await deleteAttachmentLog(msg, executor, target);
      } else {
        await deleteMessageLog(msg, executor, target);
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    try {
      if (msg.attachments.array()[0]) {
        await deleteAttachmentLog(msg);
      } else {
        await deleteMessageLog(msg);
      }
    } catch (err) {
      console.log(err);
    }
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
  let honoredOne = await userArray.find(
    (user) => user.name === 'The Honored One'
  );
  if (newMsg.author.id !== honoredOne.id && oldMsg.content !== newMsg.content) {
    try {
      await editMessageLog(oldMsg, newMsg);
    } catch (error) {
      console.log(error);
    }
  }
});

client.on('guildMemberUpdate', async (oldMem, newMem) => {
  const fetchedLogs = await newMem.guild
    .fetchAuditLogs({
      type: 'MEMBER_UPDATE',
    })
    .then((audit) => audit.entries.first());
  // console.log(oldMem);
  // console.log(newMem);
  let nick = fetchedLogs.changes[0];
  console.log(nick, fetchedLogs.id, previousMemberUpdateLogId);
  try {
    if (previousMemberUpdateLogId !== fetchedLogs.id) {
      if (!nick.old && nick.new) {
        addedNicknameLog(newMem, nick.new);
      } else if (nick.old && !nick.new) {
        removedNicknameLog(newMem, nick.old);
      } else if (nick.old && nick.new && nick.old !== nick.new) {
        changedNicknameLog(newMem, nick.old, nick.new);
      }
      previousMemberUpdateLogId = fetchedLogs.id;
    } else {
      console.log('Something else happened');
    }
  } catch (err) {
    console.log(err);
  }
});

client.on('guildMemberAdd', (mem) => {
  console.log(mem);
});

client.login(process.env.token);
