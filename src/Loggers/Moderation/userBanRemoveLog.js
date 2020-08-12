/*Function to log when a user is unbanned*/

const { MessageEmbed } = require('discord.js');

const gifOrPngCheck = require('../../Helpers/gifOrPngCheck.js');

const userBanRemoveLog = async (banRemovalAuditLog, modChannel) => {
  let banRemovalEmbed;

  //setting relevant fields
  banRemovalEmbed = new MessageEmbed()
    .setAuthor(
      banRemovalAuditLog.executor.tag,
      await gifOrPngCheck(banRemovalAuditLog.executor)
    )
    .setTitle('Member unbanned')
    .setColor(3066993)
    .setThumbnail(await gifOrPngCheck(banRemovalAuditLog.target))
    .setDescription(`${banRemovalAuditLog.target} has been unbanned.`)
    .setFooter(new Date());

  //logging
  modChannel.send(banRemovalEmbed).catch(console.error);
};

module.exports = userBanRemoveLog;
