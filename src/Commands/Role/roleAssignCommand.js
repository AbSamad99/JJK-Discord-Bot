/*functions to handle the various user commands*/

var {sentenceCase} = require('change-case')

const changedRoleLog = require('../../Loggers/User/changedRoleLog.js');
const { lockedRolesArray } = require('../../checkArrays.js');

//assigns character role to a member
const roleAssignCommand = async (msg) => {
  //checking if the command was made in channels apart from the permitted channels
  if (
    !(msg.channel.id === '447513472427622410') /*bot commands channel*/ &&
    !(msg.channel.id === '720958791432011789') /*Syed bot channel*/ &&
    !(msg.channel.id === '460890234788249600') /*mod bot channel*/
  )
    return;

  let temp,
    role,
    desiredRoles = [],
    toAdd = [],
    toRemove = [];

  //getting info from the message
  temp = msg.content.split(' ');
  temp = temp.slice(1);

  //checking if character name was given or not
  if (temp.length < 1) {
    msg.channel
      .send('Please specify at least one character name')
      .catch(console.log);
    return;
  }

  for (let i = 0; i < temp.length; i++) {
    role = msg.guild.roles.cache.find(
      (role) => role.name.toLowerCase() === sentenceCase(temp[i]).toLowerCase()
    );
    if (role && !desiredRoles.includes(role)) desiredRoles.push(role);
  }

  //checking if a valid name was provided or not
  if (!desiredRoles.length) {
    msg.channel.send('Please specify valid character names').catch(console.log);
    return;
  }

  for (i = 0; i < desiredRoles.length; i++) {
    if (!lockedRolesArray.includes(desiredRoles[i].name)) {
      msg.channel
        .send(`${desiredRoles[i].name} role cannot be self assigned`)
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
    await msg.member.roles.add(toAdd);
    await changedRoleLog(null, null, null, msg, toAdd, 'add');
  }
  if (toRemove.length) {
    await msg.member.roles.remove(toRemove);
    await changedRoleLog(null, null, null, msg, toRemove, 'remove');
  }
};

module.exports = roleAssignCommand;
