/*Function to handle the user unmute command*/

import { myCache } from '../../app';

const userMuteLog = require('../../Loggers/Moderation/userMuteLog.js');

//command to mute users
const unMuteCommand = (msg) => {
  try {
    if (
      !(
        msg.member.roles.cache.has('447512454810042369') /*Special Grade role*/
      ) &&
      !(msg.member.roles.cache.has('447512449248395267') /*admin role*/)
    )
      return;

    let temp, toUnMute, muteRole, timeOutObj;

    //getting needed info
    temp = msg.content.slice(1);
    temp = temp.split(' ');

    //getting the user to mute
    toUnMute = msg.mentions.members.array()[0];

    //checking if user was provided or not
    if (!toUnMute) {
      toUnMute = msg.guild.members.cache.get(temp[1]);
    }

    //2nd check
    if (!toUnMute) {
      msg.channel
        .send('Please mention a user to unmute or provide their id')
        .catch(console.log);
      return;
    }

    //getting the mute role
    muteRole = msg.guild.roles.cache.get('647424506507296788');

    //getting the user
    toUnMute = msg.guild.member(toUnMute);

    //check to see if user was already muted
    if (!toUnMute.roles.cache.has(muteRole.id)) {
      msg.channel
        .send(`${toUnMute.user.username} is not muted`)
        .catch(console.log);
      return;
    }

    timeOutObj = myCache.get(toUnMute.user.id);

    //unmuting
    toUnMute.roles
      .remove(muteRole.id)
      .then(() => {
        if (timeOutObj) {
          clearTimeout(timeOutObj);
          myCache.del(toUnMute.user.id);
          console.log('Timeout Cleared');
        }
      })
      .then(() =>
        msg.channel.send(`${toUnMute.user.username} has been unmuted`)
      )
      .then(() => {
        userMuteLog(msg, toUnMute, muteRole, null, null, 'remove');
      })
      .catch(console.error);
  } catch (err) {
    console.log(err);
  }
};

module.exports = unMuteCommand;
