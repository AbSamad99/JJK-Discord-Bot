/*Function which handles the bot embedded message command*/

const { MessageEmbed } = require('discord.js');

const gifOrPngCheck = require('../../Helpers/gifOrPngCheck.js');

const botEmbedMessageCommand = async (msg) => {
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


  let embeddedMessage,
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
    image,
    displayAuthor;

  //getting server events role
  serverEventsRole = msg.guild.roles.cache.get('720949881891454976');

  embeddedMessage = new MessageEmbed();

  //getting required info from the msg
  temp = msg.content.slice(1);
  temp = temp.split(' ');

  //getting destination channel id
  messageChannelId = temp[1].slice(
    temp[1].indexOf('#') + 1,
    temp[1].indexOf('>')
  );

  //getting destination channel
  messageChannel = msg.guild.channels.cache.get(messageChannelId);

  //check to see if channel exists
  if (!messageChannel) {
    msg.channel.send('Invalid Channel');
    return;
  }

  //getting required fields
  tempArray = msg.content.split('{');
  tempArray.splice(0, 1);

  //removing the [ and ] brackets
  for (let i = 0; i < tempArray.length; i++) {
    tempArray[i] = tempArray[i].slice(0, tempArray[i].indexOf('}'));
  }

  //seperating into different fields
  type = tempArray[0].split('::');
  title = tempArray[1].split('::');
  desc = tempArray[2].split('::');
  thumbnail = tempArray[3].split('::');
  fields = tempArray[4].split('::');
  image = tempArray[5].split('::');
  displayAuthor = tempArray[6].split('::');

  //check to see if the user followed proper syntax of the command
  if (
    type[0].toLowerCase() !== 'type' ||
    title[0].toLowerCase() !== 'title' ||
    desc[0].toLowerCase() !== 'description' ||
    thumbnail[0].toLowerCase() !== 'thumbnail' ||
    fields[0].toLowerCase() !== 'fields' ||
    image[0].toLowerCase() !== 'image' ||
    displayAuthor[0].toLowerCase() !== 'displayauthor'
  ) {
    msg.channel
      .send('Invalid format, please follow the proper syntax of the command')
      .catch(console.log);
    return;
  }

  //setting the author, title and description fields
  if (displayAuthor[1].toLowerCase() !== 'no') {
    embeddedMessage.setAuthor(msg.author.tag, await gifOrPngCheck(msg.author));
  }

  //check to see if description was provided
  if (desc[1].toLowerCase() !== 'null') {
    embeddedMessage.setDescription(desc[1]);
  }

  //check to see if title was provided
  if (title[1].toLowerCase() !== 'null') {
    embeddedMessage.setTitle(title[1]);
  }

  //check to see if thumbnail link was provided
  if (thumbnail[1].toLowerCase() !== 'null') {
    embeddedMessage.setThumbnail(thumbnail[1]);
  }

  //check to see if any fields were provided, and looping through each field and adding it to the embed
  if (fields[1].toLowerCase() !== 'null') {
    fields = fields[1].split('<');
    fields.splice(0, 1);
    fields.forEach((field) => {
      field = field.slice(0, field.indexOf('>'));
      field = field.split('--');
      embeddedMessage.addField(field[0], field[1]);
    });
  }

  //check to see if any image link or attachment was provided and adding it to the embed
  if (image[1].toLowerCase() !== 'null') {
    embeddedMessage.setImage(image[1]);
  } else if (msg.attachments.array()[0]) {
    embeddedMessage.setImage(msg.attachments.array()[0].url);
  }

  //finding out what type of message it is
  if (type[1].toLowerCase() === 'general') {
    messageChannel.send(embeddedMessage).catch(console.error);
  } else if (type[1].toLowerCase() === 'announcement') {
    messageChannel
      .send(`@everyone`, { embed: embeddedMessage })
      .catch(console.log);
  } else if (type[1].toLowerCase() === 'server event') {
    messageChannel
      .send(`${serverEventsRole}`, { embed: embeddedMessage })
      .catch(console.log);
  }
};

module.exports = botEmbedMessageCommand;
