/*Function to handle the archive emote command*/

const ms = require('ms');
const emoteDeleteLog = require('../../Loggers/Emotes/emoteDeleteLog');

const archiveOrDeleteEmoteCommand = (msg, type) => {
  try {
    let temp, toArchive, archiveChannel;
    temp = msg.content.slice(1);
    temp = temp.split(' ');
    if (!temp[1]) {
      msg.channel.send(`Please provide an emote to ${type}`).catch(console.log);
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

    //archiving
    if (type === 'archive') {
      archiveChannel.send(toArchive.url).catch(console.error);
    }

    //deleting
    setTimeout(() => {
      toArchive
        .delete()
        .then(() => msg.channel.send(`${toArchive.name} ${type}d`))
        .then(() => emoteDeleteLog(null, toArchive, msg))
        .catch(console.log);
    }, ms('2s'));
  } catch (err) {
    console.log(err);
  }
};

module.exports = archiveOrDeleteEmoteCommand;
