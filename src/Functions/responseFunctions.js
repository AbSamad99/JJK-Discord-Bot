// export const weebResponse = (msg) => {
//   let chance = Math.random() * 100;
//   if (chance < 33) {
//     msg.channel.send('Weeb');
//   }
//   if (chance > 33 && chance < 66) {
//     msg.channel.send('Stop that weebanese');
//   }
//   if (chance > 66) {
//     msg.channel.send('We need a Mega-Weeb role');
//   }
// };

// export const nfufuResponse = (msg) => {
//   let chance = Math.random() * 100;
//   if (chance < 33) {
//     msg.channel.send('Cringe');
//   }
//   if (chance > 33 && chance < 66) {
//     msg.channel.send('Please stop saying that, its cringe af');
//   }
//   if (chance > 66) {
//     msg.channel.send('I wish we still had the cringe role');
//   }
// };

import { emoteArray, channelArray } from '../utilities.js';

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
