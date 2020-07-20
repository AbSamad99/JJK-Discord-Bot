const createEmbed = require('../Helpers/createEmbed.js');
const checkIfGifOrPng = require('../Helpers/checkIfGifOrPng.js');

//logs when user is banned from the server
const userBanRemoveLog = async (banRemovalAuditLog, modChannel) => {
  try {
    let banRemovalEmbed,
      authorName,
      authorUrl,
      title,
      color,
      thumbnail,
      description;

    //setting relevant fields
    authorName = banRemovalAuditLog.executor.tag;
    authorUrl = await checkIfGifOrPng(banRemovalAuditLog.executor);
    title = 'Member Unbanned';
    color = 3447003;
    thumbnail = await checkIfGifOrPng(banRemovalAuditLog.target);
    description = `<@${banRemovalAuditLog.target.id}> has been Unbanned.`;

    //creating the embed
    banRemovalEmbed = createEmbed(
      authorName,
      authorUrl,
      title,
      color,
      null,
      null,
      thumbnail,
      description
    );

    //logging
    modChannel.send(banRemovalEmbed).catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

module.exports = userBanRemoveLog;
