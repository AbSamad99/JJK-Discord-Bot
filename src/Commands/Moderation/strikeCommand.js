/*Function to handle the user strike command*/

const { MessageEmbed } = require('discord.js');
const ms = require('ms');

const UserSchema = require('../../Schemas/UserSchema.js');

const userMuteLog = require('../../Loggers/Moderation/userMuteLog.js');
const userKickLog = require('../../Loggers/Moderation/userKickLog.js');
const userBanLog = require('../../Loggers/Moderation/userBanLog.js');
const gifOrPngCheck = require('../../Helpers/gifOrPngCheck.js');
const userBanRemoveLog = require('../../Loggers/Moderation/userBanRemoveLog.js');

//command to issue strikes
const strikeCommand = async (msg) => {
  if (
    !(
      (
        msg.member.roles.cache.has(
          '447512454810042369'
        ) /*Special Grade role*/ ||
        msg.member.roles.cache.has('447512449248395267') /*admin role*/ ||
        msg.member.roles.cache.has('665268720163225610')
      ) /*vengeful spirit role*/
    )
  )
    return;

  let toStrike, user, temp, muteRole, reason, logsChannel;

  //getting needed info
  temp = msg.content.slice(1);
  temp = temp.split(' ');

  //getting user to issue strikes to
  toStrike = msg.mentions.members.array()[0];

  //getting logs channel
  logsChannel = msg.guild.channels.cache.get('757852261329272853');

  //checking if user given is valid
  if (!toStrike) {
    toStrike = msg.guild.members.cache.get(temp[1]);
  }

  //2nd check
  if (!toStrike) {
    msg.channel
      .send('Please mention a user to issue a strike to or provide their id')
      .catch(console.log);
    return;
  }

  toStrike = msg.guild.member(toStrike);

  //getting user from the database
  user = await UserSchema.findOne({ id: toStrike.user.id });

  //adding user to the database if they dont exist
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

  //checking to see if user has mod perms
  if (
    toStrike.roles.cache.has('447512454810042369') /*Special Grade role*/ ||
    toStrike.roles.cache.has('447512449248395267') /*admin role*/ ||
    toStrike.roles.cache.has('665268720163225610') /*vengeful spirit role*/
  ) {
    msg.channel.send('You cannot issue strikes to this user');
    return;
  }

  //checking to see if reason was provided
  if (temp.length > 2) {
    reason = temp.slice(2);
    reason = reason.join(' ');
  } else {
    msg.channel.send('Please provide a reason for the strike');
    return;
  }

  user = await UserSchema.findOneAndUpdate(
    { id: toStrike.user.id },
    {
      $inc: {
        strikes: 1,
      },
    },
    { useFindAndModify: false, new: true }
  );

  //making the embed
  let strikeEmbed = new MessageEmbed()
    .setAuthor(msg.author.tag, await gifOrPngCheck(msg.author))
    .setTitle('Strike issued')
    .setColor(10038562)
    .setThumbnail(await gifOrPngCheck(toStrike.user))
    .setFooter(new Date());

  //1 strike
  if (user.strikes === 1) {
    strikeEmbed.setDescription(`${toStrike.user} has been issued a strike for the following reason: ${reason}. 
This is their first strike, therefore they are only being warned. The next strike will result in them being muted for 24 hours`);

    //sending the embed
    msg.channel
      .send(strikeEmbed)
      .then(() => logsChannel.send(strikeEmbed))
      .catch(console.error);
  }

  //2 strikes
  else if (user.strikes === 2) {
    muteRole = msg.guild.roles.cache.get('647424506507296788');

    strikeEmbed.setDescription(`${toStrike.user} has been issued a strike for the following reason: ${reason}. 
This is their second strike, therefore they shall be muted for 24 hours. The next strike will result in them being temporarily banned from the server`);

    //sending the embed to channel, muting and logging
    msg.channel
      .send(strikeEmbed)
      .then(() => logsChannel.send(strikeEmbed))
      .then(() => {
        //assigning mute role
        toStrike.roles
          .add(muteRole.id)
          .then(() => {
            userMuteLog(
              msg,
              toStrike,
              muteRole,
              `Muted due to getting issued a 2nd strike for the following reason: ${reason}`,
              '24h',
              'add'
            );
          })
          .catch(console.log);

        //unmuting
        setTimeout(() => {
          if (!toStrike.roles.cache.has(muteRole.id)) {
            return;
          }
          toStrike.roles
            .remove(muteRole.id)
            .then(() => {
              userMuteLog(msg, toStrike, muteRole, null, null, 'remove');
            })
            .catch(console.error);
        }, ms('24h'));
      })
      .catch(console.error);
  }

  //3 strikes
  else if (user.strikes === 3) {
    strikeEmbed.setDescription(`${toStrike.user} has been issued a strike for the following reason: ${reason}. 
This is their third strike, therefore they shall be temporarily banned from the server for a week. The next strike will result in them being permanentally banned from the server`);

    //sending the embed, kicking the user and logging
    msg.channel
      .send(strikeEmbed)
      .then(() => logsChannel.send(strikeEmbed))
      .then(() => {
        toStrike
          .ban({
            reason: `Temporarily banned due to getting issued a 3rd strike for the following reason: ${reason}`,
          })
          .then(() => {
            userBanLog(
              null,
              null,
              logsChannel,
              msg,
              toStrike,
              `Temporarily banned due to getting issued a 3rd strike for the following reason: ${reason}`
            );
          });
      })
      .catch(console.error);

    //unbanning
    setTimeout(() => {
      msg.guild.members
        .unban(toStrike.id)
        .then((user) => userBanRemoveLog(null, logsChannel, msg, user))
        .catch(console.log);
    }, ms('7d'));
  }

  //4 strikes
  else if (user.strikes === 4) {
    strikeEmbed.setDescription(`${toStrike.user} has been issued a strike for the following reason: ${reason}. 
This is their fourth strike, therefore they shall be Permanently banned from the server.`);

    //sending embed, banning the user and logging
    msg.channel
      .send(strikeEmbed)
      .then(() => {
        logsChannel.send(strikeEmbed);
      })
      .then(() => {
        toStrike
          .ban({
            reason: `Permanently banned due to getting issued a 4th strike for the following reason: ${reason}`,
          })
          .then(() => {
            userBanLog(
              null,
              null,
              msg,
              logsChannel,
              toStrike,
              `Permanently banned due to getting issued a 4th strike for the following reason: ${reason}`
            );
          });
      })
      .catch(console.error);

    await UserSchema.findOneAndUpdate(
      { id: toStrike.user.id },
      { strikes: 0 },
      { useFindAndModify: false }
    );
  }
};

module.exports = strikeCommand;
