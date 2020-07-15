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

client.login(process.env.token);
