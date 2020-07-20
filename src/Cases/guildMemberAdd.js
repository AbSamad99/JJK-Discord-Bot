const Discord = require('discord.js');
const fs = require('fs');

const userJoinLog = require('../Functions//Loggers/userJoinLog.js');

const guildMemberAddCaseHandler = (mem) => {
  try {
    const userArray = JSON.parse(
      fs.readFileSync(`${process.cwd()}/src/Json-Files/users.json`)
    );
    const channelArray = JSON.parse(
      fs.readFileSync(`${process.cwd()}/src/Json-Files/channels.json`)
    );

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
    fs.writeFileSync(`${process.cwd()}/src/Json-Files/users.json`, userArray);
  } catch (err) {
    console.log(err);
  }
};

module.exports = guildMemberAddCaseHandler;
