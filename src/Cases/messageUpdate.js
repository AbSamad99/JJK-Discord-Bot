const fs = require('fs');

const UserSchema = require('../Schemas/UserSchema.js');

const editMessageLog = require('../Functions//Loggers/messageUpdateLog.js');

const messageUpdateCaseHandler = async (oldMsg, newMsg) => {
  try {
    let honoredOne = UserSchema.findOne({ id: '730109162616389644' });

    if (
      newMsg.author.id !== honoredOne.id &&
      oldMsg.content !== newMsg.content
    ) {
      await editMessageLog(oldMsg, newMsg);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = messageUpdateCaseHandler;
