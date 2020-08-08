/*Logs Whenever a users nickname, username, avatar, discriminator, etc is changed*/

const UserSchema = require('../../Schemas/UserSchema.js');

//getting the required logging functions
const changedNicknameLog = require('../../Loggers/User/changedNicknameLog.js');
const changedRoleLog = require('../../Loggers/User/changedRoleLog.js');
const changedUsernameAndDiscriminatorLog = require('../../Loggers/User/changedUsernameAndDiscriminatorLog.js');
const changedAvatarLog = require('../../Loggers/User/changedAvatarLog.js');

const guildMemberUpdateCaseHandler = async (oldMem, newMem, myCache) => {
  let user, announcementChannel, chuuDo, temp, timeOutObj;

  announcementChannel = newMem.guild.channels.cache.get('447513385211396096');

  user = await UserSchema.findOne({ id: newMem.user.id }).catch(console.log);

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
  const userLogs = await newMem.guild
    .fetchAuditLogs({
      type: 'MEMBER_UPDATE',
    })
    .then((audit) => audit.entries.first())
    .catch(console.log);

  //fetching audit logs - member role update
  const roleLogs = await newMem.guild
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
      changedNicknameLog(newMem, nick, userLogs.executor).catch(console.log);
    } else {
      //User made changes
      changedNicknameLog(newMem, nick).catch(console.log);
    }
  }

  //checking if username was changed
  if (user.name !== newMem.user.username) {
    changedUsernameAndDiscriminatorLog(newMem, user, 'username').catch(
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

  temp = myCache.get('previousMemberRoleUpdateLogId');

  //checking to see if role was updated
  if (roleLogs.id !== temp) {
    myCache.del('previousMemberRoleUpdateLogId');
    myCache.set('previousMemberRoleUpdateLogId', roleLogs.id);
    if (roleLogs.executor.username === 'The Honored One') {
      return;
    }
    if (role.new[0].name.toLowerCase() === 'muted' && role.key === '$remove') {
      timeOutObj = myCache.get(roleLogs.target.id);
      if (timeOutObj) {
        clearTimeout(timeOutObj);
        myCache.del(roleLogs.target.id);
        console.log('Timeout Cleared');
      }
    }
    await changedRoleLog(newMem, roleLogs).catch(console.log);
  }

  //checking if user boosted the server
  if (!oldMem.premiumSince && newMem.premiumSince) {
    chuuDo = newMem.guild.emojis.cache.get('578526612421738526');
    announcementChannel.send(
      `Thank you for boosting the server ${newMem} ${chuuDo}`
    );
  }
};

module.exports = guildMemberUpdateCaseHandler;
