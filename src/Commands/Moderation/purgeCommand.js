/*Function to handle the purge of messages*/

const { MessageEmbed } = require('discord.js');

//command to purge messages
const purgeCommand = async (msg) => {
  try {
    if (
      !(
        (
          msg.member.roles.cache.has(
            '447512454810042369'
          ) /*Special Grade role*/ ||
          msg.member.roles.cache.has('447512449248395267') /*admin role*/ ||
          msg.member.roles.cache.has('665268720163225610')
        ) /*vengeful spirit role*/
      )
    )
      return;

    let temp,
      number,
      logsChannel,
      user,
      j,
      messages = [],
      tempMessages;

    //getting info from the message
    temp = msg.content.slice(1);
    temp = temp.split(' ');

    //getting the logs channel
    logsChannel = msg.guild.channels.cache.get('447513266395283476');

    if (msg.channel.id === logsChannel.id) {
      msg.channel.send('Cannot purge messages here').catch(console.log);
      return;
    }

    //constructing the embed
    let purgeEmbed = new MessageEmbed()
      .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
      .setTitle('Messages purged')
      .setColor(15158332)
      .setFooter(new Date());

    //getting the number
    number = parseInt(temp[1]);

    //checking if proper number was provided
    if (isNaN(number)) {
      msg.channel.send('Please provide a valid number').catch(console.log);
      return;
    }
    if (number > 300) {
      msg.channel.send('Please input a lower number').catch(console.log);
      return;
    }

    //getting the user to ban
    user = msg.mentions.members.array()[0];

    //checking to see if user was provided or not
    if (!user) {
      user = msg.guild.members.cache.get(temp[2]);
    }

    if (!user) {
      purgeEmbed.setDescription(
        `${msg.author} has purged ${number - 1} messages in <#${
          msg.channel.id
        }>`
      );
      messages = number;
    } else {
      purgeEmbed.setDescription(
        `${msg.author} has purged ${number} messages from ${user} in <#${msg.channel.id}>`
      );
      tempMessages = await msg.channel.messages.fetch();
      tempMessages = tempMessages.filter(
        (msg) => msg.author.id === user.user.id
      );
      tempMessages = tempMessages.keys();
      tempMessages = Array.from(tempMessages);
      for (j = 0; j <= number; j++) {
        messages.push(tempMessages[j]);
      }
    }
    // sending the embed
    msg.channel
      .bulkDelete(messages)
      .then(() => logsChannel.send(purgeEmbed))
      .catch(console.error);
  } catch (err) {
    console.log(err);
  }
};

module.exports = purgeCommand;
