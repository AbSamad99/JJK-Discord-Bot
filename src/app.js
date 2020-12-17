const Discord = require('discord.js');
const dotenv = require('dotenv');
const nodeCache = require('node-cache');

//config the env variables
dotenv.config();

//starting the local cache
export const myCache = new nodeCache();

//importing setup functions
const connectDB = require('./config/db.js');
const twitSetup = require('./config/twit.js');
const redditSetup = require('./config/reddit.js');
const keepAlive = require('./keep_alive');

//starting up our client
export const client = new Discord.Client();

//connecting to DB, twitter and reddit and keeping bot alive
connectDB();
keepAlive();
const twitterStream = twitSetup();
const redditStream = redditSetup();

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

//whenever tweet is sent
twitterStream.on('tweet', (tweet) => {
  if (
    tweet.retweeted_status ||
    tweet.in_reply_to_status_id ||
    tweet.in_reply_to_status_id_str ||
    tweet.in_reply_to_user_id ||
    tweet.in_reply_to_user_id_str ||
    tweet.in_reply_to_screen_name
  )
    return;
  const twitterMessage = `${tweet.user.name} (@${tweet.user.screen_name}) tweeted this: https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`;
  client.channels.cache
    .get('745875999471960074')
    .send(twitterMessage)
    .catch(console.log);
  return false;
});

//reddit posts
const startupTime = Date.now() / 1000;
redditStream.on('item', (item) => {
  try {
    if (item.created_utc < startupTime) return;
    console.log('New reddit post');
    let description = `**Link to post:-** [Click Here](https://redd.it/${item.id})`;
    const redditEmbed = new Discord.MessageEmbed()
      .setTitle(`**__${item.title}__**`)
      .setFooter(`Author: u/${item.author.name}`);
    if (['.png', '.jpg', '.jpeg'].some(type => item.url.includes(type))) {
      redditEmbed.setImage(item.url);
    }
    if (item.selftext && item.selftext.length && item.selftext.length <= 2048) {
      redditEmbed.setDescription(`${description}

${'```'}${item.selftext}${'```'}`);
    } else {
      redditEmbed.setDescription(description);
    }
    client.channels.cache
      .get('465858883412295691')
      .send(redditEmbed)
      .catch(console.log);
  } catch (err) {
    console.log(err)
  }
});

//when client is ready
client.on('ready', () => {
  readyCaseHandler().catch(console.log);
});

//all message cases
client.on('message', (msg) => {
  messageCaseHandler(msg).catch(console.log);
});

client.on('messageUpdate', (oldMsg, newMsg) => {
  messageUpdateCaseHandler(oldMsg, newMsg).catch(console.log);
});

client.on('messageDelete', (msg) => {
  messageDeleteCaseHandler(msg).catch(console.log);
});

// client.on('messageDeleteBulk', (msgs) => {
//   messageBulkDeleteCaseHandler(msgs).catch(console.log);
// });

//all member case
client.on('guildMemberAdd', (mem) => {
  guildMemberAddCaseHandler(mem).catch(console.log);
});

client.on('guildMemberUpdate', (oldMem, newMem) => {
  guildMemberUpdateCaseHandler(oldMem, newMem).catch(console.log);
});

client.on('guildMemberRemove', (mem) => {
  guildMemberRemoveCaseHandler(mem).catch(console.log);
});

client.on('guildBanAdd', (guild, mem) => {
  guildBanAddCaseHandler(guild, mem);
});

client.on('guildBanRemove', (guild, mem) => {
  guildBanRemoveCaseHandler(guild, mem).catch(console.log);
});

//all channel cases
client.on('channelCreate', (channel) => {
  channelCreateCaseHandler(channel).catch(console.log);
});

client.on('channelUpdate', (oldChannel, newChannel) => {
  console.log('ch update')
  channelUpdateCaseHandler(oldChannel, newChannel).catch(console.log);
});

client.on('channelDelete', (channel) => {
  channelDeleteCaseHandler(channel).catch(console.log);
});

//all role cases
client.on('roleUpdate', (oldRole, newRole) => {
  roleUpdateCaseHandler(oldRole, newRole).catch(console.log);
});

client.on('roleCreate', (role) => {
  roleCreateCaseHandler(role).catch(console.log);
});

client.on('roleDelete', (role) => {
  roleDeleteCaseHandler(role).catch(console.log);
});

//all emoji cases
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
