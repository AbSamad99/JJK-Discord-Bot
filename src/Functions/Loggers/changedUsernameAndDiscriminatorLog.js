import { createEmbed } from '../Helpers/createEmbed.js';
import { checkIfGifOrPng } from '../Helpers/checkIfGifOrPng.js';

//logs username changes
export const changedUsernameAndDiscriminatorLog = async (
  newMem,
  user,
  type
) => {
  try {
    let modChannel,
      changedUsernameEmbed,
      authorName,
      authorUrl,
      title,
      color,
      field1,
      field2,
      description;

    //selecting logs channel
    modChannel = newMem.guild.channels.cache.find(
      (ch) => ch.name === 'syed-bot-practice'
    );

    //setting relevant fields
    authorName = newMem.user.tag;
    authorUrl = await checkIfGifOrPng(newMem.user);
    color = 3447003;
    field1 = { title: 'Before:', content: '' };
    field2 = { title: 'After', content: '' };

    //deciding between Username and discriminator logs
    if (type === 'username') {
      title = 'Username Changed';
      description = `<@${newMem.user.id}> has changed their userame`;
      field1.content = user.name;
      field2.content = newMem.user.username;
    } else if (type === 'discriminator') {
      title = 'Discriminator Changed';
      description = `<@${newMem.user.id}> has changed their discriminator`;
      field1.content = user.discriminator;
      field2.content = newMem.user.discriminator;
    }

    //creating the embed
    changedUsernameEmbed = createEmbed(
      authorName,
      authorUrl,
      title,
      color,
      field1,
      field2,
      null,
      description
    );

    //sending to logs channel
    modChannel.send(changedUsernameEmbed).catch(console.log);
  } catch (err) {
    console.log(err);
  }
};
