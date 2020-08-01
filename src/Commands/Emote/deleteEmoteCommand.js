/*Function to handle the delete emote command*/

//command to delete emotes
const deleteEmoteCommand = (msg) => {
  try {
    let temp, toDelete;

    //getting info from message
    temp = msg.content.slice(1);
    temp = temp.split(' ');

    //checking if emote to delete was provided or not
    if (!temp[1]) {
      msg.channel.send('Please provide an emote to delete');
      return;
    }

    //getting emote name
    temp = temp[1].split(':')[1];

    //searching for the emote
    toDelete = msg.guild.emojis.cache.find((emote) => emote.name === temp);

    //checking if such an emote exists
    if (!toDelete) {
      msg.channel.send('No such emote exists in the server');
      return;
    }

    //deleting the emote
    toDelete
      .delete()
      .then(() => msg.channel.send('Emote deleted'))
      .catch(console.error);
  } catch (err) {
    console.log(err);
  }
};

module.exports = deleteEmoteCommand;
