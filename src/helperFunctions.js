import {
  chapterAnnouncement,
  pollAnnouncement,
  fujoCommand,
  todoCommand,
  welcomeCommand,
  anonMessageCommand,
  dontCareCommand,
  shyCommand,
} from './Functions/commandFunctions';

import { modPermsCheck } from './Functions/checkFunctions.js';

export const prefixCommandFunction = (msg) => {
  if (msg.content.toLowerCase().includes('poll') && modPermsCheck(msg)) {
    pollAnnouncement(msg);
  } else if (
    msg.content.toLowerCase().includes('chapter') &&
    modPermsCheck(msg)
  ) {
    chapterAnnouncement(msg);
  } else if (msg.content.toLowerCase().includes('fujo')) {
    fujoCommand(msg);
  } else if (msg.content.toLowerCase().includes('todo')) {
    todoCommand(msg);
  } else if (msg.content.toLowerCase().includes('welcome')) {
    welcomeCommand(msg);
  } else if (msg.content.toLowerCase().includes('guy')) {
    dontCareCommand(msg);
  } else if (msg.content.toLowerCase().includes('shy')) {
    shyCommand(msg);
  } else if (
    msg.content.toLowerCase().includes('message') &&
    modPermsCheck(msg)
  ) {
    anonMessageCommand(msg);
  }
};
