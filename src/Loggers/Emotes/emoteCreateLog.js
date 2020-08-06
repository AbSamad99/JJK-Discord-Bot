/*Function to handle logging when a emote is created*/

const Discord = require('discord.js');

const gifOrPngCheck = require('../../Checks/Other/gifOrPngCheck');

const emoteCreateLog = async (emoteCreateAuditLog, emote, msg) => {
  try {
    let emoteCreateEmbed, logsChannel;

    //getting logs channel
    logsChannel = emote.guild.channels.cache.get('447513266395283476');

    //creating the rmbed
    emoteCreateEmbed = new Discord.MessageEmbed()
      .setTitle('Emote added')
      .setDescription(`${emote} has been added`)
      .setColor(3066993)
      .setFooter(new Date());

    if (!msg) {
      emoteCreateEmbed.setAuthor(
        emoteCreateAuditLog.executor.tag,
        await gifOrPngCheck(emoteCreateAuditLog.executor)
      );
    } else {
      emoteCreateEmbed.setAuthor(
        msg.member.user.tag,
        await gifOrPngCheck(msg.member.user)
      );
    }

    logsChannel.send(emoteCreateEmbed).catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

module.exports = emoteCreateLog;
