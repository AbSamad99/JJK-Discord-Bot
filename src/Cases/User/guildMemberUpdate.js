/*Logs Whenever a users nickname, username, avatar, discriminator, etc is changed*/

import { myCache } from '../../app';

const UserSchema = require('../../Schemas/UserSchema.js');

//getting the required logging functions
const changedNicknameLog = require('../../Loggers/User/changedNicknameLog.js');
const changedRoleLog = require('../../Loggers/User/changedRoleLog.js');
const changedUsernameAndDiscriminatorLog = require('../../Loggers/User/changedUsernameAndDiscriminatorLog.js');
const changedAvatarLog = require('../../Loggers/User/changedAvatarLog.js');

const guildMemberUpdateCaseHandler = async (oldMem, newMem) => {
  let user, temp, timeOutObj;

  user = await UserSchema.findOne({ id: newMem.user.id }).catch(console.log);

  if(newMem.id === '390450196711997440') return;

  //adding member to the database if they werent already present
  if (!user) {
    await UserSchema.create({
      name: newMem.user.username,
      id: newMem.user.id,
      avatarUrl: newMem.user.displayAvatarURL(),
      avatar: newMem.user.avatar,
      discriminator: newMem.user.discriminator,
      strikes: 0,
    }).catch(console.log);
    return;
  }

  //fetching audit logs - member update
  let userLogs = await newMem.guild
    .fetchAuditLogs({
      type: 'MEMBER_UPDATE',
    })
    .then((audit) => audit.entries.first())
    .catch(console.log);
    
    //fetching audit logs - member role update
    let roleLogs = await newMem.guild
      .fetchAuditLogs({
        type: 'MEMBER_ROLE_UPDATE',
      })
      .then((audit) => audit.entries.first())
      .catch(console.log);

  //getting required changes from the logs
  let nick = userLogs.changes[0];
    let role = roleLogs.changes[0];

  temp = myCache.get('previousMemberUpdateLogId');

  //checking to see if nickname was updated
  if (userLogs.id !== temp) {
    myCache.del('previousMemberUpdateLogId');
    myCache.set('previousMemberUpdateLogId', userLogs.id);
    if (userLogs.target.tag !== userLogs.executor.tag) {
      //Mod made the changes
      await changedNicknameLog(newMem, nick, userLogs.executor).catch(
        console.log
      );
    } else {
      //User made changes
      await changedNicknameLog(newMem, nick).catch(console.log);
    }
  }

  //checking if username was changed
  if (user.name !== newMem.user.username) {
    await changedUsernameAndDiscriminatorLog(newMem, user, 'username').catch(
      console.log
    );
    await UserSchema.findOneAndUpdate(
      { id: newMem.user.id },
      { name: newMem.user.username },
      {
        useFindAndModify: false,
      }
    ).catch(console.log);
  }

  //checking if discriminator was updated
  if (user.discriminator !== newMem.user.discriminator) {
    await changedUsernameAndDiscriminatorLog(
      newMem,
      user,
      'discriminator'
    ).catch(console.log);
    await UserSchema.findOneAndUpdate(
      { id: newMem.user.id },
      { discriminator: newMem.user.discriminator },
      { useFindAndModify: false }
    ).catch(console.log);
  }

  //checking if avatar was updated
  if (user.avatarUrl !== newMem.user.displayAvatarURL()) {
    if (user.avatarUrl !== null) {
      await changedAvatarLog(newMem, user).catch(console.log);
    }
    await UserSchema.findOneAndUpdate(
      { id: newMem.user.id },
      {
        avatarUrl: newMem.user.displayAvatarURL(),
        avatar: newMem.user.avatar,
      },
      { useFindAndModify: false }
    ).catch(console.log);
  }

  temp=myCache.get('previousMemberRoleUpdateLogId')

  //checking to see if role was updated
  if (roleLogs.id!==temp) {
    myCache.del('previousMemberRoleUpdateLogId');
    myCache.set('previousMemberRoleUpdateLogId', roleLogs.id);

    if (roleLogs.executor.id === '730109162616389644') return;

    if (role.new[0].name.toLowerCase() === 'muted' && role.key === '$remove') {
      timeOutObj = myCache.get(roleLogs.target.id);
      if (timeOutObj) {
        clearTimeout(timeOutObj);
        myCache.del(roleLogs.target.id);
        console.log('Timeout Cleared');
      }
    }
    await changedRoleLog(newMem, roleLogs, 0).catch(console.log);

    if (roleLogs.changes[1])
      if (roleLogs.changes[1].new.length)
        await changedRoleLog(newMem, roleLogs, 1).catch(console.log);
  }

  //checking if user boosted the server
  // if (
  //   (!oldMem.premiumSinceTimestamp && newMem.premiumSinceTimestamp) ||
  //   (oldMem.premiumSinceTimestamp != newMem.premiumSinceTimestamp &&
  //     newMem.premiumSinceTimestamp)
  // ) {
  //   let announcementChannel, chuuDo;
  //   chuuDo = newMem.guild.emojis.cache.get('578526612421738526');
  //   announcementChannel = newMem.guild.channels.cache.get('720958791432011789');
  //   announcementChannel.send(
  //     `Thank you for boosting the server ${newMem} ${chuuDo}`
  //   );
  //   announcementChannel.send(`${newMem}
  //   old: ${oldMem.premiumSinceTimestamp}
  //   new: ${newMem.premiumSinceTimestamp}`);
  // }
};

module.exports = guildMemberUpdateCaseHandler;
