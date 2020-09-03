/*Handles Logging of whenever a new user joins the server*/

const { MessageEmbed } = require('discord.js');

const UserSchema = require('../../Schemas/UserSchema.js');

//getting the required logging function
const userJoinLog = require('../../Loggers/Moderation/userJoinLog.js');

const guildMemberAddCaseHandler = async (mem) => {
  const channelArray = mem.guild.channels.cache;

  let welcomeChannel,
    user,
    logsChannel,
    message,
    messageEmbed,
    rulesAndInfoChannel;

  //getting all the required channels
  welcomeChannel = channelArray.get('704934870622797904');
  logsChannel = channelArray.get('447513266395283476');
  rulesAndInfoChannel = channelArray.get('742115447717232722');

  //constructing the message
  message = `${mem.user} has joined the server!`;

  //constructing the embedded message
  messageEmbed = new MessageEmbed()
    .setTitle('Welcome to the Jujutsu Kaisen discord server!')
    .setDescription(
      `Please check the <#${rulesAndInfoChannel.id}> channel to know the rules and general info about the series and this server. You can also assign yourself roles to access certain channels.`
    )
    .setThumbnail(
      'https://images-ext-2.discordapp.net/external/J_QQ3j5Q70yAN5B9ovsyqCasjsSKZvpTkwmJaWyrduk/%3Fv%3D1/https/cdn.discordapp.com/emojis/586696010978557953.png?width=80&height=80'
    );

  //sending message to the welcome channel
  welcomeChannel.send(message, { embed: messageEmbed }).catch(console.error);

  //logging in logs channel
  await userJoinLog(mem, logsChannel).catch(console.log);

  //fetching user from the database
  user = await UserSchema.findOne({ id: mem.user.id });

  //checking if user already exists in database. If false, add them to the database
  if (!user) {
    UserSchema.create({
      name: mem.user.username,
      id: mem.user.id,
      avatarUrl: mem.user.displayAvatarURL(),
      avatar: mem.user.avatar,
      discriminator: mem.user.discriminator,
      strikes: 0,
    }).catch(console.log);
  }
};

module.exports = guildMemberAddCaseHandler;
