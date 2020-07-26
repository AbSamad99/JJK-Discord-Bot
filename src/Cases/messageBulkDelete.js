const deleteMessageAndAttachmentLog = require('../Functions/Loggers/messageDeleteLog');

const messageBulkDeleteCaseHandler = async (msgs) => {
  try {
    let modChannel, messageArray, bulkDeleteAuditLog;
    modChannel = msgs
      .array()[0]
      .guild.channels.cache.find((ch) => ch.name === 'syed-bot-practice');

    messageArray = msgs.array();

    bulkDeleteAuditLog = await messageArray[0].guild
      .fetchAuditLogs({
        type: 'MESSAGE_BULK_DELETE',
      })
      .then((audit) => audit.entries.first());

    for (let i = messageArray.length - 1; i >= 1; i--) {
      await deleteMessageAndAttachmentLog(
        messageArray[i],
        bulkDeleteAuditLog.executor,
        messageArray[i].author
      );
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = messageBulkDeleteCaseHandler;
