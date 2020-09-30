/*Function to handle the user unban command*/

const userBanRemoveLog = require('../../Loggers/Moderation/userBanRemoveLog');

//command to unban users
const unBanCommand = (msg) => {
  try {
    if (
      !(
        (
          msg.member.roles.cache.has(
            '447512454810042369'
          ) /*Special Grade role*/ ||
          msg.member.roles.cache.has('447512449248395267') /*admin role*/ ||
          msg.member.roles.cache.has('665268720163225610')
        ) /*vengeful spirit role*/
      )
    )
      return;

    let temp, toUnBan, logsChannel;

    //getting needed info
    temp = msg.content.slice(1);
    temp = temp.split(' ');

    toUnBan = temp[1];

    //check
    if (!toUnBan) {
      msg.channel.send('Please provide id of user to unban').catch(console.log);
      return;
    }

    logsChannel = msg.guild.channels.cache.get('757852261329272853');

    msg.guild.members
      .unban(toUnBan)
      .then((user) => userBanRemoveLog(null, logsChannel, msg, user));
  } catch (err) {
    console.log(err);
  }
};

module.exports = unBanCommand;
