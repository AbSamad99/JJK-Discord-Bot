const urlExist = require('url-exist');

const addEmoteCommand = async (msg) => {
  try {
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
      msg.channel.send(
        'Please provide either a link or an image/gif as attachment'
      );
      return;
    }

    msg.guild.emojis
      .create(emoteUrl, emoteName)
      .then((emote) => msg.channel.send(`${emote} added`))
      .catch((err) => {
        console.error(err);
        msg.channel.send(
          'Error adding emote, make sure file size is not above the maximum allowed size'
        );
      });
  } catch (err) {
    console.log(err);
  }
};

const deleteEmoteCommand = (msg) => {
  try {
    let temp, toDelete;
    temp = msg.content.slice(1);
    temp = temp.split(' ');
    if (!temp[1]) {
      msg.channel.send('Please provide an emote to delete');
      return;
    }
    temp = temp[1].split(':')[1];
    toDelete = msg.guild.emojis.cache.find((emote) => emote.name === temp);
    if (!toDelete) {
      msg.channel.send('No such emote exists in the server');
      return;
    }
    toDelete
      .delete()
      .then(() => msg.channel.send('Emote deleted'))
      .catch(console.error);
  } catch (err) {
    console.log(err);
  }
};

const editEmoteCommand = (msg) => {
  try {
    let temp1, temp2, toEdit;
    temp1 = msg.content.slice(1);
    temp1 = temp1.split(' ');
    if (!temp1[1]) {
      msg.channel.send(`Please provide the emote who's name is to be changed`);
      return;
    }
    if (!temp1[2]) {
      msg.channel.send(`Please provide the new name for the emote`);
      return;
    }
    temp2 = temp1[1].split(':')[1];
    toEdit = msg.guild.emojis.cache.find((emote) => emote.name === temp2);
    if (!toEdit) {
      msg.channel.send('No such emote exists in the server');
      return;
    }
    toEdit
      .edit({
        name: temp1[2],
      })
      .then(() => msg.channel.send('Name changed'))
      .catch(console.error);
  } catch (err) {
    console.log(err);
  }
};

const archiveEmoteCommand = (msg) => {
  try {
    let temp, toDelete, archiveChannel;
    temp = msg.content.slice(1);
    temp = temp.split(' ');
    if (!temp[1]) {
      msg.channel.send('Please provide an emote to archive');
      return;
    }
    temp = temp[1].split(':')[1];
    toDelete = msg.guild.emojis.cache.find((emote) => emote.name === temp);
    if (!toDelete) {
      msg.channel.send('No such emote exists in the server');
      return;
    }
    archiveChannel = msg.guild.channels.cache.find(
      (ch) => ch.name === 'syed-bot-practice'
    );
    archiveChannel
      .send(toDelete.url)
      .then(() =>
        toDelete.delete().then(() => msg.channel.send('Emote archived'))
      )
      .catch(console.error);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  addEmoteCommand: addEmoteCommand,
  deleteEmoteCommand: deleteEmoteCommand,
  editEmoteCommand: editEmoteCommand,
  archiveEmoteCommand: archiveEmoteCommand,
};
