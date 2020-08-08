/*Function to handle the user strike command*/

const { MessageEmbed } = require('discord.js');
const ms = require('ms');

const UserSchema = require('../../Schemas/UserSchema.js');

const userMuteLog = require('../../Loggers/Moderation/userMuteLog.js');
const userKickLog = require('../../Loggers/Moderation/userKickLog.js');
const userBanLog = require('../../Loggers/Moderation/userBanLog.js');
const gifOrPngCheck = require('../../Checks/Other/gifOrPngCheck.js');

//command to issue strikes
const strikeCommand = async (msg) => {
  let toStrike, user, temp, muteRole, reason, logsChannel, strikesCount;

  //getting user to issue strikes to
  toStrike = msg.mentions.members.array()[0];

  //getting logs channel
  logsChannel = msg.guild.channels.cache.get('447513266395283476');

  //checking if user given is valid
  if (!toStrike) {
    msg.channel.send('Please mention a user to issue strike to');
    return;
  }

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
    toStrike.roles.cache.has('447512449248395267') /*admin role*/
  ) {
    msg.channel.send('You cannot issue strikes to this user');
    return;
  }

  //getting required info
  temp = msg.content.slice(1);
  temp = temp.split(' ');
  toStrike = msg.guild.member(toStrike);

  //checking to see if reason was provided
  if (temp.length > 2) {
    reason = temp.slice(2);
    reason = reason.join(' ');
  } else {
    msg.channel.send('Please provide a reason for strike');
    return;
  }

  //increasing the strikes by one
  strikesCount = user.strikes;
  strikesCount++;

  await UserSchema.findOneAndUpdate(
    { id: toStrike.user.id },
    { strikes: strikesCount },
    { useFindAndModify: false }
  );

  user = await UserSchema.findOne({ id: toStrike.user.id });

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
This is their second strike, therefore they shall be muted for 24 hours. The next strike will result in them being kicked from the server`);

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
              `Muted for getting issued a 2nd strike for the following reason: ${reason}`,
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
This is their third strike, therefore they shall be kicked from the server. The next strike will result in them being permanentally banned from the server`);

    //sending the embed, kicking the user and logging
    msg.channel
      .send(strikeEmbed)
      .then(() => logsChannel.send(strikeEmbed))
      .then(() => {
        toStrike
          .kick(
            `Kicked for getting issued a 3rd strike for the following reason: ${reason}`
          )
          .then(() => {
            userKickLog(
              null,
              null,
              msg,
              logsChannel,
              toStrike,
              `Kicked for getting issued a 3rd strike for the following reason: ${reason}`
            );
          });
      })
      .catch(console.error);
  }

  //4 strikes
  else if (user.strikes === 4) {
    strikeEmbed.setDescription(`${toStrike.user} has been issued a strike for the following reason: ${reason}. 
This is their fourth strike, therefore they shall be permanentally banned from the server.`);

    //sending embed, banning the user and logging
    msg.channel
      .send(strikeEmbed)
      .then(() => {
        logsChannel.send(strikeEmbed);
      })
      .then(() => {
        toStrike
          .ban({
            reason: `Banned for getting issued a 4th strike for the following reason: ${reason}`,
          })
          .then(() => {
            userBanLog(
              null,
              null,
              msg,
              logsChannel,
              toStrike,
              `Banned for getting issued a 4th strike for the following reason: ${reason}`
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
