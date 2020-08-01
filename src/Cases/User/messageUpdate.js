/*Handles logging of whenever a message is updated*/

const UserSchema = require('../../Schemas/UserSchema.js');

//getting required logging function
const messageUpdatedLog = require('../../Loggers/Message/messageUpdateLog.js');

const messageUpdateCaseHandler = async (oldMsg, newMsg) => {
  try {
    //getting the hoonored one user
    let honoredOne = UserSchema.findOne({ id: '730109162616389644' });

    ///checking if the message updated doesnt belong to the honored one
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
