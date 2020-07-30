const Discord = require('discord.js');

const UserSchema = require('../../Schemas/UserSchema.js');

const { assignMuteRole } = require('../Roles/roleFunctions.js');
const userKickLog = require('../Loggers/userKickLog.js');
const userBanLog = require('../Loggers/userBanLog.js');
const { roleCheck } = require('../Checks/helperChecks.js');
const gifOrPngCheck = require('../Checks/gifOrPngCheck.js');

//command to mute users
const muteCommand = (msg) => {
  try {
    let toMute, muteRole, temp, reason, time, logsChannel;
    toMute = msg.mentions.members.array()[0];
    logsChannel = msg.guild.channels.cache.find((ch) => ch.name === 'logs');
    if (!toMute) {
      msg.channel.send('Please mention a user to mute');
      return;
    }
    if (
      roleCheck(toMute, 'Special-Grade Shaman') ||
      roleCheck(toMute, 'admin')
    ) {
      msg.channel.send('You cannot mute this user');
      return;
    }
    muteRole = msg.guild.roles.cache
      .array()
      .find((role) => role.name === 'Muted');
    toMute = msg.guild.member(toMute);
    temp = msg.content.slice(1);
    temp = temp.split(' ');
    if (!temp[2] || !temp[3]) {
      msg.channel.send('Please mention duration of the mute');
      return;
    } else if (
      isNaN(temp[2]) ||
      (temp[3] !== 'm' && temp[3] !== 's' && temp[3] !== 'd' && temp[3] !== 'h')
    ) {
      msg.channel.send('Please specify valid time format');
      return;
    }
    if (toMute.roles.cache.has(muteRole.id)) {
      msg.channel.send('User is Already Muted');
      return;
    }
    if (temp.length > 4) {
      reason = temp.slice(4);
      reason = reason.join(' ');
    } else {
      msg.channel.send('Please provide a reason for mute');
      return;
    }
    time = temp[2].concat(temp[3]);
    assignMuteRole(msg, toMute, muteRole, time, logsChannel, reason);
  } catch (err) {
    console.log(err);
  }
};

//command to kick users
const kickCommand = (msg) => {
  try {
    let toKick, temp, reason, logsChannel;
    toKick = msg.mentions.members.array()[0];
    logsChannel = msg.guild.channels.cache.find((ch) => ch.name === 'logs');
    if (!toKick) {
      msg.channel.send('Please mention a user to kick');
      return;
    }
    if (
      roleCheck(toKick, 'Special-Grade Shaman') ||
      roleCheck(toKick, 'admin')
    ) {
      msg.channel.send('You cannot kick this user');
      return;
    }
    temp = msg.content.slice(1);
    temp = temp.split(' ');
    if (temp.length > 2) {
      reason = temp.slice(2);
      reason = reason.join(' ');
    } else {
      msg.channel.send('Please provide a reason for kick');
      return;
    }

    toKick
      .kick(reason)
      .then(() => {
        userKickLog(null, null, msg, logsChannel, toKick, reason);
      })
      .catch(console.error);
  } catch (err) {
    console.log(err);
  }
};

//command to ban users
const banCommand = (msg) => {
  try {
    let toBan, temp, reason, logsChannel;
    toBan = msg.mentions.members.array()[0];
    logsChannel = msg.guild.channels.cache.find((ch) => ch.name === 'logs');
    if (!toBan) {
      msg.channel.send('Please mention a user to ban');
      return;
    }
    if (roleCheck(toBan, 'Special-Grade Shaman') || roleCheck(toBan, 'admin')) {
      msg.channel.send('You cannot ban this user');
      return;
    }
    temp = msg.content.slice(1);
    temp = temp.split(' ');
    if (temp.length > 2) {
      reason = temp.slice(2);
      reason = reason.join(' ');
    } else {
      msg.channel.send('Please provide a reason for ban');
      return;
    }
    console.log({
      user: toBan.user.username,
      reason: reason,
    });

    toBan
      .ban({ reason: reason })
      .then(() => {
        userBanLog(null, null, msg, logsChannel, toBan, reason);
      })
      .catch(console.error);
  } catch (err) {
    console.log(err);
  }
};

//command to issue strikes
const strikeCommand = async (msg) => {
  try {
    let toStrike, user, temp, muteRole, reason, logsChannel, strikesCount;

    toStrike = msg.mentions.members.array()[0];
    logsChannel = msg.guild.channels.cache.find((ch) => ch.name === 'logs');
    if (!toStrike) {
      msg.channel.send('Please mention a user to ban');
      return;
    }
    user = await UserSchema.findOne({ id: toStrike.user.id });
    if (!user) {
      await UserSchema.create({
        name: toStrike.user.username,
        id: toStrike.user.id,
        avatarUrl: toStrike.user.displayAvatarURL(),
        avatar: toStrike.user.avatar,
        discriminator: toStrike.user.discriminator,
        strikes: 0,
      });
    }
    if (
      roleCheck(toStrike, 'Special-Grade Shaman') ||
      roleCheck(toStrike, 'admin')
    ) {
      msg.channel.send('You cannot issue strikes to this user');
      return;
    }
    temp = msg.content.slice(1);
    temp = temp.split(' ');
    if (temp.length > 2) {
      reason = temp.slice(2);
      reason = reason.join(' ');
    } else {
      msg.channel.send('Please provide a reason for strike');
      return;
    }

    strikesCount = user.strikes;
    strikesCount++;

    await UserSchema.findOneAndUpdate(
      { id: toStrike.user.id },
      { strikes: strikesCount },
      { useFindAndModify: false }
    );

    user = await UserSchema.findOne({ id: toStrike.user.id });

    let strikeEmbed = new Discord.MessageEmbed()
      .setAuthor(msg.author.tag, await gifOrPngCheck(msg.author))
      .setTitle('Strike Issued')
      .setColor(10038562)
      .setThumbnail(await gifOrPngCheck(toStrike.user))
      .setFooter(new Date());
    //1 strike
    if (user.strikes === 1) {
      strikeEmbed.setDescription(`<@${toStrike.user.id}> has been issued a strike for the following reason: ${reason}. 
  This is their first strike, therefore they are only being warned. The next strike will result in them being muted for 24 hours`);

      msg.channel
        .send(strikeEmbed)
        .then(() => logsChannel.send(strikeEmbed))
        .catch(console.error);
    }
    //2 strikes
    else if (user.strikes === 2) {
      muteRole = msg.guild.roles.cache
        .array()
        .find((role) => role.name === 'Muted');

      strikeEmbed.setDescription(`<@${toStrike.user.id}> has been issued a strike for the following reason: ${reason}. 
  This is their second strike, therefore they shall be muted for 24 hours. The next strike will result in them being kicked from the server`);

      msg.channel
        .send(strikeEmbed)
        .then(() => logsChannel.send(strikeEmbed))
        .then(() =>
          assignMuteRole(
            msg,
            toStrike,
            muteRole,
            '24h',
            logsChannel,
            `Muted for getting issued a 2nd strike for the following reason: ${reason}`
          )
        )
        .catch(console.error);
    }
    //3 strikes
    else if (user.strikes === 3) {
      strikeEmbed.setDescription(`<@${toStrike.user.id}> has been issued a strike for the following reason: ${reason}. 
  This is their third strike, therefore they shall be kicked from the server. The next strike will result in them being permanentally banned from the server`);

      msg.channel
        .send(strikeEmbed)
        .then(() => logsChannel.send(strikeEmbed))
        .catch(console.error);

      toStrike
        .kick(
          `Kicked for getting issued a 3rd strike for the following reason: ${reason}`
        )
        .then(() => {
          userKickLog(
            null,
            msg,
            logsChannel,
            toStrike,
            `Kicked for getting issued a 3rd strike for the following reason: ${reason}`
          );
        })
        .catch(console.error);
    }
    //4 strikes
    else if (user.strikes === 4) {
      strikeEmbed.setDescription(`<@${toStrike.user.id}> has been issued a strike for the following reason: ${reason}. 
  This is their fourth strike, therefore they shall be permanentally banned from the server.`);

      msg.channel
        .send(strikeEmbed)
        .then(() => {
          logsChannel.send(strikeEmbed);
        })
        .catch(console.error);

      toStrike
        .ban({
          reason: `Banned for getting issued a 4th strike for the following reason: ${reason}`,
        })
        .then(() => {
          userBanLog(
            null,
            msg,
            logsChannel,
            toStrike,
            `Banned for getting issued a 4th strike for the following reason: ${reason}`
          );
        })
        .catch(console.error);

      await UserSchema.findOneAndUpdate(
        { id: toStrike.user.id },
        { strikes: 0 },
        { useFindAndModify: false }
      );
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  muteCommand: muteCommand,
  kickCommand: kickCommand,
  banCommand: banCommand,
  strikeCommand: strikeCommand,
};
