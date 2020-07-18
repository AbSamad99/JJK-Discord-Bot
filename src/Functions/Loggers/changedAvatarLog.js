import { createEmbed } from '../Helpers/createEmbed.js';
import { checkIfGifOrPng } from '../Helpers/checkIfGifOrPng.js';

//logs avatar updates
export const changedAvatarLog = async (newMem, user) => {
  try {
    let modChannel,
      changedAvatarEmbed,
      authorName,
      authorUrl,
      title,
      color,
      thumbnail,
      description,
      image;

    //selecting the logs channel
    modChannel = newMem.guild.channels.cache.find(
      (ch) => ch.name === 'syed-bot-practice'
    );

    //setting relevant fields
    authorName = newMem.user.tag;
    authorUrl = await checkIfGifOrPng(newMem.user);
    title = 'Avatar Changed';
    color = 3447003;
    image = await checkIfGifOrPng(null, user);
    description = `<@${newMem.user.id}> has updated their avatar from the one below to the one on the right`;
    thumbnail = authorUrl;

    console.log(authorUrl);
    console.log(image);

    //creating embed
    changedAvatarEmbed = createEmbed(
      authorName,
      authorUrl,
      title,
      color,
      null,
      null,
      thumbnail,
      description,
      image
    );

    //sending to the logs
    modChannel.send(changedAvatarEmbed).catch(console.log);
  } catch (err) {
    console.log(err);
  }
};
