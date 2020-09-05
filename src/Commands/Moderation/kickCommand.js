/*Function to handle the user kick command*/

const userKickLog = require('../../Loggers/Moderation/userKickLog.js');

//command to kick users
const kickCommand = (msg) => {
  try {
    if (
      !(
        msg.member.roles.cache.has('447512454810042369') /*Special Grade role*/
      ) &&
      !(msg.member.roles.cache.has('447512449248395267') /*admin role*/)
    )
      return;

    let toKick, temp, reason, logsChannel;

    //getting needed info
    temp = msg.content.slice(1);
    temp = temp.split(' ');

    //getting the user to kick
    toKick = msg.mentions.members.array()[0];

    //getting the logs channel
    logsChannel = msg.guild.channels.cache.get('447513266395283476');

    //checking if user was provided or not
    if (!toKick) {
      toKick = msg.guild.members.cache.get(temp[1]);
    }

    //2nd check
    if (!toKick) {
      msg.channel
        .send('Please mention a user to kick or provide their id')
        .catch(console.log);
      return;
    }

    toKick = msg.guild.member(toKick);

    //checking if user has mod perms or not
    if (
      toKick.roles.cache.has('447512454810042369') /*Special Grade role*/ ||
      toKick.roles.cache.has('447512449248395267') /*admin role*/ ||
      toKick.roles.cache.has('665268720163225610') /*vengeful spirit role*/
    ) {
      msg.channel.send('You cannot kick this user').catch(console.log);
      return;
    }

    //checking to see if reason was provided
    if (temp.length > 2) {
      reason = temp.slice(2);
      reason = reason.join(' ');
    } else {
      msg.channel.send('Please provide a reason for kick').catch(console.log);
      return;
    }

    //kicking the user and logging
    toKick
      .kick(reason)
      .then(() => userKickLog(null, null, msg, logsChannel, toKick, reason))
      .catch(console.error);
  } catch (err) {
    console.log(err);
  }
};

module.exports = kickCommand;
