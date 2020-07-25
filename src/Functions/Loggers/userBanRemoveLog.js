const Discord = require('discord.js');

const checkIfGifOrPng = require('../Helpers/checkIfGifOrPng.js');

//logs when user is banned from the server
const userBanRemoveLog = async (banRemovalAuditLog, modChannel) => {
  try {
    let banRemovalEmbed, authorUrl, thumbnail;

    //setting relevant fields
    authorUrl = await checkIfGifOrPng(banRemovalAuditLog.executor);
    thumbnail = await checkIfGifOrPng(banRemovalAuditLog.target);

    banRemovalEmbed = new Discord.MessageEmbed()
      .setAuthor(banRemovalAuditLog.executor.tag, authorUrl)
      .setTitle('Member Unbanned')
      .setColor(3447003)
      .setThumbnail(thumbnail)
      .setDescription(`<@${banRemovalAuditLog.target.id}> has been Unbanned.`)
      .setFooter(new Date());

    //logging
    modChannel.send(banRemovalEmbed).catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

module.exports = userBanRemoveLog;
