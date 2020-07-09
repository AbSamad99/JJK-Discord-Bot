import {
  chapterAnnouncement,
  pollAnnouncement,
} from './Functions/commandFunctions';

export const prefixCommandFunction = (msg) => {
  let modRole1 = msg.guild.roles.cache.find(
    (role) => role.name === 'Special-Grade-Shaman'
  );
  let modRole2 = msg.guild.roles.cache.find((role) => role.name === 'admin');
  if (
    msg.content.toLowerCase().includes('poll') &&
    (msg.member.roles.cache.has(modRole1.id) ||
      msg.member.roles.cache.has(modRole2.id))
  ) {
    pollAnnouncement(msg);
  } else if (
    msg.content.toLowerCase().includes('chapter') &&
    (msg.member.roles.cache.has(modRole1.id) ||
      msg.member.roles.cache.has(modRole2.id))
  ) {
    chapterAnnouncement(msg);
  }
};
