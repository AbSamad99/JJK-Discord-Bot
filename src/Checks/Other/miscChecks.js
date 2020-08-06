/*Various misc checks*/

const { channelCheck, roleCheck } = require('./helperChecks.js');

const weebCheck = (msg, temp) => {
  try {
    if (!msg.member || roleCheck(msg.member, 'The Honored One')) return 0;
    if (
      temp.includes('desu') ||
      temp.includes('sore wa') ||
      temp.includes('sore de wa') ||
      temp.includes('shikashi') ||
      temp.includes('omoshiroi') ||
      temp.includes('bakadomo') ||
      temp.includes('omaye') ||
      temp.includes('naruhodo') ||
      temp.includes('webtoonsu') ||
      temp.includes('ningendomo') ||
      temp.includes('zasshu') ||
      temp.includes('subarashi')
    ) {
      return 1;
    } else return 0;
  } catch (err) {
    console.log(err);
  }
};

const otherSeriesTalkCheck = (msg, temp) => {
  try {
    if (
      !channelCheck(msg, 'other-series') &&
      (temp.includes('fate') ||
        temp.includes('nasu') ||
        temp.includes('d gray man') ||
        temp.includes('d. gray-man') ||
        temp.includes('d-gray man') ||
        temp.includes('dgm') ||
        temp.includes('kubera'))
    ) {
      return 1;
    } else return 0;
  } catch (err) {
    console.log(err);
  }
};

const xSeriesSucksCheck = (temp) => {
  try {
    if (
      temp === 'fate sucks' ||
      temp === 'd gray man sucks' ||
      temp === 'kubera sucks' ||
      temp === 'dgm sucks' ||
      temp === 'd. gray-man sucks' ||
      temp === 'pandora hearts sucks'
    ) {
      return 1;
    } else return 0;
  } catch (err) {
    console.log(err);
  }
};

const lockedRolesCheck = (roleName) => {
  try {
    if (
      roleName === 'admin' ||
      roleName === 'Dyno' ||
      roleName === 'Tatsumaki' ||
      roleName === 'MEE6' ||
      roleName === 'Redditcord' ||
      roleName === 'MafiaBot' ||
      roleName === '----------------------' ||
      roleName === 'Special-Grade Shaman' ||
      roleName === 'henry' ||
      roleName === `Tokyo's Subreddit Manager` ||
      roleName === `Kyoto's Wiki Manager` ||
      roleName === 'The Honored One' ||
      roleName === 'Bot' ||
      roleName === 'Carl-bot' ||
      roleName === '----------------------' ||
      roleName === 'Vengeful Spirit' ||
      roleName === 'VIZ Translator' ||
      roleName === 'Supreme-Grade 1 Shaman' ||
      roleName === '1st-Grade Shaman' ||
      roleName === '2nd-Grade Shaman' ||
      roleName === '3rd-Grade Shaman' ||
      roleName === '4th-Grade Shaman' ||
      roleName === '----------------------' ||
      roleName === `Mechamaru's Doll` ||
      roleName === 'Community Service Shaman' ||
      roleName === 'King of Toji Goons' ||
      roleName === '----------------------' ||
      roleName === `👻🖖` ||
      roleName === `Manga News` ||
      roleName === `Leaks News` ||
      roleName === `Anime News` ||
      roleName === `Server Events` ||
      roleName === `Leaks Reader` ||
      roleName === `Manga Reader` ||
      roleName === `Anime Viewer` ||
      roleName === `Debater` ||
      roleName === `DJ` ||
      roleName === `The Mob` ||
      roleName === `Muted` ||
      roleName === `Pokecord` ||
      roleName === `"Mod"`
    ) {
      return 1;
    } else return 0;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  weebCheck: weebCheck,
  otherSeriesTalkCheck: otherSeriesTalkCheck,
  xSeriesSucksCheck: xSeriesSucksCheck,
  lockedRolesCheck: lockedRolesCheck,
};
