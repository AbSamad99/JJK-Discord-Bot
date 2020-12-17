/*Function which handles the bot message command*/

const botMessageCommand = (msg) => {
  try {
    if (
      !(
        (
          msg.member.roles.cache.has('447512454810042369') /*Special Grade role*/ ||
          msg.member.roles.cache.has('447512449248395267')
        ) /*admin role*/
      ) &&
      !(msg.channel.id == '460890234788249600') //mod-bot check
    )
      return;


    //getting required info from the msg
    let temp = msg.content.slice(1);
    temp = temp.split(' ');
    let temp1 = temp.slice(2);
    let message = temp1.join(' ');

    if (!temp[1]) {
      msg.channel.send('Please provide the channel to send the message to');
      return;
    }

    //getting destination channel id
    let messageChannelId = temp[1].slice(
      temp[1].indexOf('#') + 1,
      temp[1].indexOf('>')
    );

    //getting destination channel
    let messageChannel = msg.guild.channels.cache.get(messageChannelId);

    //check to see if channel exists
    if (!messageChannel) {
      msg.channel.send('Please provide a valid channel').catch(console.log);
      return;
    }

    //check to see if message was provided
    if (!message) {
      msg.channel.send('Please provide message to be sent').catch(console.log);
      return;
    }

    //send message to destination channel
    messageChannel.send(message).catch(console.error);
  } catch (err) {
    console.log(err);
  }
};

module.exports = botMessageCommand;
