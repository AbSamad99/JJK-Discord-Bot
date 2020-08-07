/*Function to handle the user mute command*/

const ms = require('ms');

const { roleCheck } = require('../../Checks/Other/helperChecks.js');
const userMuteLog = require('../../Loggers/Moderation/userMuteLog.js');

//command to mute users
const muteCommand = (msg, myCache) => {
  try {
    let toMute, muteRole, temp, reason, time, timeOutObj;

    //getting the user to mute
    toMute = msg.mentions.members.array()[0];

    //checking if user was provided or not
    if (!toMute) {
      msg.channel.send('Please mention a user to mute').catch(console.log);
      return;
    }

    //checking if user has mod perms or not
    if (
      roleCheck(toMute, 'Special-Grade Shaman') ||
      roleCheck(toMute, 'admin')
    ) {
      msg.channel.send('You cannot mute this user').catch(console.log);
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
      msg.channel
        .send('Please mention duration of the mute')
        .catch(console.log);
      return;
    }

    //check if time provided follows proper format
    if (
      isNaN(temp[2]) ||
      (temp[3] !== 'm' && temp[3] !== 's' && temp[3] !== 'd' && temp[3] !== 'h')
    ) {
      msg.channel.send('Please specify valid time format').catch(console.log);
      return;
    }

    //check to see if user was already muted
    if (toMute.roles.cache.has(muteRole.id)) {
      msg.channel
        .send(`${toMute.user.username} is already muted`)
        .catch(console.log);
      return;
    }

    //check to see if reason was given or not
    if (temp.length > 4) {
      reason = temp.slice(4);
      reason = reason.join(' ');
    } else {
      msg.channel.send('Please provide a reason for mute').catch(console.log);
      return;
    }

    //getting the time
    time = temp[2].concat(temp[3]);

    //assigning mute role
    toMute.roles
      .add(muteRole.id)
      .then(() => {
        userMuteLog(msg, toMute, muteRole, reason, time, 'add');
      })
      .catch(console.log);

    //unmuting
    timeOutObj = setTimeout(() => {
      if (!toMute.roles.cache.has(muteRole.id)) {
        return;
      }
      toMute.roles
        .remove(muteRole.id)
        .then(() => {
          userMuteLog(msg, toMute, muteRole, null, null, 'remove');
        })
        .catch(console.error);
    }, ms(time));
    myCache.set(toMute.user.id, timeOutObj);
    console.log('Timeout Set');
  } catch (err) {
    console.log(err);
  }
};

module.exports = muteCommand;
