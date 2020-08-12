/*Function to handle the archive emote command*/

const ms = require('ms');
const emoteDeleteLog = require('../../Loggers/Emotes/emoteDeleteLog');

const archiveEmoteCommand = (msg) => {
  try {
    if (
      !(
        msg.member.roles.cache.has('447512454810042369') /*Special Grade role*/
      ) &&
      !(msg.member.roles.cache.has('447512449248395267') /*admin role*/)
    )
      return;

    let temp, toArchive, archiveChannel;
    temp = msg.content.slice(1);
    temp = temp.split(' ');
    if (!temp[1]) {
      msg.channel.send(`Please provide an emote to archive`).catch(console.log);
      return;
    }
    temp = temp[1].split(':')[1];
    toArchive = msg.guild.emojis.cache.find((emote) => emote.name === temp);
    if (!toArchive) {
      msg.channel.send('No such emote exists in the server').catch(console.log);
      return;
    }

    //getting archive channel
    archiveChannel = msg.guild.channels.cache.get('698059512409751612');

    archiveChannel.send(toArchive.url).catch(console.error);

    //deleting
    setTimeout(() => {
      toArchive
        .delete()
        .then(() => msg.channel.send(`${toArchive.name} archived`))
        .then(() => emoteDeleteLog(null, toArchive, msg))
        .catch(console.log);
    }, ms('2s'));
  } catch (err) {
    console.log(err);
  }
};

module.exports = archiveEmoteCommand;
