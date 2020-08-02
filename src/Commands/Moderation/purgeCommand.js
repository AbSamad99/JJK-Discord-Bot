/*Function to handle the purge of messages*/

const Discord = require('discord.js');

//command to purge messages
const purgeCommand = (msg) => {
  try {
    let temp, number, logsChannel;

    //getting the logs channel
    logsChannel = msg.guild.channels.cache.get('447513266395283476');

    //getting info from the message
    temp = msg.content.slice(1);
    temp = temp.split(' ');
    number = parseInt(temp[1]);

    //checking if proper number was provided
    if (isNaN(number)) {
      msg.channel.send('Please provide a valid number');
      return;
    }
    if (number > 300) {
      msg.channel.send('Please input a lower number');
      return;
    }
    if (msg.channel.id === logsChannel.id) {
      msg.channel.send('Cannot purge messages here');
      return;
    }

    //constructing the embed
    let purgeEmbed = new Discord.MessageEmbed()
      .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
      .setTitle('Messages purged')
      .setDescription(
        `${msg.author} has purged ${number - 1} messages in <#${
          msg.channel.id
        }>`
      )
      .setColor(15158332)
      .setFooter(new Date());

    //sending the embed
    msg.channel
      .bulkDelete(number)
      .then(() => logsChannel.send(purgeEmbed))
      .catch(console.error);
  } catch (err) {
    console.log(err);
  }
};

module.exports = purgeCommand;
