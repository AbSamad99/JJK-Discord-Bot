const UserSchema = require('../Schemas/UserSchema.js');

const {
  previousMemberUpdateLogId,
  previousMemberRoleUpdateLogId,
} = require('../utilities');

const changedNicknameLog = require('../Functions/Loggers/User_update_logs/changedNicknameLog.js');
const changedRoleLog = require('../Functions/Loggers/User_update_logs/changedRoleLog.js');
const changedUsernameAndDiscriminatorLog = require('../Functions/Loggers/User_update_logs/changedUsernameAndDiscriminatorLog.js');
const changedAvatarLog = require('../Functions/Loggers/User_update_logs/changedAvatarLog.js');

const guildMemberUpdateCaseHandler = async (oldMem, newMem) => {
  try {
    let user;

    user = await UserSchema.findOne({ id: newMem.user.id });

    //adding member to the cache if they werent already present
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

    //fetching required logs
    const userLogs = await newMem.guild
      .fetchAuditLogs({
        type: 'MEMBER_UPDATE',
      })
      .then((audit) => audit.entries.first());
    const roleLogs = await newMem.guild
      .fetchAuditLogs({
        type: 'MEMBER_ROLE_UPDATE',
      })
      .then((audit) => audit.entries.first());

    //getting required changes from the logs
    let nick = userLogs.changes[0];
    let role = roleLogs.changes[0];

    //checking to see if nickname was updated
    if (previousMemberUpdateLogId[0] !== userLogs.id) {
      if (userLogs.target.tag !== userLogs.executor.tag) {
        //Mod made the changes
        await changedNicknameLog(newMem, nick, userLogs.executor);
      } else {
        //User made changes
        await changedNicknameLog(newMem, nick);
      }
      previousMemberUpdateLogId[0] = userLogs.id;
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
    //checking to see if role was updated
    if (previousMemberRoleUpdateLogId[0] !== roleLogs.id) {
      //if user was muted through the command
      if (
        role.new[0].name.toLowerCase() === 'muted' &&
        roleLogs.executor.username === 'The Honored One'
      ) {
        return;
      }
      //manual mute case
      await changedRoleLog(newMem, roleLogs);
      previousMemberRoleUpdateLogId[0] = roleLogs.id;
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = guildMemberUpdateCaseHandler;
