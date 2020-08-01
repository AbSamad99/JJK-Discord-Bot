const Discord = require('discord.js');
const dotenv = require('dotenv');

//config the env variables
dotenv.config();

const connectDB = require('./Config/db.js');

//starting up our client
const client = new Discord.Client();

//connecting to DB
connectDB();

//importing required case handlers
const messageCaseHandler = require('./Cases/Other/message.js');
const messageUpdateCaseHandler = require('./Cases/User/messageUpdate.js');
const guildMemberUpdateCaseHandler = require('./Cases/User/guildMemberUpdate.js');
const messageDeleteCaseHandler = require('./Cases/User/messageDelete.js');
const readyCaseHandler = require('./Cases/Other/ready.js');
const guildMemberAddCaseHandler = require('./Cases/User/guildMemberAdd.js');
const guildMemberRemoveCaseHandler = require('./Cases/Moderation/guildMemberRemove.js');
const guildBanAddCaseHandler = require('./Cases/Moderation/guildBanAdd.js');
const guildBanRemoveCaseHandler = require('./Cases/Moderation/guildBanRemove.js');
const messageBulkDeleteCaseHandler = require('./Cases/Moderation/messageBulkDelete.js');
const channelUpdateCaseHandler = require('./Cases/Moderation/channelUpdate.js');

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

// client.on('guildBanAdd', (guild, mem) => {
//   guildBanAddCaseHandler(guild, mem);
// });

client.on('guildBanRemove', (guild, mem) => {
  guildBanRemoveCaseHandler(guild, mem);
});

client.on('channelUpdate', async (oldChannel, newChannel) => {
  channelUpdateCaseHandler(oldChannel, newChannel);
});

client.login(process.env.token);
