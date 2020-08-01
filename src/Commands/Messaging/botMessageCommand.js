/*Function which handles the bot message command*/

const botMessageCommand = (msg) => {
  try {
    //getting #mod-bots channel
    let modBotChannel = msg.guild.channels.cache.find(
      (ch) => ch.name === 'mod-bots'
    );

    //checking if command was made in #mod-bots
    if (msg.channel.id !== modBotChannel.id) return;

    //getting required info from the msg
    let temp = msg.content.slice(1);
    temp = temp.split(' ');
    let temp1 = temp.slice(2);
    let message = temp1.join(' ');

    //getting destination channel id
    let messageChannelId = temp[1].slice(
      temp[1].indexOf('#') + 1,
      temp[1].indexOf('>')
    );

    //getting destination channel
    let messageChannel = msg.guild.channels.cache.find(
      (ch) => ch.id === messageChannelId
    );

    //check to see if channel exists
    if (!messageChannel) {
      msg.channel.send('Please provide a valid channel');
      return;
    }

    //check to see if message was provided
    if (!message) {
      msg.channel.send('Please provide message to be sent');
      return;
    }

    //send message to destination channel
    messageChannel.send(message).catch(console.error);
  } catch (err) {
    console.log(err);
  }
};

module.exports = botMessageCommand;
