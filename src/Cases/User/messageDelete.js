/*Handles logging of whenever a message is deleted*/

//getting the required logging function
const deleteMessageAndAttachmentLog = require('../../Loggers/Message/messageDeleteLog.js');

const messageDeleteCaseHandler = async (msg, myCache) => {
  try {
    let temp1, temp2;

    //getting the message delete audit log
    const userLogs = await msg.guild
      .fetchAuditLogs({
        type: 'MESSAGE_DELETE',
      })
      .then((audit) => audit.entries.first());

    temp1 = myCache.get('previousDeleteLogId');
    temp2 = myCache.get('previousDeleteLogCount');

    //checking if mod deleted the message - type 1
    if (userLogs.id === temp1 && userLogs.extra.count > temp2) {
      temp2++;
      myCache.del('previousDeleteLogCount');
      myCache.set('previousDeleteLogCount', temp2);
      await deleteMessageAndAttachmentLog(
        msg,
        userLogs.executor,
        userLogs.target
      );
    }

    //checking if mod deleted the message - type 2
    else if (userLogs.id !== temp1 && userLogs.extra.count === 1) {
      myCache.del('previousDeleteLogId');
      myCache.set('previousDeleteLogId', userLogs.id);
      myCache.del('previousDeleteLogCount');
      myCache.set('previousDeleteLogCount', 1);
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
