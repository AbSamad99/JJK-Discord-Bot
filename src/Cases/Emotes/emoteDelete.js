/*Handles the logging of whenever new emote is created*/

const emoteDeleteLog = require('../../Loggers/Emotes/emoteDeleteLog');

const emoteDeleteCaseHandler = async (emote) => {
  try {
    let emoteDeleteAuditLog;

    //getting required audit log
    emoteDeleteAuditLog = await emote.guild
      .fetchAuditLogs({
        type: 'EMOJI_DELETE',
      })
      .then((audit) => audit.entries.first());

    if (emoteDeleteAuditLog.executor.id === '730109162616389644') return;

    emoteDeleteLog(emoteDeleteAuditLog, emote);
  } catch (err) {
    console.log(err);
  }
};

module.exports = emoteDeleteCaseHandler;
