const Discord = require('discord.js');

import { createEmbed } from '../Helpers/createEmbed.js';
import { checkIfGifOrPng } from '../Helpers/checkIfGifOrPng.js';

//logs nickname addition, change and removal
export const changedNicknameLog = async (
  newMem,
  oldNick,
  newNick,
  type,
  mod
) => {
  try {
    let changedNicknameEmbed,
      authorName,
      authorUrl,
      title,
      color,
      field1,
      field2,
      thumbnail;

    //selcting the log channel
    let modChannel = newMem.guild.channels.cache.find(
      (ch) => ch.name === 'syed-bot-practice'
    );

    //setting necessary fields
    color = 3447003;
    field1 = { title: 'Before:', content: '' };
    field2 = { title: 'After:', content: '' };

    //seeing if user edited nickname or a mod
    if (!mod) {
      authorName = newMem.user.tag;
      authorUrl = await checkIfGifOrPng(newMem.user);
    } else {
      authorName = mod.tag;
      authorUrl = await checkIfGifOrPng(mod);
    }

    thumbnail = authorUrl;
    console.log(authorUrl);

    //determining type of nickname edit
    if (type === 'add') {
      title = `Nickname added for ${newMem.user.tag}`;
      field1.content = newMem.user.username;
      field2.content = newNick;
    } else if (type === 'remove') {
      title = `Nickname removed for ${newMem.user.tag}`;
      field1.content = oldNick;
      field2.content = newMem.user.username;
    } else if (type === 'edit') {
      title = `Nickname changed for ${newMem.user.tag}`;
      field1.content = oldNick;
      field2.content = newNick;
    }

    //creating the embed
    changedNicknameEmbed = createEmbed(
      authorName,
      authorUrl,
      title,
      color,
      field1,
      field2,
      thumbnail
    );

    //sending the messages
    modChannel.send(changedNicknameEmbed).catch(console.log);
  } catch (err) {
    console.log(err);
  }
};
