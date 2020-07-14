const Discord = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();

const client = new Discord.Client({ partials: ['MESSAGE'] });

import {
  prefix,
  previousDeleteLogCount,
  previousDeleteLogId,
  previousMemberUpdateLogId,
  previousMemberRoleUpdateLogId,
  rolesArray,
} from './utilities';

import {
  weebResponse,
  nfufuResponse,
  bestModResponse,
  otherSeriesTalkResponse,
  xSeriesSucksResponse,
} from './Functions/responseFunctions';

//importing required Check functions
import { modPermsCheck } from './Functions/Checks/RoleChecks.js';
import {
  isSuggestionCheck,
  containsDiscordLinkCheck,
  containsForbiddenLinkCheck,
} from './Functions/Checks/moderationHelpCheck.js';
import { prefixCommandFunction } from './Functions/Checks/prefixCommandTypeCheck.js';
import {
  xSeriesSucksCheck,
  weebCheck,
  otherSeriesTalkCheck,
} from './Functions/Checks/miscChecks.js';

import {
  fetchUsers,
  fetchChannels,
  fetchEmotes,
  fetchRoles,
} from './Functions/fetchFunctions';

import {
  deleteMessageAndAttachmentLog,
  editMessageLog,
  changedNicknameLog,
  changedRoleLog,
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
  temp = await client.guilds.cache.first().fetchAuditLogs({
    type: 'MEMBER_ROLE_UPDATE',
  });
  previousMemberRoleUpdateLogId = temp.id;
});

client.on('messageDelete', async (msg) => {
  try {
    const userLogs = await msg.guild
      .fetchAuditLogs({
        type: 'MESSAGE_DELETE',
      })
      .then((audit) => audit.entries.first());
    if (!userLogs) console.log('No Audit Was Logged');
    const { executor, target } = userLogs;
    //excecutor->mod
    //target->user
    // msg.author->author of the message;
    if (
      userLogs.id === previousDeleteLogId &&
      userLogs.extra.count > previousDeleteLogCount
    ) {
      //when mod delete
      previousDeleteLogCount++;
      try {
        if (!msg.partial) {
          if (msg.attachments.array()[0]) {
            await deleteMessageAndAttachmentLog(
              msg,
              'attachment',
              executor,
              target
            );
          } else {
            await deleteMessageAndAttachmentLog(
              msg,
              'message',
              executor,
              target
            );
          }
        }
      } catch (error) {
        console.log(error);
      }
    } else if (
      userLogs.id !== previousDeleteLogId &&
      userLogs.extra.count === 1
    ) {
      //when self delete
      previousDeleteLogId = userLogs.id;
      previousDeleteLogCount = 1;
      try {
        if (msg.attachments.array()[0]) {
          await deleteMessageAndAttachmentLog(
            msg,
            'attachment',
            executor,
            target
          );
        } else {
          await deleteMessageAndAttachmentLog(msg, 'message', executor, target);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      if (msg.attachments.array()[0]) {
        await deleteMessageAndAttachmentLog(msg, 'attachment');
      } else {
        await deleteMessageAndAttachmentLog(msg, 'message');
      }
    }
  } catch (err) {
    console.log(err);
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
  const userLogs = await newMem.guild
    .fetchAuditLogs({
      type: 'MEMBER_UPDATE',
    })
    .then((audit) => audit.entries.first());
  const roleLogs = await newMem.guild
    .fetchAuditLogs({
      type: 'MEMBER_ROLE_UPDATE',
    })
    .then((audit) => audit.entries.first());
  // console.log(oldMem);
  // console.log(newMem);
  let nick = userLogs.changes[0];
  let role = roleLogs.changes[0];
  // console.log(role.new);
  if (previousMemberUpdateLogId !== userLogs.id) {
    if (userLogs.target.tag !== userLogs.executor.tag) {
      //Mod made the changes
      if (!nick.old && nick.new) {
        //new nickname
        changedNicknameLog(
          newMem,
          nick.old,
          nick.new,
          'add',
          userLogs.executor
        );
      } else if (nick.old && !nick.new) {
        //removed nicknamed
        changedNicknameLog(
          newMem,
          nick.old,
          nick.new,
          'remove',
          userLogs.executor
        );
      } else if (nick.old && nick.new && nick.old !== nick.new) {
        //nickname changed
        changedNicknameLog(
          newMem,
          nick.old,
          nick.new,
          'edit',
          userLogs.executor
        );
      }
    } else {
      //User made changes
      if (!nick.old && nick.new) {
        //new nickname
        changedNicknameLog(newMem, nick.old, nick.new, 'add');
      } else if (nick.old && !nick.new) {
        //removed nicknamed
        changedNicknameLog(newMem, nick.old, nick.new, 'remove');
      } else if (nick.old && nick.new && nick.old !== nick.new) {
        //nickname changed
        changedNicknameLog(newMem, nick.old, nick.new, 'edit');
      }
    }
    previousMemberUpdateLogId = userLogs.id;
  } else if (previousMemberRoleUpdateLogId !== roleLogs.id) {
    if (roleLogs.changes[0].key === '$add') {
      if (role.new[0].name.toLowerCase() === 'muted') {
        changedRoleLog(
          newMem,
          roleLogs.target,
          role.new[0].id,
          'mute',
          roleLogs.executor
        );
      } else {
        changedRoleLog(
          newMem,
          roleLogs.target,
          role.new[0].id,
          'add',
          roleLogs.executor
        );
      }
    } else if (roleLogs.changes[0].key === '$remove') {
      if (role.new[0].name.toLowerCase() === 'muted') {
        changedRoleLog(
          newMem,
          roleLogs.target,
          role.new[0].id,
          'unmute',
          roleLogs.executor
        );
      } else {
        changedRoleLog(
          newMem,
          roleLogs.target,
          role.new[0].id,
          'remove',
          roleLogs.executor
        );
      }
    }
    previousMemberRoleUpdateLogId = roleLogs.id;
  }
});

client.on('guildMemberAdd', (mem) => {
  console.log(mem);
});

client.login(process.env.token);
