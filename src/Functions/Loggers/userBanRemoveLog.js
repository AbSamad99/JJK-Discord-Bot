const Discord = require('discord.js');

const checkIfGifOrPng = require('../Helpers/checkIfGifOrPng.js');

//logs when user is banned from the server
const userBanRemoveLog = async (banRemovalAuditLog, modChannel) => {
  try {
    let banRemovalEmbed;

    //setting relevant fields

    banRemovalEmbed = new Discord.MessageEmbed()
      .setAuthor(
        banRemovalAuditLog.executor.tag,
        await checkIfGifOrPng(banRemovalAuditLog.executor)
      )
      .setTitle('Member Unbanned')
      .setColor(3447003)
      .setThumbnail(await checkIfGifOrPng(banRemovalAuditLog.target))
      .setDescription(`<@${banRemovalAuditLog.target.id}> has been Unbanned.`)
      .setFooter(new Date());

    //logging
    modChannel.send(banRemovalEmbed).catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

module.exports = userBanRemoveLog;
