import {
  chapterAnnouncement,
  pollAnnouncement,
  fujoCommand,
  todoCommand,
  welcomeCommand,
  anonMessageCommand,
  dontCareCommand,
  shyCommand,
  catalogueCommand,
  chartCommand,
  encyclopediaCommand,
} from './Functions/commandFunctions';

import { modPermsCheck } from './Functions/checkFunctions.js';

export const prefixCommandFunction = (msg) => {
  let temp = msg.content.toLowerCase();
  temp = temp.slice(1);
  if (temp.startsWith('poll') && modPermsCheck(msg)) {
    pollAnnouncement(msg);
  } else if (temp.startsWith('chapter') && modPermsCheck(msg)) {
    chapterAnnouncement(msg);
  } else if (temp.startsWith('message') && modPermsCheck(msg)) {
    anonMessageCommand(msg);
  } else if (temp.startsWith('fujo')) {
    fujoCommand(msg);
  } else if (temp.startsWith('todo')) {
    todoCommand(msg);
  } else if (temp.startsWith('welcome')) {
    welcomeCommand(msg);
  } else if (temp.startsWith('guy')) {
    dontCareCommand(msg);
  } else if (temp.startsWith('shy')) {
    shyCommand(msg);
  } else if (temp.startsWith('encyclopedia')) {
    encyclopediaCommand(msg);
  } else if (temp.startsWith('chart')) {
    chartCommand(msg);
  } else if (temp.startsWith('catalogue')) {
    catalogueCommand(msg);
  }
};
