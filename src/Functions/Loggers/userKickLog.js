import { createEmbed } from '../Helpers/createEmbed.js';
import { checkIfGifOrPng } from '../Helpers/checkIfGifOrPng.js';

//logs when user is kicked from the server
export const userKickLog = async (
  kickAuditLog,
  msg,
  modChannel,
  toKick,
  reason
) => {
  try {
    let kickEmbed,
      authorName,
      authorUrl,
      title,
      color,
      field1,
      thumbnail,
      description;

    //setting relevant fields
    title = 'Member Kicked';
    color = 3447003;
    field1 = { title: 'Reason:', content: '' };

    if (!msg) {
      authorName = kickAuditLog.executor.tag;
      authorUrl = await checkIfGifOrPng(kickAuditLog.executor);
      thumbnail = await checkIfGifOrPng(kickAuditLog.target);
      description = `<@${kickAuditLog.target.id}> has been kicked from the server.`;
      field1.content = kickAuditLog.reason;
      if (!field1.content) field1.content = 'No Reason was provided';
    } else {
      authorName = msg.author.tag;
      authorUrl = await checkIfGifOrPng(msg.author);
      thumbnail = await checkIfGifOrPng(toKick.user);
      description = `<@${toKick.user.id}> has been kicked from the server.`;
      field1.content = reason;
    }

    //creating the embed
    kickEmbed = createEmbed(
      authorName,
      authorUrl,
      title,
      color,
      field1,
      null,
      thumbnail,
      description
    );

    //logging
    modChannel.send(kickEmbed).catch(console.log);
  } catch (err) {
    console.log(err);
  }
};
