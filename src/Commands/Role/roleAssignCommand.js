/*functions to handle the various user commands*/

const changedRoleLog = require('../../Loggers/User/changedRoleLog.js');
const { lockedRolesArray } = require('../../checkArrays.js');

//assigns character role to a member
const roleAssignCommand = (msg) => {
  try {
    let temp,
      role,
      desiredRoles = [],
      toAdd = [],
      toRemove = [];

    //checking is the command was made in channels apart from the permitted channels
    if (
      !(msg.channel.id === '447513472427622410') /*bot commands channel*/ &&
      !(msg.channel.id === '720958791432011789') /*Syed bot channel*/
    )
      return;

    //getting info from the message
    temp = msg.content.slice(1);
    temp = temp.split(' ');

    //checking if character name was given or not
    if (temp.length < 2) {
      msg.channel
        .send('Please specify at least one character name')
        .catch(console.log);
      return;
    }

    for (let i = 1; i < temp.length; i++) {
      role = msg.guild.roles.cache.find(
        (role) => role.name.toLowerCase() === temp[i].toLowerCase()
      );
      if (role) desiredRoles.push(role);
    }

    //checking if a valid name was provided or not
    if (!desiredRoles.length) {
      msg.channel
        .send('Please specify valid character names')
        .catch(console.log);
      return;
    }

    for (i = 0; i < desiredRoles.length; i++) {
      if (lockedRolesArray.includes(desiredRoles[i].name)) {
        msg.channel
          .send(`Cannot Assign ${desiredRoles[i].name} role`)
          .catch(console.log);
        desiredRoles.splice(i, 1);
      }
    }

    for (i = 0; i < desiredRoles.length; i++) {
      if (!msg.member.roles.cache.has(desiredRoles[i].id)) {
        toAdd.push(desiredRoles[i]);
      } else {
        toRemove.push(desiredRoles[i]);
      }
    }

    //assign role to user if they dont have it and vice versa
    if (toAdd.length) {
      msg.member.roles.add(toAdd).then(() => {
        changedRoleLog(null, null, null, null, msg, toAdd, 'add').catch(
          console.log
        );
      });
    }
    if (toRemove.length) {
      msg.member.roles.remove(toRemove).then(() => {
        changedRoleLog(null, null, null, null, msg, toRemove, 'remove').catch(
          console.log
        );
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = roleAssignCommand;
