const Discord = require('discord.js');

const gifOrPngCheck = require('../Checks/gifOrPngCheck.js');

//command to send bot messages
const botMessageCommand = (msg) => {
  try {
    let modBotChannel = msg.guild.channels.cache.find(
      (ch) => ch.name === 'mod-bots'
    );
    if (msg.channel.id !== modBotChannel.id) return;
    let temp = msg.content.slice(1);
    temp = temp.split(' ');
    let temp1 = temp.slice(2);
    let message = temp1.join(' ');
    let messageChannelId = temp[1].slice(
      temp[1].indexOf('#') + 1,
      temp[1].indexOf('>')
    );
    let messageChannel = msg.guild.channels.cache.find(
      (ch) => ch.id === messageChannelId
    );
    if (!messageChannel) {
      msg.channel.send('Please provide a valid channel');
      return;
    }
    if (!message) {
      msg.channel.send('Please provide message to be sent');
      return;
    }
    messageChannel.send(message).catch(console.error);
  } catch (err) {
    console.log(err);
  }
};

//command to send bot embedded messages
const botEmbedMessageCommand = async (msg) => {
  try {
    let modBotChannel,
      embeddedMessage,
      temp,
      messageChannelId,
      messageChannel,
      tempArray,
      serverEventsRole,
      type,
      title,
      desc,
      thumbnail,
      fields,
      image;

    modBotChannel = msg.guild.channels.cache.find(
      (ch) => ch.name === 'mod-bots'
    );

    serverEventsRole = msg.guild.roles.cache.find(
      (role) => role.name === 'Server Events'
    );

    embeddedMessage = new Discord.MessageEmbed();

    if (msg.channel.id !== modBotChannel.id) return;
    temp = msg.content.slice(1);
    temp = temp.split(' ');
    messageChannelId = temp[1].slice(
      temp[1].indexOf('#') + 1,
      temp[1].indexOf('>')
    );

    messageChannel = msg.guild.channels.cache.find(
      (ch) => ch.id === messageChannelId
    );
    if (!messageChannel) {
      msg.channel.send('Invalid Channel');
      return;
    }
    tempArray = msg.content.split('[');
    tempArray.splice(0, 1);
    for (let i = 0; i < tempArray.length; i++) {
      tempArray[i] = tempArray[i].slice(0, tempArray[i].indexOf(']'));
    }

    type = tempArray[0].split('::');
    title = tempArray[1].split('::');
    desc = tempArray[2].split('::');
    thumbnail = tempArray[3].split('::');
    fields = tempArray[4].split('::');
    image = tempArray[5].split('::');

    if (
      type[0].toLowerCase() !== 'type' ||
      title[0].toLowerCase() !== 'title' ||
      desc[0].toLowerCase() !== 'description' ||
      thumbnail[0].toLowerCase() !== 'thumbnail' ||
      fields[0].toLowerCase() !== 'fields' ||
      image[0].toLowerCase() !== 'image'
    ) {
      msg.channel.send(
        'Invalid format, please follow the proper syntax of the command'
      );
      return;
    }

    embeddedMessage.setAuthor(msg.author.tag, await gifOrPngCheck(msg.author));

    embeddedMessage.setTitle(title[1]);

    embeddedMessage.setDescription(desc[1]);

    if (thumbnail[1].toLowerCase() !== 'null') {
      embeddedMessage.setThumbnail(thumbnail[1]);
    }

    if (fields[1].toLowerCase() !== 'null') {
      fields = fields[1].split('{');
      fields.splice(0, 1);
      fields.forEach((field) => {
        field = field.slice(0, field.indexOf('}'));
        field = field.split('--');
        embeddedMessage.addField(field[0], field[1]);
      });
    }

    if (image[1].toLowerCase() !== 'null') {
      embeddedMessage.setImage(image[1]);
    } else if (msg.attachments.array()[0]) {
      embeddedMessage.setImage(msg.attachments.array()[0].url);
    }

    if (type[1].toLowerCase() === 'general') {
      messageChannel.send(embeddedMessage).catch(console.error);
    } else if (type[1].toLowerCase() === 'announcement') {
      messageChannel.send(`@everyone`, { embed: embeddedMessage });
    } else if (type[1].toLowerCase() === 'server event') {
      messageChannel.send(`${serverEventsRole}`, { embed: embeddedMessage });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  botMessageCommand: botMessageCommand,
  botEmbedMessageCommand: botEmbedMessageCommand,
};
