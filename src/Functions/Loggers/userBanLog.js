import { createEmbed } from '../Helpers/createEmbed.js';
import { checkIfGifOrPng } from '../Helpers/checkIfGifOrPng.js';

//logs when user is banned from the server
export const userBanLog = async (
  banAuditLog,
  msg,
  modChannel,
  toBan,
  reason
) => {
  try {
    let banEmbed,
      authorName,
      authorUrl,
      title,
      color,
      field1,
      thumbnail,
      description;

    //setting relevant fields
    title = 'Member Banned';
    color = 3447003;
    field1 = { title: 'Reason:', content: '' };

    if (!msg) {
      authorName = banAuditLog.executor.tag;
      authorUrl = await checkIfGifOrPng(banAuditLog.executor);
      thumbnail = await checkIfGifOrPng(banAuditLog.target);
      description = `<@${banAuditLog.target.id}> has been Banned from the server.`;
      field1.content = banAuditLog.reason;
      if (!field1.content) field1.content = 'No Reason was provided';
    } else {
      authorName = msg.author.tag;
      authorUrl = await checkIfGifOrPng(msg.author);
      thumbnail = await checkIfGifOrPng(toBan.user);
      description = `<@${toBan.user.id}> has been Banned from the server.`;
      field1.content = reason;
    }

    //creating the embed
    banEmbed = createEmbed(
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
    modChannel.send(banEmbed).catch(console.log);
  } catch (err) {
    console.log(err);
  }
};
