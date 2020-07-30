const Discord = require('discord.js');
const dotenv = require('dotenv');

//config the env variables
dotenv.config();

const connectDB = require('./config/db.js');

//starting up our client
const client = new Discord.Client();

//connecting to DB
connectDB();

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

// client.on('guildBanAdd', (guild, mem) => {
//   guildBanAddCaseHandler(guild, mem);
// });

client.on('guildBanRemove', (guild, mem) => {
  guildBanRemoveCaseHandler(guild, mem);
  // let x = await guild
  //   .fetchAuditLogs({
  //     type: 'CHANNEL_OVERWRITE_UPDATE',
  //   })
  //   .then((audit) => audit.entries.first());
  // x.changes;
});

// client.on('channelUpdate', async (oldChannel, newChannel) => {
//   let x = await newChannel.guild
//     .fetchAuditLogs({
//       type: 'CHANNEL_OVERWRITE_UPDATE',
//       limit: 1,
//     })
//     .then((audit) => audit.entries.first());

//   console.log(x.changes);
//   console.log(oldChannel.permissionOverwrites.array()[3].deny.toArray());
//   console.log(newChannel.permissionOverwrites.array()[3].deny.toArray());
// });

client.login(process.env.token);
