const Discord = require('discord.js');

const UserSchema = require('../Schemas/UserSchema.js');

const userJoinLog = require('../Functions/Loggers/User_logs/userJoinLog.js');

const guildMemberAddCaseHandler = async (mem) => {
  try {
    const channelArray = mem.guild.channels.cache;

    let welcomeChannel,
      user,
      logsChannel,
      rulesChannel,
      infoChannel,
      message,
      messageEmbed;

    welcomeChannel = channelArray.find((ch) => ch.name === 'welcome');
    logsChannel = channelArray.find((ch) => ch.name === 'logs');
    rulesChannel = channelArray.find((ch) => ch.name === 'rules');
    infoChannel = channelArray.find((ch) => ch.name === 'information');

    message = `${mem.user} has joined the server!`;

    messageEmbed = new Discord.MessageEmbed()
      .setTitle('Welcome to the Jujutsu Kaisen discord server!')
      .setDescription(
        `Please read the <#${rulesChannel.id}> and check out <#${infoChannel.id}> to receive roles to access certain channels.`
      )
      .setThumbnail(
        'https://images-ext-2.discordapp.net/external/J_QQ3j5Q70yAN5B9ovsyqCasjsSKZvpTkwmJaWyrduk/%3Fv%3D1/https/cdn.discordapp.com/emojis/586696010978557953.png?width=80&height=80'
      );

    welcomeChannel.send(message, { embed: messageEmbed }).catch(console.error);

    userJoinLog(mem, logsChannel);

    user = await UserSchema.findOne({ id: mem.user.id });

    if (!user) {
      await UserSchema.create({
        name: mem.user.username,
        id: mem.user.id,
        avatarUrl: mem.user.displayAvatarURL(),
        avatar: mem.user.avatar,
        discriminator: mem.user.discriminator,
        strikes: 0,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = guildMemberAddCaseHandler;
