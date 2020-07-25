const {
  previousDeleteLogCount,
  previousDeleteLogId,
} = require('../utilities.js');

const deleteMessageAndAttachmentLog = require('../Functions/Loggers/messageDeleteLog.js');

const messageDeleteCaseHandler = async (msg) => {
  try {
    const userLogs = await msg.guild
      .fetchAuditLogs({
        type: 'MESSAGE_DELETE',
      })
      .then((audit) => audit.entries.first());
    const { executor, target } = userLogs;
    //excecutor->mod
    //target->user
    // msg.author->author of the message;
    //when mod delete type 1
    if (
      userLogs.id === previousDeleteLogId[0] &&
      userLogs.extra.count > previousDeleteLogCount[0]
    ) {
      previousDeleteLogCount[0]++;
      await deleteMessageAndAttachmentLog(msg, executor, target);
    }
    //when mod delete type 2
    else if (
      userLogs.id !== previousDeleteLogId[0] &&
      userLogs.extra.count === 1
    ) {
      previousDeleteLogId[0] = userLogs.id;
      previousDeleteLogCount[0] = 1;
      await deleteMessageAndAttachmentLog(msg, executor, target);
    }
    //when self delete
    else {
      await deleteMessageAndAttachmentLog(msg);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = messageDeleteCaseHandler;
