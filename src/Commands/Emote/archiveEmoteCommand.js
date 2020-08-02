/*Function to handle the archive emote command*/

const archiveEmoteCommand = (msg) => {
  try {
    let temp, toArchive, archiveChannel;
    temp = msg.content.slice(1);
    temp = temp.split(' ');
    if (!temp[1]) {
      msg.channel.send('Please provide an emote to archive');
      return;
    }
    temp = temp[1].split(':')[1];
    toArchive = msg.guild.emojis.cache.find((emote) => emote.name === temp);
    if (!toArchive) {
      msg.channel.send('No such emote exists in the server');
      return;
    }
    archiveChannel = msg.guild.channels.cache.get('698059512409751612');
    archiveChannel
      .send(toArchive.url)
      .then(() =>
        toArchive.delete().then(() => msg.channel.send('Emote archived'))
      )
      .catch(console.error);
  } catch (err) {
    console.log(err);
  }
};

module.exports = archiveEmoteCommand;
