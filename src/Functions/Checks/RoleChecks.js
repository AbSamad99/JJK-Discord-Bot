const fs = require('fs');

const modPermsCheck = (msg) => {
  const rolesArray = JSON.parse(
    fs.readFileSync(`${process.cwd()}/src/Json-Files/roles.json`)
  );
  let temp = msg.member.roles.cache;
  let modRole1 = rolesArray.find(
    (role) => role.name === 'Special-Grade Shaman'
  );
  let modRole2 = rolesArray.find((role) => role.name === 'admin');
  if (temp.has(modRole1.id) || temp.has(modRole2.id)) {
    return 1;
  } else return 0;
};

const communityRoleCheck = (msg) => {
  const rolesArray = JSON.parse(
    fs.readFileSync(`${process.cwd()}/src/Json-Files/roles.json`)
  );
  let temp = msg.member.roles.cache;
  let communityRole = rolesArray.find(
    (role) => role.name === 'Community Service Shaman'
  );
  if (temp.has(communityRole.id)) {
    return 1;
  } else return 0;
};

const hasRoleCheck = (msg, role) => {
  if (msg.member.roles.cache.has(role.id)) {
    return 1;
  } else return 0;
};

const lockedRolesCheck = (role) => {
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

const canBeBannedOrKicked = (mem) => {
  const rolesArray = JSON.parse(
    fs.readFileSync(`${process.cwd()}/src/Json-Files/roles.json`)
  );
  let modRole1, modRole2, temp;
  modRole1 = rolesArray.find((role) => role.name === 'Special-Grade Shaman');
  modRole2 = rolesArray.find((role) => role.name === 'admin');
  temp = mem.roles.cache;
  if (temp.has(modRole1.id) || temp.has(modRole2.id)) {
    return 0;
  } else return 1;
};

module.exports = {
  modPermsCheck: modPermsCheck,
  communityRoleCheck: communityRoleCheck,
  hasRoleCheck: hasRoleCheck,
  lockedRolesCheck: lockedRolesCheck,
  canBeBannedOrKicked: canBeBannedOrKicked,
};
