/*Function to handle the user mute command*/

const { assignMuteRole } = require('../../Functions/roleFunctions.js');
const { roleCheck } = require('../../Checks/helperChecks.js');

//command to mute users
const muteCommand = (msg) => {
  try {
    let toMute, muteRole, temp, reason, time, logsChannel;

    //getting the user to mute
    toMute = msg.mentions.members.array()[0];

    //getting the logs channel
    logsChannel = msg.guild.channels.cache.get('447513266395283476');

    //checking if user was provided or not
    if (!toMute) {
      msg.channel.send('Please mention a user to mute');
      return;
    }

    //checking if user has mod perms or not
    if (
      roleCheck(toMute, 'Special-Grade Shaman') ||
      roleCheck(toMute, 'admin')
    ) {
      msg.channel.send('You cannot mute this user');
      return;
    }

    //getting the mute role
    muteRole = msg.guild.roles.cache.get('647424506507296788');

    //getting needed info
    toMute = msg.guild.member(toMute);
    temp = msg.content.slice(1);
    temp = temp.split(' ');

    //check to see if duration was provided
    if (!temp[2] || !temp[3]) {
      msg.channel.send('Please mention duration of the mute');
      return;
    }

    //check if time provided follows proper format
    if (
      isNaN(temp[2]) ||
      (temp[3] !== 'm' && temp[3] !== 's' && temp[3] !== 'd' && temp[3] !== 'h')
    ) {
      msg.channel.send('Please specify valid time format');
      return;
    }

    //check to see if user was already muted
    if (toMute.roles.cache.has(muteRole.id)) {
      msg.channel.send('User is Already Muted');
      return;
    }

    //check to see if reason was given or not
    if (temp.length > 4) {
      reason = temp.slice(4);
      reason = reason.join(' ');
    } else {
      msg.channel.send('Please provide a reason for mute');
      return;
    }

    //getting the time
    time = temp[2].concat(temp[3]);

    //assigning the mute role
    assignMuteRole(msg, toMute, muteRole, time, logsChannel, reason);
  } catch (err) {
    console.log(err);
  }
};

module.exports = muteCommand;
