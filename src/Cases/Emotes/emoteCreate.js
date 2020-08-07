/*Handles the logging of whenever new emote is created*/

const emoteCreateLog = require('../../Loggers/Emotes/emoteCreateLog');

const emoteCreateCaseHandler = async (emote) => {
  let emoteCreateAuditLog;

  //getting required audit log
  emoteCreateAuditLog = await emote.guild
    .fetchAuditLogs({
      type: 'EMOJI_CREATE',
    })
    .then((audit) => audit.entries.first());

  if (emoteCreateAuditLog.executor.id === '730109162616389644') return;

  emoteCreateLog(emoteCreateAuditLog, emote).catch(console.log);
};

module.exports = emoteCreateCaseHandler;
