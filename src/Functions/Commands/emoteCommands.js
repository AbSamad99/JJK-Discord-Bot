const urlExist = require('url-exist');

const addEmote = async (msg) => {
  let temp, emoteUrl, emoteName;
  temp = msg.content.slice(1);
  temp = temp.split(' ');

  if (!temp[1]) {
    msg.channel.send('Please provide a name for the emote');
    return;
  }

  emoteName = temp[1];

  if (temp[2]) {
    emoteUrl = temp[2];
    if (!urlExist(emoteUrl)) {
      msg.channel.send('Invalid link provided');
      return;
    }
  } else if (msg.attachments.array()[0]) {
    emoteUrl = msg.attachments.array()[0].url;
  } else {
    msg.channel.send('Please provide either a link or an image as attachment');
    return;
  }

  msg.guild.emojis
    .create(emoteUrl, emoteName)
    .then((emote) => msg.channel.send(`${emote.name} added`))
    .catch((err) => {
      console.error(err);
      msg.channel.send(
        'Error adding emote, make sure file size is no more than 256 kb'
      );
    });
};

module.exports = {
  addEmote: addEmote,
};
