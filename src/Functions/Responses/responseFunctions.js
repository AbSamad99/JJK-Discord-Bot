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

    papaWat = msg.guild.emojis.cache
      .array()
      .find((emote) => emote.name === 'JJKPapawat');

    responseArray = [
      'Weeb',
      `<:JJKPapawat:${papaWat.id}>`,
      'L',
      'Why are you like this',
      'I wish we still had the cringe role',
    ];

    index = Math.floor(Math.random() * responseArray.length);

    msg.channel.send(responseArray[index]).catch(console.log);
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

    papaWat = msg.guild.emojis.cache
      .array()
      .find((emote) => emote.name === 'JJKPapawat');

    responseArray = [
      'Cringe',
      'Kokokoko',
      'L',
      `<:JJKPapawat:${papaWat.id}>`,
      'nfufufu',
    ];

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

      msg.channel.send(responseArray[index]).catch(console.log);
    }
    if (temp === 'syed is best mod' || temp === 'syed best mod') {
      msg.channel.send('True').catch(console.log);
    }
  } catch (err) {
    console.log(err);
  }
};

const otherSeriesTalkResponse = (msg) => {
  try {
    let otherSeriesChannel, papaWat, chance;
    otherSeriesChannel = msg.guild.channels.cache
      .array()
      .find((ch) => ch.name === 'other-series');
    papaWat = msg.guild.emojis.cache
      .array()
      .find((emote) => emote.name === 'JJKPapaGameOver');
    chance = Math.random() * 100;
    if (chance > 30) {
      msg.channel
        .send(
          `Please go to <#${otherSeriesChannel.id}> <:JJKPapaGameOver:${papaWat.id}>`
        )
        .catch(console.log);
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

    msg.channel.send(responseArray[index]).catch(console.log);
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
