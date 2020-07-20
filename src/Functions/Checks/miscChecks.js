const fs = require('fs');

const weebCheck = (msg) => {
  const rolesArray = JSON.parse(
    fs.readFileSync(`${process.cwd()}/src/Json-Files/roles.json`)
  );

  let honoredOneRole = rolesArray.find(
    (role) => role.name === 'The Honored One'
  );
  if (honoredOneRole.id === msg.author.id) return 0;
  let temp = msg.content.toLowerCase();
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
};

const otherSeriesTalkCheck = (msg) => {
  const channelArray = JSON.parse(
    fs.readFileSync(`${process.cwd()}/src/Json-Files/channels.json`)
  );
  let temp = msg.content.toLowerCase();
  let otherSeriesChannel = channelArray.find(
    (ch) => ch.name === 'other-series'
  );
  if (!otherSeriesChannel) {
    return 0;
  }
  if (
    msg.channel.id !== otherSeriesChannel.id &&
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
};

const xSeriesSucksCheck = (msg) => {
  let temp = msg.content.toLowerCase();
  if (
    temp === 'fate sucks' ||
    temp === 'd gray man sucks' ||
    temp === 'kubera sucks' ||
    temp === 'dgm sucks' ||
    temp === 'd. gray-man sucks'
  ) {
    return 1;
  } else return 0;
};

module.exports = {
  weebCheck: weebCheck,
  otherSeriesTalkCheck: otherSeriesTalkCheck,
  xSeriesSucksCheck: xSeriesSucksCheck,
};
