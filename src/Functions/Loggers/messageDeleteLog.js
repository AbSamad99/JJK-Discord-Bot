const Discord = require('discord.js');

const checkIfGifOrPng = require('../Helpers/checkIfGifOrPng.js');

//Logs deleted messages or attachments and who deleted them
const deleteMessageAndAttachmentLog = async (msg, executor, target) => {
  try {
    let deleteEmbed, authorUrl, thumbnail, attachments, modChannel;

    //selecting logs channel
    modChannel = msg.guild.channels.cache.find(
      (ch) => ch.name === 'syed-bot-practice'
    );

    //setting common fields for both cases

    deleteEmbed = new Discord.MessageEmbed()
      .setColor(3447003)
      .setFooter(new Date())
      .setTitle(`Message deleted in #${msg.channel.name}`);

    if (!executor && !target) {
      //self delete
      authorUrl = await checkIfGifOrPng(msg.author);
      deleteEmbed
        .setAuthor(msg.author.tag, authorUrl)
        .setThumbnail(authorUrl)
        .addField('Author:', `<@${msg.author.id}>`);
    } else {
      //mod delete
      authorUrl = await checkIfGifOrPng(executor);
      thumbnail = await checkIfGifOrPng(target);
      deleteEmbed
        .setAuthor(executor.tag, authorUrl)
        .setThumbnail(thumbnail)
        .addField('Author:', `<@${target.id}>`);
    }

    if (msg.content.length) {
      deleteEmbed.addField('Message:', msg.content);
    }

    if (msg.attachments.array().length) {
      attachments = msg.attachments.array()[0].name;
      for (let i = 1; i < msg.attachments.array().length; i++) {
        attachments = `${attachments}
${msg.attachments.array()[i].name}`;
      }
      deleteEmbed.addField('Attachment(s):', attachments);
    }

    //sending the embeded message
    modChannel.send(deleteEmbed).catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

module.exports = deleteMessageAndAttachmentLog;
