/*Handles the logging of whenever new emote is created*/

const emoteUpdateLog = require('../../Loggers/Emotes/emoteUpdateLog');

const emoteUpdateCaseHandler = async (oldEmote, newEmote) => {
  try {
    let emoteUpdateAuditLog;

    //getting required audit log
    emoteUpdateAuditLog = await newEmote.guild
      .fetchAuditLogs({
        type: 'EMOJI_DELETE',
      })
      .then((audit) => audit.entries.first());

    if (emoteUpdateAuditLog.executor.id === '730109162616389644') return;

    emoteUpdateLog(emoteUpdateAuditLog, oldEmote, newEmote);
  } catch (err) {
    console.log(err);
  }
};

module.exports = emoteUpdateCaseHandler;
