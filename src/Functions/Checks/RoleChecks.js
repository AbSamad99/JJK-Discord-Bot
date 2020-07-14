import { rolesArray } from '../../utilities.js';

export const modPermsCheck = (msg) => {
  let temp = msg.member.roles.cache;
  let modRole1 = rolesArray.find(
    (role) => role.name === 'Special-Grade Shaman'
  );
  let modRole2 = rolesArray.find((role) => role.name === 'admin');
  if (temp.has(modRole1.id) || temp.has(modRole2.id)) {
    return 1;
  } else return 0;
};

export const hasRoleCheck = (msg, role) => {
  if (msg.member.roles.cache.has(role.id)) {
    return 1;
  } else return 0;
};

export const lockedRolesCheck = (role) => {
  if (
    role.name === 'admin' ||
    role.name === 'Dyno' ||
    role.name === 'Tatsumaki' ||
    role.name === 'MEE6' ||
    role.name === 'Redditcord' ||
    role.name === 'MafiaBot' ||
    role.name === '----------------------' ||
    role.name === 'Special-Grade Shaman' ||
    role.name === 'henry' ||
    role.name === `Tokyo's Subreddit Manager` ||
    role.name === `Kyoto's Wiki Manager` ||
    role.name === 'The Honored One' ||
    role.name === 'Bot' ||
    role.name === 'Carl-bot' ||
    role.name === '----------------------' ||
    role.name === 'Vengeful Spirit' ||
    role.name === 'VIZ Translator' ||
    role.name === 'Nitro-Booster-Grade Shaman' ||
    role.name === '1st-Grade Shaman' ||
    role.name === '2nd-Grade Shaman' ||
    role.name === '3rd-Grade Shaman' ||
    role.name === '4th-Grade Shaman' ||
    role.name === '----------------------' ||
    role.name === `Mechamaru's Doll` ||
    role.name === 'Community Service Shaman' ||
    role.name === 'King of Toji Goons' ||
    role.name === '----------------------' ||
    role.name === `👻🖖` ||
    role.name === `Manga News` ||
    role.name === `Leaks News` ||
    role.name === `Anime News` ||
    role.name === `Server Events` ||
    role.name === `Leaks Reader` ||
    role.name === `Manga Reader` ||
    role.name === `Anime Viewer` ||
    role.name === `Debater` ||
    role.name === `DJ` ||
    role.name === `The Mob` ||
    role.name === `Muted` ||
    role.name === `Pokecord` ||
    role.name === `"Mod"`
  ) {
    return 1;
  } else return 0;
};
