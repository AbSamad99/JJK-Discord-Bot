/*Function to handle the user ban command*/

const userBanLog = require('../../Loggers/Moderation/userBanLog.js');

//command to ban users
const banCommand = (msg) => {
  try {
    if (
      !(
        msg.member.roles.cache.has('447512454810042369') /*Special Grade role*/
      ) &&
      !(msg.member.roles.cache.has('447512449248395267') /*admin role*/)
    )
      return;

    let toBan, temp, reason, logsChannel;

    //getting needed info
    temp = msg.content.slice(1);
    temp = temp.split(' ');

    //getting the user to ban
    toBan = msg.mentions.members.array()[0];

    //getting logs channel
    logsChannel = msg.guild.channels.cache.get('447513266395283476');

    //checking to see if user was provided or not
    if (!toBan) {
      toBan = msg.guild.members.cache.get(temp[1]);
    }

    //2nd check
    if (!toBan) {
      msg.channel
        .send('Please mention a user to ban or provide their id')
        .catch(console.log);
      return;
    }

    toBan = msg.guild.member(toBan);

    //checking to see if user has mod perms
    if (
      toBan.roles.cache.has('447512454810042369') /*Special Grade role*/ ||
      toBan.roles.cache.has('447512449248395267') /*admin role*/ ||
      toBan.roles.cache.has('665268720163225610') /*vengeful spirit role*/
    ) {
      msg.channel.send('You cannot ban this user').catch(console.log);
      return;
    }

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
