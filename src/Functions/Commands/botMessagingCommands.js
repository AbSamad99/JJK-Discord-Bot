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
    let messageChannelId = temp[1].slice(2, temp[1].length - 1);
    let messageChannel = msg.guild.channels.cache.find(
      (ch) => ch.id === messageChannelId
    );
    messageChannel.send(message).catch(console.log);
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
      title,
      desc,
      thumbnail,
      field1,
      field2,
      image;

    modBotChannel = msg.guild.channels.cache.find(
      (ch) => ch.name === 'mod-bots'
    );

    embeddedMessage = new Discord.MessageEmbed();

    if (msg.channel.id !== modBotChannel.id) return;
    temp = msg.content.slice(1);
    temp = temp.split(' ');
    messageChannelId = temp[1].slice(2, temp[1].length - 1);

    messageChannel = msg.guild.channels.cache.find(
      (ch) => ch.id === messageChannelId
    );
    if (!messageChannel) {
      msg.channel.send('Invalid Channel');
      return;
    }
    tempArray = msg.content.split('>');
    tempArray.splice(0, 1);
    for (let i = 1; i < tempArray.length - 1; i++) {
      tempArray[i] = tempArray[i].slice(0, tempArray[i].length - 2);
    }
    title = tempArray[1].split('::');
    desc = tempArray[2].split('::');
    thumbnail = tempArray[3].split('::');
    field1 = tempArray[4].split('::');
    field2 = tempArray[5].split('::');
    image = tempArray[6].split('::');

    if (
      title[0].toLowerCase() !== 'title' ||
      desc[0].toLowerCase() !== 'description' ||
      thumbnail[0].toLowerCase() !== 'thumbnail' ||
      field1[0].toLowerCase() !== 'field1' ||
      field2[0].toLowerCase() !== 'field2' ||
      image[0].toLowerCase() !== 'image'
    ) {
      console.log(
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

    if (field1[1].toLowerCase() !== 'null') {
      field1 = field1[1].split(',,');
      embeddedMessage.addField(field1[0], field1[1]);
    }

    if (field2[1].toLowerCase() !== 'null') {
      field2 = field2[1].split(',,');
      embeddedMessage.addField(field2[0], field2[1]);
    }

    if (image[1].toLowerCase() !== 'null') {
      embeddedMessage.setImage(image[1]);
    } else if (msg.attachments.array()[0]) {
      embeddedMessage.setImage(msg.attachments.array()[0].url);
    }

    messageChannel.send(embeddedMessage).catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  botMessageCommand: botMessageCommand,
  botEmbedMessageCommand: botEmbedMessageCommand,
};
