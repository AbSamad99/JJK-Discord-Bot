/*Function to handle the archive emote command*/

const ms = require('ms');

const archiveOrDeleteEmoteCommand = (msg, type) => {
  try {
    let temp, toArchive, archiveChannel;
    temp = msg.content.slice(1);
    temp = temp.split(' ');
    if (!temp[1]) {
      msg.channel.send(`Please provide an emote to ${type}`);
      return;
    }
    temp = temp[1].split(':')[1];
    toArchive = msg.guild.emojis.cache.find((emote) => emote.name === temp);
    if (!toArchive) {
      msg.channel.send('No such emote exists in the server');
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
        .then(() => msg.channel.send(`Emote ${type}d`))
        .catch(console.log);
    }, ms('2s'));
  } catch (err) {
    console.log(err);
  }
};

module.exports = archiveOrDeleteEmoteCommand;