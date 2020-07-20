const createEmbed = require('../Helpers/createEmbed.js');
const checkIfGifOrPng = require('../Helpers/checkIfGifOrPng.js');

//Logs deleted messages or attachments and who deleted them
const deleteMessageAndAttachmentLog = async (msg, type, executor, target) => {
  try {
    let delEmbed,
      authorName,
      authorUrl,
      title,
      color,
      field1,
      field2,
      thumbnail;

    //selecting logs channel
    let modChannel = msg.guild.channels.cache.find(
      (ch) => ch.name === 'syed-bot-practice'
    );

    //selecting channel where message was deleted
    let deletedChannel = msg.channel;

    //setting common fields for both cases
    field1 = { title: 'Author:', content: '' };
    color = 3447003;

    //finding if message or attachment was deleted
    if (type === 'message') {
      title = `Message deleted in #${deletedChannel.name}`;
      field2 = { title: 'Message:', content: '' };
      field2.content = msg.content;
    } else if (type === 'attachment') {
      title = `Attachment deleted in #${deletedChannel.name}`;
      field2 = { title: 'Attachment:', content: '' };
      field2.content = msg.attachments.array()[0].name;
    }

    if (!executor && !target) {
      //self delete
      authorName = msg.author.tag;
      authorUrl = await checkIfGifOrPng(msg.author);
      field1.content = `<@${msg.author.id}>`;
    } else {
      //mod delete
      authorName = executor.tag;
      authorUrl = await checkIfGifOrPng(executor);
      field1.content = `<@${target.id}>`;
    }

    thumbnail = authorUrl;

    //creating the embed
    delEmbed = createEmbed(
      authorName,
      authorUrl,
      title,
      color,
      field1,
      field2,
      thumbnail
    );

    //sending the embeded message
    modChannel.send(delEmbed).catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

module.exports = deleteMessageAndAttachmentLog;
