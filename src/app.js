const Discord = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();

const client = new Discord.Client({ partials: ['MESSAGE'] });

import { messageCaseHandler } from './Cases/message.js';
import { messageUpdateCaseHandler } from './Cases/messageUpdate.js';
import { guildMemberUpdateCaseHandler } from './Cases/guildMemberUpdate.js';
import { messageDeleteCaseHandler } from './Cases/messageDelete.js';
import { readyCaseHandler } from './Cases/ready.js';
import { guildMemberAddCaseHandler } from './Cases/guildMemberAdd.js';
import { guildMemberRemoveCaseHandler } from './Cases/guildMemberRemove.js';
import { guildBanAddCaseHandler } from './Cases/guildBanAdd.js';
import { messageBulkDeleteLog } from './Functions/Loggers/loggingFunctions';
import { guildBanRemoveCaseHandler } from './Cases/guildBanRemove';

client.on('ready', async () => {
  await client.user.setStatus('online');
  await client.user.setActivity('You All', {
    type: 'WATCHING',
  });
  readyCaseHandler(client);
});

client.on('messageDelete', async (msg) => {
  messageDeleteCaseHandler(msg);
});

client.on('messageDeleteBulk', (msgs) => {
  messageBulkDeleteLog(msgs);
});

client.on('message', (msg) => {
  messageCaseHandler(msg);
});

client.on('messageUpdate', async (oldMsg, newMsg) => {
  messageUpdateCaseHandler(oldMsg, newMsg);
});

client.on('guildMemberUpdate', async (oldMem, newMem) => {
  guildMemberUpdateCaseHandler(oldMem, newMem);
});

client.on('guildMemberAdd', (mem) => {
  guildMemberAddCaseHandler(mem);
});

client.on('guildMemberRemove', (mem) => {
  guildMemberRemoveCaseHandler(mem);
});

client.on('guildBanAdd', (guild, mem) => {
  guildBanAddCaseHandler(guild, mem);
});

client.on('guildBanRemove', (guild, mem) => {
  guildBanRemoveCaseHandler(guild, mem);
});

client.login(process.env.token);
