/*Function to handle logging when a emote is created*/

const { MessageEmbed } = require('discord.js');

const gifOrPngCheck = require('../../Helpers/gifOrPngCheck');

const emoteCreateLog = async (emoteCreateAuditLog, emote, msg) => {
  let emoteCreateEmbed, logsChannel;

  //getting logs channel
  logsChannel = emote.guild.channels.cache.get('447513266395283476');

  //creating the rmbed
  emoteCreateEmbed = new MessageEmbed()
    .setTitle('Emote added')
    .setDescription(`${emote} ${emote.name} has been added`)
    .setColor(3066993)
    .setFooter(new Date());

  if (!msg) {
    emoteCreateEmbed.setAuthor(
      emoteCreateAuditLog.executor.tag,
      await gifOrPngCheck(emoteCreateAuditLog.executor)
    );
  } else {
    emoteCreateEmbed.setAuthor(msg.author.tag, await gifOrPngCheck(msg.author));
  }

  logsChannel.send(emoteCreateEmbed).catch(console.log);
};

module.exports = emoteCreateLog;
