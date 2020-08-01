/*Function to log when a user is unbanned*/

const Discord = require('discord.js');

const gifOrPngCheck = require('../../Checks/gifOrPngCheck.js');

const userBanRemoveLog = async (banRemovalAuditLog, modChannel) => {
  try {
    let banRemovalEmbed;

    //setting relevant fields
    banRemovalEmbed = new Discord.MessageEmbed()
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
  } catch (err) {
    console.log(err);
  }
};

module.exports = userBanRemoveLog;
