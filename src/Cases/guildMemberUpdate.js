const fs = require('fs');

const {
  previousMemberUpdateLogId,
  previousMemberRoleUpdateLogId,
} = require('../utilities');

const changedNicknameLog = require('../Functions/Loggers/changedNicknameLog.js');
const changedRoleLog = require('../Functions/Loggers/changedRoleLog.js');
const changedUsernameAndDiscriminatorLog = require('../Functions/Loggers/changedUsernameAndDiscriminatorLog.js');
const changedAvatarLog = require('../Functions/Loggers/changedAvatarLog.js');

const guildMemberUpdateCaseHandler = async (oldMem, newMem) => {
  try {
    let index;
    const userArray = JSON.parse(
      fs.readFileSync(`${process.cwd()}/src/Json-Files/users.json`)
    );
    console.log(userArray.length, newMem.guild.memberCount);
    // console.log(userArray[0]);
    const user = userArray.find((user, i) => user.id === newMem.user.id);

    const check = (element) => element.id === newMem.user.id;

    index = userArray.findIndex(check);

    console.log(index);

    if (!user) {
      userArray.push({
        name: newMem.user.username,
        id: newMem.user.id,
        avatarUrl: newMem.user.displayAvatarURL(),
        avatar: newMem.user.avatar,
        discriminator: newMem.user.discriminator,
      });
      fs.writeFileSync(
        `${process.cwd()}/src/Json-Files/users.json`,
        JSON.stringify(userArray)
      );
      return;
    }
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
    console.log(user.name, user.discriminator);
    console.log(newMem.user.username, newMem.user.discriminator);
    console.log(user.avatarUrl);
    console.log(newMem.user.displayAvatarURL());
    // console.log(userLogs.id, previousDeleteLogId);
    // console.log(roleLogs.id, previousMemberRoleUpdateLogId);
    let nick = userLogs.changes[0];
    let role = roleLogs.changes[0];
    // console.log(role.new);

    //checking to see if nickname was updated
    if (previousMemberUpdateLogId[0] !== userLogs.id) {
      if (userLogs.target.tag !== userLogs.executor.tag) {
        //Mod made the changes
        if (!nick.old && nick.new) {
          //new nickname
          await changedNicknameLog(
            newMem,
            nick.old,
            nick.new,
            'add',
            userLogs.executor
          );
        } else if (nick.old && !nick.new) {
          //removed nicknamed
          await changedNicknameLog(
            newMem,
            nick.old,
            nick.new,
            'remove',
            userLogs.executor
          );
        } else if (nick.old && nick.new && nick.old !== nick.new) {
          //nickname changed
          await changedNicknameLog(
            newMem,
            nick.old,
            nick.new,
            'edit',
            userLogs.executor
          );
        }
      } else {
        //User made changes
        if (!nick.old && nick.new) {
          //new nickname
          await changedNicknameLog(newMem, nick.old, nick.new, 'add');
        } else if (nick.old && !nick.new) {
          //removed nicknamed
          await changedNicknameLog(newMem, nick.old, nick.new, 'remove');
        } else if (nick.old && nick.new && nick.old !== nick.new) {
          //nickname changed
          await changedNicknameLog(newMem, nick.old, nick.new, 'edit');
        }
      }
      previousMemberUpdateLogId[0] = userLogs.id;
    }
    //checking to see if role was updated
    else if (previousMemberRoleUpdateLogId[0] !== roleLogs.id) {
      if (roleLogs.changes[0].key === '$add') {
        if (role.new[0].name.toLowerCase() !== 'muted') {
          await changedRoleLog(
            newMem,
            roleLogs.target,
            role.new[0].id,
            'add',
            roleLogs.executor
          );
        }
      } else if (roleLogs.changes[0].key === '$remove') {
        if (role.new[0].name.toLowerCase() !== 'muted') {
          await changedRoleLog(
            newMem,
            roleLogs.target,
            role.new[0].id,
            'remove',
            roleLogs.executor
          );
        }
      }
      previousMemberRoleUpdateLogId[0] = roleLogs.id;
    }
    //checking if username was changed
    else if (user.name !== newMem.user.username) {
      await changedUsernameAndDiscriminatorLog(newMem, user, 'username');
      userArray[index].name = newMem.user.username;
      fs.writeFileSync(
        `${process.cwd()}/src/Json-Files/users.json`,
        JSON.stringify(userArray)
      );
    }
    //checking if discriminator was updated
    else if (user.discriminator !== newMem.user.discriminator) {
      await changedUsernameAndDiscriminatorLog(newMem, user, 'discriminator');
      userArray[index].discriminator = newMem.user.discriminator;
      fs.writeFileSync(
        `${process.cwd()}/src/Json-Files/users.json`,
        JSON.stringify(userArray)
      );
    }
    //checking if avatar was updated
    else if (user.avatarUrl !== newMem.user.displayAvatarURL()) {
      console.log(user.avatar);
      console.log(newMem.user.avatar);
      if (user.avatarUrl !== null) {
        await changedAvatarLog(newMem, user);
      }
      userArray[index].avatarUrl = newMem.user.displayAvatarURL();
      userArray[index].avatar = newMem.user.avatar;
      fs.writeFileSync(
        `${process.cwd()}/src/Json-Files/users.json`,
        JSON.stringify(userArray)
      );
    }
    //rest of the cases
    else {
      console.log('something else happened');
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = guildMemberUpdateCaseHandler;
