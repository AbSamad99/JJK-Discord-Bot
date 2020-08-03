/*Function to log message deletion*/

const Discord = require('discord.js');

const gifOrPngCheck = require('../../Checks/Other/gifOrPngCheck.js');

//Logs deleted messages or attachments and who deleted them
const deleteMessageAndAttachmentLog = async (msg, executor, target) => {
  try {
    let deleteEmbed, authorUrl, attachments, logsChannel;

    //selecting logs channel
    logsChannel = msg.guild.channels.cache.get('447513266395283476');

    //setting common fields for both cases
    deleteEmbed = new Discord.MessageEmbed()
      .setColor(15158332)
      .setFooter(new Date())
      .setTitle(`Message deleted in #${msg.channel.name}`);

    //self delete
    if (!executor && !target) {
      authorUrl = await gifOrPngCheck(msg.author);
      deleteEmbed
        .setAuthor(msg.author.tag, authorUrl)
        .setThumbnail(authorUrl)
        .addField('Author:', `${msg.author}`);
    }

    //mod delete
    else {
      deleteEmbed
        .setAuthor(executor.tag, await gifOrPngCheck(executor))
        .setThumbnail(await gifOrPngCheck(target))
        .addField('Author:', `${target.id}`);
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
    logsChannel.send(deleteEmbed).catch(console.error);
  } catch (err) {
    console.log(err);
  }
};

module.exports = deleteMessageAndAttachmentLog;
