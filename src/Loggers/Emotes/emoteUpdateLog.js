/*Function to handle logging when a emote is deleted*/

const { MessageEmbed } = require('discord.js');

const gifOrPngCheck = require('../../Helpers/gifOrPngCheck');

const emoteUpdateLog = async (emoteUpdateAuditLog, oldEmote, newEmote, msg) => {
  let emoteUpdateEmbed, logsChannel;

  //getting logs channel
  logsChannel = newEmote.guild.channels.cache.get('447513266395283476');

  //creating the rmbed
  emoteUpdateEmbed = new MessageEmbed()
    .setTitle('Emote updated')
    .setDescription(
      `${newEmote} has been updated
${oldEmote.name} ➜ ${newEmote.name}`
    )
    .setColor(15854089)
    .setFooter(new Date());

  if (!msg) {
    emoteUpdateEmbed.setAuthor(
      emoteUpdateAuditLog.executor.tag,
      await gifOrPngCheck(emoteUpdateAuditLog.executor)
    );
  } else {
    emoteUpdateEmbed.setAuthor(msg.author.tag, await gifOrPngCheck(msg.author));
  }

  logsChannel.send(emoteUpdateEmbed).catch(console.log);
};

module.exports = emoteUpdateLog;
