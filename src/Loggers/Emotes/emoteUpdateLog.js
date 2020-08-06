/*Function to handle logging when a emote is deleted*/

const Discord = require('discord.js');

const gifOrPngCheck = require('../../Checks/Other/gifOrPngCheck');

const emoteUpdateLog = async (emoteUpdateAuditLog, oldEmote, newEmote, msg) => {
  try {
    let emoteUpdateEmbed, logsChannel;

    //getting logs channel
    logsChannel = newEmote.guild.channels.cache.get('447513266395283476');

    //creating the rmbed
    emoteUpdateEmbed = new Discord.MessageEmbed()
      .setTitle('Emote updated')
      .setDescription(
        `${newEmote} has been update
${oldEmote.name} ➜ ${newEmote.name}`
      )
      .setColor(10038562)
      .setFooter(new Date());

    if (!msg) {
      emoteUpdateEmbed.setAuthor(
        emoteUpdateAuditLog.executor.tag,
        await gifOrPngCheck(emoteUpdateAuditLog.executor)
      );
    } else {
      emoteUpdateEmbed.setAuthor(
        msg.member.user.tag,
        await gifOrPngCheck(msg.member.user)
      );
    }

    logsChannel.send(emoteUpdateEmbed).catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

module.exports = emoteUpdateLog;
