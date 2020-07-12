import { emoteArray, channelArray, userArray } from '../utilities.js';

export const weebResponse = (msg) => {
  let testChannel = channelArray.find((ch) => ch.name === 'syed-bot-practice');
  let papaWat = emoteArray.find((emote) => emote.name === 'JJKPapawat');
  let generalChannel = channelArray.find((ch) => ch.name === 'general');
  let memesChannel = channelArray.find(
    (ch) => ch.name === 'memes-and-shitposting'
  );
  if (
    msg.channel.id !== generalChannel.id &&
    msg.channel.id !== memesChannel.id &&
    msg.channel.id !== testChannel.id
  )
    return;
  let chance = Math.random() * 100;
  if (chance < 20) {
    msg.channel.send('Weeb');
  }
  if (chance > 20 && chance < 40) {
    msg.channel.send(`<:JJKPapawat${papaWat.id}:`);
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
};

export const nfufuResponse = (msg) => {
  let honoredOne = userArray.find((user) => user.name === 'The Honored One');
  if (honoredOne.id === msg.author.id) return;
  let testChannel = channelArray.find((ch) => ch.name === 'syed-bot-practice');
  let papaWat = emoteArray.find((emote) => emote.name === 'JJKPapawat');
  let generalChannel = channelArray.find((ch) => ch.name === 'general');
  let memesChannel = channelArray.find(
    (ch) => ch.name === 'memes-and-shitposting'
  );
  if (
    msg.channel.id !== generalChannel.id &&
    msg.channel.id !== memesChannel.id &&
    msg.channel.id !== testChannel.id
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
};

export const bestModResponse = (msg) => {
  let temp = msg.content.toLowerCase();
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
};

export const otherSeriesTalkResponse = (msg) => {
  let otherSeriesChannel = channelArray.find(
    (ch) => ch.name === 'other-series'
  );
  let papaEmote = emoteArray.find((emote) => emote.name === 'JJKPapaGameOver');
  let chance = Math.random() * 100;
  if (chance > 30) {
    msg.channel
      .send(
        `Please go to <#${otherSeriesChannel.id}> <:JJKPapaGameOver:${papaEmote.id}>`
      )
      .catch(console.log);
  }
};

export const xSeriesSucksResponse = (msg) => {
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
};
