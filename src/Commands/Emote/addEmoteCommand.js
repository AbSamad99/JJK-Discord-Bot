/*Function to handle the add emote command*/

const urlExist = require('url-exist');

//command to add a new emote
const addEmoteCommand = async (msg) => {
  try {
    let temp, emoteUrl, emoteName;

    //getting info from message
    temp = msg.content.slice(1);
    temp = temp.split(' ');

    //check if name was provided or not
    if (!temp[1]) {
      msg.channel.send('Please provide a name for the emote');
      return;
    }

    emoteName = temp[1];

    //check if image link or attachment for the emote was provided
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

    //adding the new emote
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

module.exports = addEmoteCommand;
