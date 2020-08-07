/*Function to handle logging when a emote is deleted*/

const { MessageEmbed } = require('discord.js');

const gifOrPngCheck = require('../../Checks/Other/gifOrPngCheck');

const emoteDeleteLog = async (emoteDeleteAuditLog, emote, msg) => {
  let emoteDeleteEmbed, logsChannel;

  //getting logs channel
  logsChannel = emote.guild.channels.cache.get('447513266395283476');

  //creating the rmbed
  emoteDeleteEmbed = new MessageEmbed()
    .setTitle('Emote deleted')
    .setDescription(`${emote.name} has been deleted`)
    .setColor(10038562)
    .setFooter(new Date());

  if (!msg) {
    emoteDeleteEmbed.setAuthor(
      emoteDeleteAuditLog.executor.tag,
      await gifOrPngCheck(emoteDeleteAuditLog.executor)
    );
  } else {
    emoteDeleteEmbed.setAuthor(msg.author.tag, await gifOrPngCheck(msg.author));
  }

  logsChannel.send(emoteDeleteEmbed).catch(console.log);
};

module.exports = emoteDeleteLog;
