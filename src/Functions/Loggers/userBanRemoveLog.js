const Discord = require('discord.js');

const gifOrPngCheck = require('../Checks/gifOrPngCheck.js');

//logs when user is banned from the server
const userBanRemoveLog = async (banRemovalAuditLog, modChannel) => {
  try {
    let banRemovalEmbed;

    //setting relevant fields

    banRemovalEmbed = new Discord.MessageEmbed()
      .setAuthor(
        banRemovalAuditLog.executor.tag,
        await gifOrPngCheck(banRemovalAuditLog.executor)
      )
      .setTitle('Member Unbanned')
      .setColor(3066993)
      .setThumbnail(await gifOrPngCheck(banRemovalAuditLog.target))
      .setDescription(`<@${banRemovalAuditLog.target.id}> has been Unbanned.`)
      .setFooter(new Date());

    //logging
    modChannel.send(banRemovalEmbed).catch(console.error);
  } catch (err) {
    console.log(err);
  }
};

module.exports = userBanRemoveLog;
