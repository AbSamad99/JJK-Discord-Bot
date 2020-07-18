import {
  previousMemberUpdateLogId,
  previousMemberRoleUpdateLogId,
} from '../utilities';

import { changedNicknameLog } from '../Functions/Loggers/changedNicknameLog.js';
import { changedRoleLog } from '../Functions/Loggers/changedRoleLog.js';
import { changedUsernameAndDiscriminatorLog } from '../Functions/Loggers/changedUsernameAndDiscriminatorLog.js';
import { changedAvatarLog } from '../Functions/Loggers/changedAvatarLog.js';

import { userArray } from '../utilities.js';

export const guildMemberUpdateCaseHandler = async (oldMem, newMem) => {
  try {
    console.log(userArray.length, newMem.guild.memberCount);
    const user = userArray.find((user) => user.id === newMem.user.id);
    if (!user) {
      userArray.push({
        name: newMem.user.username,
        id: newMem.user.id,
        avatarUrl: newMem.user.displayAvatarURL(),
        avatar: newMem.user.avatar,
        discriminator: newMem.user.discriminator,
      });
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
      user.name = newMem.user.username;
    }
    //checking if discriminator was updated
    else if (user.discriminator !== newMem.user.discriminator) {
      await changedUsernameAndDiscriminatorLog(newMem, user, 'discriminator');
      user.discriminator = newMem.user.discriminator;
    }
    //checking if avatar was updated
    else if (user.avatarUrl !== newMem.user.displayAvatarURL()) {
      console.log(user.avatar);
      console.log(newMem.user.avatar);
      if (user.avatarUrl !== null) {
        await changedAvatarLog(newMem, user);
      }
      user.avatarUrl = newMem.user.displayAvatarURL();
      user.avatar = newMem.user.avatar;
    }
    //rest of the cases
    else {
      console.log('something else happened');
    }
  } catch (err) {
    console.log(err);
  }
};
