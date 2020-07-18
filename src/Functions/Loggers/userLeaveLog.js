import { createEmbed } from '../Helpers/createEmbed.js';
import { checkIfGifOrPng } from '../Helpers/checkIfGifOrPng.js';

export const userLeaveLog = async (mem, modChannel) => {
  try {
    let leaveEmbed, authorName, authorUrl, title, color, description;

    //setting relevant fields
    authorName = mem.user.tag;
    authorUrl = await checkIfGifOrPng(mem.user);
    title = 'Member Left';
    color = 3447003;
    description = `<@${mem.user.id}> has left the server`;

    //creating the embed
    leaveEmbed = createEmbed(
      authorName,
      authorUrl,
      title,
      color,
      null,
      null,
      null,
      description
    );

    modChannel.send(leaveEmbed).catch(console.logy);
  } catch (err) {
    console.log(err);
  }
};
