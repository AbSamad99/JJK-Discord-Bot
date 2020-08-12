/*Function to handle the user mute command*/

import { myCache } from '../../app';
const ms = require('ms');

const userMuteLog = require('../../Loggers/Moderation/userMuteLog.js');

//command to mute users
const muteCommand = (msg) => {
  try {
    if (
      !(
        msg.member.roles.cache.has('447512454810042369') /*Special Grade role*/
      ) &&
      !(msg.member.roles.cache.has('447512449248395267') /*admin role*/)
    )
      return;

    let toMute, muteRole, temp, reason, time, timeOutObj;

    //getting needed info
    temp = msg.content.slice(1);
    temp = temp.split(' ');

    //getting the user to mute
    toMute = msg.mentions.members.array()[0];

    //checking if user was provided or not
    if (!toMute) {
      toMute = msg.guild.members.cache.get(temp[1]);
    }

    if (!toMute) {
      msg.channel
        .send('Please mention a user to mute or provide their id')
        .catch(console.log);
      return;
    }

    toMute = msg.guild.member(toMute);

    //checking if user has mod perms or not
    if (
      toMute.roles.cache.has('447512454810042369') /*Special Grade role*/ ||
      toMute.roles.cache.has('447512449248395267') /*admin role*/
    ) {
      msg.channel.send('You cannot mute this user').catch(console.log);
      return;
    }

    //getting the mute role
    muteRole = msg.guild.roles.cache.get('647424506507296788');

    //check to see if duration was provided
    if (!temp[2]) {
      msg.channel
        .send('Please mention duration of the mute')
        .catch(console.log);
      return;
    }

    //check if time provided follows proper format
    if (ms(temp[2]) === undefined) {
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
    if (temp.length > 3) {
      reason = temp.slice(3);
      reason = reason.join(' ');
    } else {
      msg.channel.send('Please provide a reason for mute').catch(console.log);
      return;
    }

    //getting the time
    time = temp[2];

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
      console.log('Timeout Cleared');
    }, ms(time));
    myCache.set(toMute.user.id, timeOutObj);
    console.log('Timeout Set');
  } catch (err) {
    console.log(err);
  }
};

module.exports = muteCommand;
