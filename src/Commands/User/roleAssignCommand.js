/*functions to handle the various user commands*/

const Discord = require('discord.js');
const ms = require('ms');

const { assignRole, removeRole } = require('../../Functions/roleFunctions.js');
const { lockedRolesCheck } = require('../../Checks/miscChecks.js');
const { channelCheck, roleCheck } = require('../../Checks/helperChecks.js');

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
      msg.channel.send('Please specify a character name');
      return;
    }

    //finding the desired role
    desiredRole = msg.guild.roles.cache.find(
      (role) => role.name.toLowerCase() === temp[1].toLowerCase()
    );

    //checking if a valid name was provided or not
    if (!desiredRole) {
      msg.channel.send('Please specify a valid character name');
      return;
    }

    //checking if desired role was a locked role
    if (lockedRolesCheck(desiredRole)) {
      msg.channel.send('Cannot Assign that role');
      return;
    }

    //assign role to user if they dont have it and vice versa
    if (!roleCheck(msg.member, desiredRole.name)) {
      assignRole(msg, desiredRole);
    } else {
      removeRole(msg, desiredRole);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = roleAssignCommand;
