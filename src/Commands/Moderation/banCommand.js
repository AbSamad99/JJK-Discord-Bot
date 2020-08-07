/*Function to handle the user ban command*/

const userBanLog = require('../../Loggers/Moderation/userBanLog.js');
const { roleCheck } = require('../../Checks/Other/helperChecks.js');

//command to ban users
const banCommand = (msg) => {
  try {
    let toBan, temp, reason, logsChannel;

    //getting the user to ban
    toBan = msg.mentions.members.array()[0];

    //getting logs channel
    logsChannel = msg.guild.channels.cache.get('447513266395283476');

    //checking to see if user was provided or not
    if (!toBan) {
      msg.channel.send('Please mention a user to ban').catch(console.log);
      return;
    }

    //checking to see if user has mod perms
    if (roleCheck(toBan, 'Special-Grade Shaman') || roleCheck(toBan, 'admin')) {
      msg.channel.send('You cannot ban this user').catch(console.log);
      return;
    }

    //getting needed info
    temp = msg.content.slice(1);
    temp = temp.split(' ');
    toBan = msg.guild.member(toBan);

    //checking to see if reason was provided
    if (temp.length > 2) {
      reason = temp.slice(2);
      reason = reason.join(' ');
    } else {
      msg.channel.send('Please provide a reason for ban').catch(console.log);
      return;
    }

    //banning the user and logging
    toBan
      .ban({ reason: reason })
      .then(() => userBanLog(null, null, msg, logsChannel, toBan, reason))
      .catch(console.error);
  } catch (err) {
    console.log(err);
  }
};

module.exports = banCommand;
