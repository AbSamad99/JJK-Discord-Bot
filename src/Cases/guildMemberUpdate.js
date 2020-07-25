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
    let index, user;

    //getting userarray
    const userArray = JSON.parse(
      fs.readFileSync(`${process.cwd()}/src/Json-Files/users.json`)
    );

    //finding the index and the user at the index
    index = userArray.findIndex((user) => user.id === newMem.user.id);
    user = userArray[index];

    //adding member to the cache if they werent already present
    if (!user) {
      userArray.push({
        name: newMem.user.username,
        id: newMem.user.id,
        avatarUrl: newMem.user.displayAvatarURL(),
        avatar: newMem.user.avatar,
        discriminator: newMem.user.discriminator,
        strikes: 0,
      });
      fs.writeFileSync(
        `${process.cwd()}/src/Json-Files/users.json`,
        JSON.stringify(userArray)
      );
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
      await changedRoleLog(newMem, roleLogs, role.new[0].id);
      previousMemberRoleUpdateLogId[0] = roleLogs.id;
    }
    //checking if username was changed
    if (user.name !== newMem.user.username) {
      await changedUsernameAndDiscriminatorLog(newMem, user, 'username');
      userArray[index].name = newMem.user.username;
      fs.writeFileSync(
        `${process.cwd()}/src/Json-Files/users.json`,
        JSON.stringify(userArray)
      );
    }
    //checking if discriminator was updated
    if (user.discriminator !== newMem.user.discriminator) {
      await changedUsernameAndDiscriminatorLog(newMem, user, 'discriminator');
      userArray[index].discriminator = newMem.user.discriminator;
      fs.writeFileSync(
        `${process.cwd()}/src/Json-Files/users.json`,
        JSON.stringify(userArray)
      );
    }
    //checking if avatar was updated
    if (user.avatarUrl !== newMem.user.displayAvatarURL()) {
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
  } catch (err) {
    console.log(err);
  }
};

module.exports = guildMemberUpdateCaseHandler;
