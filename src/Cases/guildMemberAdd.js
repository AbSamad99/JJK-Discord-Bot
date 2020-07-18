const Discord = require('discord.js');
import { channelArray, userArray } from '../utilities';
import { userJoinLog } from '../Functions//Loggers/userJoinLog.js';

export const guildMemberAddCaseHandler = (mem) => {
  try {
    let welcomeChannel,
      modChannel,
      rulesChannel,
      infoChannel,
      message,
      messageEmbed;

    welcomeChannel = mem.guild.channels.cache
      .array()
      .find((ch) => ch.name === 'welcome');
    modChannel = mem.guild.channels.cache
      .array()
      .find((ch) => ch.name === 'syed-bot-practice');
    rulesChannel = channelArray.find((ch) => ch.name === 'rules');
    infoChannel = channelArray.find((ch) => ch.name === 'information');

    message = `<@${mem.user.id}> has joined the server! Please read the <#${rulesChannel.id}> and check out <#${infoChannel.id}> to receive roles to access certain channels.`;

    messageEmbed = new Discord.MessageEmbed()
      .setTitle('Welcome to the Jujutsu Kaisen Discord server!')
      .setDescription(
        `Please read the <#${rulesChannel.id}> and check out <#${infoChannel.id}> to receive roles to access certain channels.`
      )
      .setThumbnail(
        'https://images-ext-2.discordapp.net/external/J_QQ3j5Q70yAN5B9ovsyqCasjsSKZvpTkwmJaWyrduk/%3Fv%3D1/https/cdn.discordapp.com/emojis/586696010978557953.png?width=80&height=80'
      );

    modChannel
      .send(message)
      .then(() => modChannel.send(messageEmbed))
      .catch(console.log);

    userJoinLog(mem, modChannel);

    userArray.push({
      name: mem.user.username,
      id: mem.user.id,
      avatarUrl: mem.user.displayAvatarURL(),
      avatar: mem.user.avatar,
      discriminator: mem.user.discriminator,
    });
  } catch (err) {
    console.log(err);
  }
};
