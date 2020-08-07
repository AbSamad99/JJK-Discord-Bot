/*Handles logging of each of the message that was deleted whenever a large number of messages are purged in
a channel*/

//getting the required logging functions
const deleteMessageAndAttachmentLog = require('../../Loggers/Message/messageDeleteLog');

const messageBulkDeleteCaseHandler = async (msgs) => {
  let messageArray, bulkDeleteAuditLog;

  //getting all the messages deleted
  messageArray = msgs.array();

  //fetching the message bulk delete audit log
  bulkDeleteAuditLog = await messageArray[0].guild
    .fetchAuditLogs({
      type: 'MESSAGE_BULK_DELETE',
    })
    .then((audit) => audit.entries.first());

  //looping through the messages and logging
  for (let i = messageArray.length - 1; i >= 1; i--) {
    deleteMessageAndAttachmentLog(
      messageArray[i],
      bulkDeleteAuditLog.executor,
      messageArray[i].author
    ).catch(console.log);
  }
};

module.exports = messageBulkDeleteCaseHandler;
