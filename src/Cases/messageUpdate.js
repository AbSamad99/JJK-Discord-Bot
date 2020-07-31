const UserSchema = require('../Schemas/UserSchema.js');

const messageUpdatedLog = require('../Functions/Loggers/Message_logs/messageUpdateLog.js');

const messageUpdateCaseHandler = async (oldMsg, newMsg) => {
  try {
    let honoredOne = UserSchema.findOne({ id: '730109162616389644' });

    if (
      newMsg.author.id !== honoredOne.id &&
      oldMsg.content !== newMsg.content
    ) {
      await messageUpdatedLog(oldMsg, newMsg);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = messageUpdateCaseHandler;
