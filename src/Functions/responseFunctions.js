const weebResponse = (msg) => {
  try {
    if (
      !(msg.channel.id === '447410298845003777') /*generalchannel*/ &&
      !(msg.channel.id === '458840286966185984') /*memes channel*/ &&
      !(msg.channel.id === '720958791432011789') /*Syed bot channel*/
    )
      return;

    let responseArray, papaWat, index;

    papaWat = msg.guild.emojis.cache.get('665376679967064109');

    responseArray = [
      'Weeb',
      `${papaWat}`,
      'L',
      'Why are you like this',
      'I wish we still had the cringe role',
    ];

    index = Math.floor(Math.random() * responseArray.length);

    msg.channel.send(responseArray[index]).catch(console.error);
  } catch (err) {
    console.log(err);
  }
};

const nfufuResponse = (msg) => {
  try {
    if (
      !(msg.channel.id === '447410298845003777') /*generalchannel*/ &&
      !(msg.channel.id === '458840286966185984') /*memes channel*/ &&
      !(msg.channel.id === '720958791432011789') /*Syed bot channel*/
    )
      return;

    let honoredOne, papaWat, index, responseArray;

    honoredOne = msg.guild.members.cache.get('730109162616389644');
    if (honoredOne.id === msg.author.id) return;

    papaWat = msg.guild.emojis.cache.get('665376679967064109');

    responseArray = ['Cringe', 'Kokokoko', 'L', `${papaWat}`, 'nfufufu'];

    index = Math.floor(Math.random() * responseArray.length);

    msg.channel.send(responseArray[index]).catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

const bestModResponse = (msg, temp) => {
  try {
    if (temp === 'best mod?') {
      let responseArray, index;

      responseArray = ['Syed', 'Kenny', 'Ao', 'Anco', 'Shinya'];

      index = Math.floor(Math.random() * responseArray.length);

      msg.channel.send(responseArray[index]).catch(console.error);
    }
    if (temp === 'syed is best mod' || temp === 'syed best mod') {
      msg.channel.send('True').catch(console.error);
    }
  } catch (err) {
    console.log(err);
  }
};

const xSeriesSucksResponse = (msg) => {
  try {
    let responseArray, index;

    responseArray = [
      'Facts bro',
      'You said it bro',
      'This dude spitting',
      'I agree <:100:730318095821963357>',
    ];

    index = Math.floor(Math.random() * responseArray.length);

    msg.channel.send(responseArray[index]).catch(console.error);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  weebResponse: weebResponse,
  nfufuResponse: nfufuResponse,
  bestModResponse: bestModResponse,
  xSeriesSucksResponse: xSeriesSucksResponse,
};
