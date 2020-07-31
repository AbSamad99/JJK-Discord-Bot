const { channelCheck } = require('../Checks/helperChecks');

const UserSchema = require('../../Schemas/UserSchema');

const weebResponse = (msg) => {
  try {
    if (
      !channelCheck(msg, 'memes-and-shitposting') &&
      !channelCheck(msg, 'general') &&
      !channelCheck(msg, 'syed-bot-practice')
    )
      return;

    let responseArray, papaWat, index;

    papaWat = msg.guild.emojis.cache.find(
      (emote) => emote.name === 'JJKPapawat'
    );

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

const nfufuResponse = async (msg) => {
  try {
    if (
      !channelCheck(msg, 'general') &&
      !channelCheck(msg, 'memes-and-shitposting') &&
      !channelCheck(msg, 'syed-bot-practice')
    )
      return;

    let honoredOne, papaWat, index, responseArray;

    honoredOne = await UserSchema.findOne({ id: '730109162616389644' });
    if (honoredOne.id === msg.author.id) return;

    papaWat = msg.guild.emojis.cache.find(
      (emote) => emote.name === 'JJKPapawat'
    );

    responseArray = ['Cringe', 'Kokokoko', 'L', `${papaWat}`, 'nfufufu'];

    index = Math.floor(Math.random() * responseArray.length);

    msg.channel.send(responseArray[index]);
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

const otherSeriesTalkResponse = (msg) => {
  try {
    let otherSeriesChannel, papaGameOver, chance;
    otherSeriesChannel = msg.guild.channels.cache.find(
      (ch) => ch.name === 'other-series'
    );
    papaGameOver = msg.guild.emojis.cache.find(
      (emote) => emote.name === 'JJKPapaGameOver'
    );
    chance = Math.random() * 100;
    if (chance > 30) {
      msg.channel
        .send(`Please go to <#${otherSeriesChannel.id}> ${papaGameOver}`)
        .catch(console.error);
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
  otherSeriesTalkResponse: otherSeriesTalkResponse,
  xSeriesSucksResponse: xSeriesSucksResponse,
};
