/*Function to handle the edit emote command*/

const emoteUpdateLog = require('../../Loggers/Emotes/emoteUpdateLog');

const editEmoteCommand = (msg) => {
  try {
    if (
      !(
        (
          msg.member.roles.cache.has(
            '447512454810042369'
          ) /*Special Grade role*/ ||
          msg.member.roles.cache.has('447512449248395267') /*admin role*/ ||
          msg.member.roles.cache.has('665268720163225610')
        ) /*vengeful spirit role*/
      )
    )
      return;

    let temp1, temp2, toEdit;
    temp1 = msg.content.slice(1);
    temp1 = temp1.split(' ');
    if (!temp1[1]) {
      msg.channel
        .send(`Please provide the emote who's name is to be changed`)
        .catch(console.log);
      return;
    }
    if (!temp1[2]) {
      msg.channel
        .send(`Please provide the new name for the emote`)
        .catch(console.log);
      return;
    }
    temp2 = temp1[1].split(':')[1];
    toEdit = msg.guild.emojis.cache.find((emote) => emote.name === temp2);
    temp2 = { name: toEdit.name };
    if (!toEdit) {
      msg.channel.send('No such emote exists in the server').catch(console.log);
      return;
    }
    toEdit
      .edit({
        name: temp1[2],
      })
      .then((emote) =>
        msg.channel
          .send('Name changed')
          .then(() => emoteUpdateLog(null, temp2, emote, msg))
      )
      .catch(console.error);
  } catch (err) {
    console.log(err);
  }
};

module.exports = editEmoteCommand;
