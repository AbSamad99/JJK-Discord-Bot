const Discord = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();

const client = new Discord.Client({ partials: ['MESSAGE'] });

const messageCaseHandler = require('./Cases/message.js');
const messageUpdateCaseHandler = require('./Cases/messageUpdate.js');
const guildMemberUpdateCaseHandler = require('./Cases/guildMemberUpdate.js');
const messageDeleteCaseHandler = require('./Cases/messageDelete.js');
const readyCaseHandler = require('./Cases/ready.js');
const guildMemberAddCaseHandler = require('./Cases/guildMemberAdd.js');
const guildMemberRemoveCaseHandler = require('./Cases/guildMemberRemove.js');
const guildBanAddCaseHandler = require('./Cases/guildBanAdd.js');
const guildBanRemoveCaseHandler = require('./Cases/guildBanRemove.js');
const messageBulkDeleteCaseHandler = require('./Cases/messageBulkDelete.js');

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
  messageBulkDeleteCaseHandler(msgs);
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
