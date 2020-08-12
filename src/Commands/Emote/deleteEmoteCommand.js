/*Function to handle the archive emote command*/

const emoteDeleteLog = require('../../Loggers/Emotes/emoteDeleteLog');

const deleteEmoteCommand = (msg) => {
  try {
    if (
      !(
        msg.member.roles.cache.has('447512454810042369') /*Special Grade role*/
      ) &&
      !(msg.member.roles.cache.has('447512449248395267') /*admin role*/)
    )
      return;

    let temp, toDelete;
    temp = msg.content.slice(1);
    temp = temp.split(' ');

    if (!temp[1]) {
      msg.channel.send(`Please provide an emote to delete`).catch(console.log);
      return;
    }

    temp = temp[1].split(':')[1];
    toDelete = msg.guild.emojis.cache.find((emote) => emote.name === temp);

    if (!toDelete) {
      msg.channel.send('No such emote exists in the server').catch(console.log);
      return;
    }

    //deleting
    toDelete
      .delete()
      .then(() => msg.channel.send(`${toDelete.name} deleted`))
      .then(() => emoteDeleteLog(null, toDelete, msg))
      .catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

module.exports = deleteEmoteCommand;
