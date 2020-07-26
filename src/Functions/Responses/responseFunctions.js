const fs = require('fs');

const { channelCheck } = require('../Checks/helperChecks');

const UserSchema = require('../../Schemas/UserSchema');

const weebResponse = (msg) => {
  try {
    let papaWat = msg.guild.emojis.cache
      .array()
      .find((emote) => emote.name === 'JJKPapawat');
    if (
      !channelCheck(msg, 'memes-and-shitposting') &&
      !channelCheck(msg, 'general') &&
      !channelCheck(msg, 'syed-bot-practice')
    )
      return;
    let chance = Math.random() * 100;
    if (chance < 20) {
      msg.channel.send('Weeb');
    }
    if (chance > 20 && chance < 40) {
      msg.channel.send(`<:JJKPapawat:${papaWat.id}>`);
    }
    if (chance > 40 && chance < 60) {
      msg.channel.send('L');
    }
    if (chance > 60 && chance < 80) {
      msg.channel.send('Why are you like this');
    }
    if (chance > 80) {
      msg.channel.send('I wish we still had the cringe role');
    }
  } catch (err) {
    console.log(err);
  }
};

const nfufuResponse = async (msg) => {
  try {
    let honoredOne = await UserSchema.findOne({ id: 730109162616389644 });
    if (honoredOne.id === msg.author.id) return;
    let papaWat = msg.guild.emojis.cache
      .array()
      .find((emote) => emote.name === 'JJKPapawat');
    if (
      !channelCheck(msg, 'general') &&
      !channelCheck(msg, 'memes-and-shitposting') &&
      !channelCheck(msg, 'syed-bot-practice')
    )
      return;
    let chance = Math.random() * 100;
    if (chance < 20) {
      msg.channel.send('Cringe');
    }
    if (chance > 20 && chance < 40) {
      msg.channel.send('Kokokoko');
    }
    if (chance > 40 && chance < 60) {
      msg.channel.send('L');
    }
    if (chance > 60 && chance < 80) {
      msg.channel.send(`<:JJKPapawat:${papaWat.id}>`);
    }
    if (chance > 80) {
      msg.channel.send('nfufufu');
    }
  } catch (err) {
    console.log(err);
  }
};

const bestModResponse = (msg, temp) => {
  try {
    if (temp === 'best mod?') {
      let chance = Math.random() * 100;
      if (chance < 20) {
        msg.channel.send('Syed').catch(console.log);
      }
      if (chance > 20 && chance < 40) {
        msg.channel.send('Kenny').catch(console.log);
      }
      if (chance > 40 && chance < 60) {
        msg.channel.send('Ao').catch(console.log);
      }
      if (chance > 60 && chance < 80) {
        msg.channel.send('Anco').catch(console.log);
      }
      if (chance > 80) {
        msg.channel.send('Shinya').catch(console.log);
      }
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
    let otherSeriesChannel = msg.guild.channels.cache
      .array()
      .find((ch) => ch.name === 'other-series');
    let papaEmote = msg.guild.emojis.cache
      .array()
      .find((emote) => emote.name === 'JJKPapaGameOver');
    let chance = Math.random() * 100;
    if (chance > 30) {
      msg.channel
        .send(
          `Please go to <#${otherSeriesChannel.id}> <:JJKPapaGameOver:${papaEmote.id}>`
        )
        .catch(console.log);
    }
  } catch (err) {
    console.log(err);
  }
};

const xSeriesSucksResponse = (msg) => {
  try {
    let chance = Math.random() * 100;
    if (chance < 25) {
      msg.channel.send('Facts bro').catch(console.log);
    }
    if (chance > 25 && chance < 50) {
      msg.channel.send('You said it bro').catch(console.log);
    }
    if (chance > 50 && chance < 75) {
      msg.channel.send('This dude spitting').catch(console.log);
    }
    if (chance > 75 && chance < 95) {
      msg.channel.send('I agree <:100:730318095821963357>').catch(console.log);
    }
    if (chance > 95) {
      msg.channel.send('Nah').catch(console.log);
    }
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
