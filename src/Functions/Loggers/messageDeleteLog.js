const Discord = require('discord.js');

const gifOrPngCheck = require('../Checks/gifOrPngCheck.js');

//Logs deleted messages or attachments and who deleted them
const deleteMessageAndAttachmentLog = async (msg, executor, target) => {
  try {
    let deleteEmbed, authorUrl, attachments, logsChannel;

    //selecting logs channel
    logsChannel = msg.guild.channels.cache.find((ch) => ch.name === 'logs');

    //setting common fields for both cases

    deleteEmbed = new Discord.MessageEmbed()
      .setColor(3447003)
      .setFooter(new Date())
      .setTitle(`Message deleted in #${msg.channel.name}`);

    if (!executor && !target) {
      //self delete
      authorUrl = await gifOrPngCheck(msg.author);
      deleteEmbed
        .setAuthor(msg.author.tag, authorUrl)
        .setThumbnail(authorUrl)
        .addField('Author:', `<@${msg.author.id}>`);
    } else {
      //mod delete
      deleteEmbed
        .setAuthor(executor.tag, await gifOrPngCheck(executor))
        .setThumbnail(await gifOrPngCheck(target))
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
    logsChannel.send(deleteEmbed).catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

module.exports = deleteMessageAndAttachmentLog;
