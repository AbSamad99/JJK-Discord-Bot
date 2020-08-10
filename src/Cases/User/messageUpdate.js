/*Handles logging of whenever a message is updated*/

const UserSchema = require('../../Schemas/UserSchema.js');

//getting required logging function
const messageUpdatedLog = require('../../Loggers/Message/messageUpdateLog.js');

const messageUpdateCaseHandler = async (oldMsg, newMsg) => {
  //getting the honored one user
  let honoredOne = newMsg.guild.members.cache.get('730109162616389644');

  ///checking if the message updated doesnt belong to the honored one
  if (newMsg.author.id !== honoredOne.id && oldMsg.content !== newMsg.content) {
    await messageUpdatedLog(oldMsg, newMsg).catch(console.log);
  }
};

module.exports = messageUpdateCaseHandler;
