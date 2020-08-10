const Discord = require('discord.js');
const dotenv = require('dotenv');
const nodeCache = require('node-cache');

//config the env variables
dotenv.config();

//starting the local cache
const myCache = new nodeCache();

const connectDB = require('./config/db.js');

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
const channelUpdateCaseHandler = require('./Cases/Channels/channelUpdate.js');
const roleUpdateCaseHandler = require('./Cases/Roles/roleUpdate.js');
const roleCreateCaseHandler = require('./Cases/Roles/roleCreate.js');
const roleDeleteCaseHandler = require('./Cases/Roles/roleDelete.js');
const channelCreateCaseHandler = require('./Cases/Channels/channelCreate.js');
const emoteCreateCaseHandler = require('./Cases/Emotes/emoteCreate.js');
const emoteDeleteCaseHandler = require('./Cases/Emotes/emoteDelete.js');
const emoteUpdateCaseHandler = require('./Cases/Emotes/emoteUpdate.js');
const channelDeleteCaseHandler = require('./Cases/Channels/channelDelete.js');

client.on('ready', () => {
  readyCaseHandler(client, myCache).catch(console.log);
});

client.on('messageDelete', (msg) => {
  messageDeleteCaseHandler(msg, myCache).catch(console.log);
});

client.on('messageDeleteBulk', (msgs) => {
  messageBulkDeleteCaseHandler(msgs).catch(console.log);
});

client.on('message', (msg) => {
  messageCaseHandler(msg, client, myCache).catch(console.log);
});

client.on('messageUpdate', (oldMsg, newMsg) => {
  messageUpdateCaseHandler(oldMsg, newMsg).catch(console.log);
});

client.on('guildMemberUpdate', (oldMem, newMem) => {
  guildMemberUpdateCaseHandler(oldMem, newMem, myCache).catch(console.log);
});

client.on('guildMemberAdd', (mem) => {
  guildMemberAddCaseHandler(mem).catch(console.log);
});

client.on('guildMemberRemove', (mem) => {
  guildMemberRemoveCaseHandler(mem, myCache).catch(console.log);
});

// client.on('guildBanAdd', (guild, mem) => {
//   guildBanAddCaseHandler(guild, mem);
// });

client.on('guildBanRemove', (guild, mem) => {
  guildBanRemoveCaseHandler(guild, mem).catch(console.log);
});

client.on('channelCreate', (channel) => {
  channelCreateCaseHandler(channel).catch(console.log);
});

client.on('channelUpdate', (oldChannel, newChannel) => {
  channelUpdateCaseHandler(oldChannel, newChannel, myCache).catch(console.log);
});

client.on('channelDelete', (channel) => {
  channelDeleteCaseHandler(channel).catch(console.log);
});

client.on('roleUpdate', (oldRole, newRole) => {
  roleUpdateCaseHandler(oldRole, newRole).catch(console.log);
});

client.on('roleCreate', (role) => {
  roleCreateCaseHandler(role).catch(console.log);
});

client.on('roleDelete', (role) => {
  roleDeleteCaseHandler(role).catch(console.log);
});

client.on('emojiCreate', (emote) => {
  emoteCreateCaseHandler(emote).catch(console.log);
});

client.on('emojiDelete', (emote) => {
  emoteDeleteCaseHandler(emote).catch(console.log);
});

client.on('emojiUpdate', (oldEmote, newEmote) => {
  emoteUpdateCaseHandler(oldEmote, newEmote).catch(console.log);
});

client.login(process.env.token);
