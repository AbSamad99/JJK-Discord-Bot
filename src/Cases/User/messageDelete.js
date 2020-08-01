/*Handles logging of whenever a message is deleted*/

const utilities = require('../../utilities.js');

//getting the required logging function
const deleteMessageAndAttachmentLog = require('../../Loggers/Message/messageDeleteLog.js');

const messageDeleteCaseHandler = async (msg) => {
  try {
    //getting the message delete audit log
    const userLogs = await msg.guild
      .fetchAuditLogs({
        type: 'MESSAGE_DELETE',
      })
      .then((audit) => audit.entries.first());

    //checking if mod deleted the message - type 1
    if (
      userLogs.id === utilities.previousDeleteLogId &&
      userLogs.extra.count > utilities.previousDeleteLogCount
    ) {
      utilities.previousDeleteLogCount++;
      await deleteMessageAndAttachmentLog(
        msg,
        userLogs.executor,
        userLogs.target
      );
    }

    //checking if mod deleted the message - type 2
    else if (
      userLogs.id !== utilities.previousDeleteLogId &&
      userLogs.extra.count === 1
    ) {
      utilities.previousDeleteLogId = userLogs.id;
      utilities.previousDeleteLogCount = 1;
      await deleteMessageAndAttachmentLog(
        msg,
        userLogs.executor,
        userLogs.target
      );
    }

    //logging the delete as self delete
    else {
      await deleteMessageAndAttachmentLog(msg);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = messageDeleteCaseHandler;
