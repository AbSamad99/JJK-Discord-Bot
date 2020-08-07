/*functions to handle the various user commands*/

const changedRoleLog = require('../../Loggers/User/changedRoleLog.js');

const { lockedRolesCheck } = require('../../Checks/Other/miscChecks.js');
const {
  channelCheck,
  roleCheck,
} = require('../../Checks/Other/helperChecks.js');

//assigns character role to a member
const roleAssignCommand = (msg) => {
  try {
    let temp, desiredRole;

    //checking is the command was made in channels apart from the permitted channels
    if (
      !channelCheck(msg, 'bot-commands') &&
      !channelCheck(msg, 'syed-bot-practice')
    )
      return;

    //getting info from the message
    temp = msg.content.slice(1);
    temp = temp.split(' ');

    //checking if character name was given or not
    if (!temp[1]) {
      msg.channel.send('Please specify a character name').catch(console.log);
      return;
    }

    //finding the desired role
    desiredRole = msg.guild.roles.cache.find(
      (role) => role.name.toLowerCase() === temp[1].toLowerCase()
    );

    //checking if a valid name was provided or not
    if (!desiredRole) {
      msg.channel
        .send('Please specify a valid character name')
        .catch(console.log);
      return;
    }

    //checking if desired role was a locked role
    if (lockedRolesCheck(desiredRole.name)) {
      msg.channel.send('Cannot Assign that role').catch(console.log);
      return;
    }

    //assign role to user if they dont have it and vice versa
    if (!roleCheck(msg.member, desiredRole.name)) {
      msg.member.roles.add(desiredRole.id).then(() => {
        changedRoleLog(null, null, msg, desiredRole, 'add').catch(console.log);
      });
    } else {
      msg.member.roles.remove(desiredRole.id).then(() => {
        changedRoleLog(null, null, msg, desiredRole, 'remove').catch(
          console.log
        );
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = roleAssignCommand;
