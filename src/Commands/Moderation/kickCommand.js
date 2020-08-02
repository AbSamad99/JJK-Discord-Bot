/*Function to handle the user kick command*/

const userKickLog = require('../../Loggers/Moderation/userKickLog.js');
const { roleCheck } = require('../../Checks/helperChecks.js');

//command to kick users
const kickCommand = (msg) => {
  try {
    let toKick, temp, reason, logsChannel;

    //getting the user to kick
    toKick = msg.mentions.members.array()[0];

    //getting the logs channel
    logsChannel = msg.guild.channels.cache.get('447513266395283476');

    //checking if user was provided or not
    if (!toKick) {
      msg.channel.send('Please mention a user to kick');
      return;
    }

    //checking if user has mod perms or not
    if (
      roleCheck(toKick, 'Special-Grade Shaman') ||
      roleCheck(toKick, 'admin')
    ) {
      msg.channel.send('You cannot kick this user');
      return;
    }

    //getting needed info
    temp = msg.content.slice(1);
    temp = temp.split(' ');
    toKick = msg.guild.member(toKick);

    //checking to see if reason was provided
    if (temp.length > 2) {
      reason = temp.slice(2);
      reason = reason.join(' ');
    } else {
      msg.channel.send('Please provide a reason for kick');
      return;
    }

    //kicking the user and logging
    toKick
      .kick(reason)
      .then(() => {
        userKickLog(null, null, msg, logsChannel, toKick, reason);
      })
      .catch(console.error);
  } catch (err) {
    console.log(err);
  }
};

module.exports = kickCommand;
