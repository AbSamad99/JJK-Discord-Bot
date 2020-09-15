/*Function to log when a user is unbanned*/

const { MessageEmbed } = require('discord.js');

const gifOrPngCheck = require('../../Helpers/gifOrPngCheck.js');

const userBanRemoveLog = async (banRemovalAuditLog, modChannel, msg, user) => {
  let banRemovalEmbed;

  //setting relevant fields
  banRemovalEmbed = new MessageEmbed()
    .setTitle('Member unbanned')
    .setColor(3066993)
    .setFooter(new Date());

  if (!msg) {
    banRemovalEmbed
      .setAuthor(
        banRemovalAuditLog.executor.tag,
        await gifOrPngCheck(banRemovalAuditLog.executor)
      )
      .setThumbnail(await gifOrPngCheck(banRemovalAuditLog.target))
      .setDescription(`${banRemovalAuditLog.target} has been unbanned.`);
  } else {
    banRemovalEmbed
      .setAuthor(msg.author.tag, await gifOrPngCheck(msg.author))
      .setThumbnail(await gifOrPngCheck(user))
      .setDescription(`${user} has been unbanned.`);

    msg.channel.send(banRemovalEmbed).catch(console.error);
  }

  //logging
  modChannel.send(banRemovalEmbed).catch(console.error);
};

module.exports = userBanRemoveLog;
