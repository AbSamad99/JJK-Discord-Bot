/*Logs Whenever a users nickname, username, avatar, discriminator, etc is changed*/

const UserSchema = require('../../Schemas/UserSchema.js');

//getting the required logging functions
const changedNicknameLog = require('../../Loggers/User/changedNicknameLog.js');
const changedRoleLog = require('../../Loggers/User/changedRoleLog.js');
const changedUsernameAndDiscriminatorLog = require('../../Loggers/User/changedUsernameAndDiscriminatorLog.js');
const changedAvatarLog = require('../../Loggers/User/changedAvatarLog.js');

const guildMemberUpdateCaseHandler = async (oldMem, newMem, myCache) => {
  try {
    let user, testChannel, temp;

    testChannel = newMem.guild.channels.cache.get('720958791432011789');

    user = await UserSchema.findOne({ id: newMem.user.id });

    //adding member to the database if they werent already present
    if (!user) {
      await UserSchema.create({
        name: newMem.user.username,
        id: newMem.user.id,
        avatarUrl: newMem.user.displayAvatarURL(),
        avatar: newMem.user.avatar,
        discriminator: newMem.user.discriminator,
        strikes: 0,
      });
      return;
    }

    //fetching audit logs - member update
    const userLogs = await newMem.guild
      .fetchAuditLogs({
        type: 'MEMBER_UPDATE',
      })
      .then((audit) => audit.entries.first());

    //fetching audit logs - member role update
    const roleLogs = await newMem.guild
      .fetchAuditLogs({
        type: 'MEMBER_ROLE_UPDATE',
      })
      .then((audit) => audit.entries.first());

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
        await changedNicknameLog(newMem, nick, userLogs.executor);
      } else {
        //User made changes
        await changedNicknameLog(newMem, nick);
      }
    }

    //checking if username was changed
    if (user.name !== newMem.user.username) {
      await changedUsernameAndDiscriminatorLog(newMem, user, 'username');
      await UserSchema.findOneAndUpdate(
        { id: newMem.user.id },
        { name: newMem.user.username },
        {
          useFindAndModify: false,
        }
      );
    }

    //checking if discriminator was updated
    if (user.discriminator !== newMem.user.discriminator) {
      await changedUsernameAndDiscriminatorLog(newMem, user, 'discriminator');
      await UserSchema.findOneAndUpdate(
        { id: newMem.user.id },
        { discriminator: newMem.user.discriminator },
        { useFindAndModify: false }
      );
    }

    //checking if avatar was updated
    if (user.avatarUrl !== newMem.user.displayAvatarURL()) {
      if (user.avatarUrl !== null) {
        await changedAvatarLog(newMem, user);
      }
      await UserSchema.findOneAndUpdate(
        { id: newMem.user.id },
        {
          avatarUrl: newMem.user.displayAvatarURL(),
          avatar: newMem.user.avatar,
        },
        { useFindAndModify: false }
      );
    }

    temp = myCache.get('previousMemberRoleUpdateLogId');

    //checking to see if role was updated
    if (roleLogs.id !== temp) {
      myCache.del('previousMemberRoleUpdateLogId');
      myCache.set('previousMemberRoleUpdateLogId', roleLogs.id);
      if (
        role.new[0].name.toLowerCase() === 'muted' &&
        roleLogs.executor.username === 'The Honored One'
      ) {
        return;
      }
      await changedRoleLog(newMem, roleLogs);
    }

    //checking if user boosted the server
    if (!oldMem.premiumSince && newMem.premiumSince) {
      testChannel.send(`${newMem} has boosted the server`);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = guildMemberUpdateCaseHandler;
