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
    if (!userLogs) console.log('No Audit Was Logged');
    const { executor, target } = userLogs;
    //excecutor->mod
    //target->user
    // msg.author->author of the message;
    if (
      userLogs.id === previousDeleteLogId[0] &&
      userLogs.extra.count > previousDeleteLogCount[0]
    ) {
      //when mod delete
      previousDeleteLogCount[0]++;
      try {
        if (!msg.partial) {
          if (msg.attachments.array()[0]) {
            await deleteMessageAndAttachmentLog(
              msg,
              'attachment',
              executor,
              target
            );
          } else {
            await deleteMessageAndAttachmentLog(
              msg,
              'message',
              executor,
              target
            );
          }
        }
      } catch (err) {
        console.log(err);
      }
    } else if (
      userLogs.id !== previousDeleteLogId[0] &&
      userLogs.extra.count === 1
    ) {
      //when self delete
      previousDeleteLogId[0] = userLogs.id;
      previousDeleteLogCount[0] = 1;
      try {
        if (msg.attachments.array()[0]) {
          await deleteMessageAndAttachmentLog(
            msg,
            'attachment',
            executor,
            target
          );
        } else {
          await deleteMessageAndAttachmentLog(msg, 'message', executor, target);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      if (msg.attachments.array()[0]) {
        await deleteMessageAndAttachmentLog(msg, 'attachment');
      } else {
        await deleteMessageAndAttachmentLog(msg, 'message');
      }
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = messageDeleteCaseHandler;
