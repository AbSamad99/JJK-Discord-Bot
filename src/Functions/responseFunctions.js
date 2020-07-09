export const weebResponse = (msg) => {
  let chance = Math.random() * 100;
  if (chance < 33) {
    msg.channel.send('Weeb');
  }
  if (chance > 33 && chance < 66) {
    msg.channel.send('Stop that weebanese');
  }
  if (chance > 66) {
    msg.channel.send('We need a Mega-Weeb role');
  }
};

export const nfufuResponse = (msg) => {
  let chance = Math.random() * 100;
  if (chance < 33) {
    msg.channel.send('Cringe');
  }
  if (chance > 33 && chance < 66) {
    msg.channel.send('Please stop saying that, its cringe af');
  }
  if (chance > 66) {
    msg.channel.send('I wish we still had the cringe role');
  }
};

export const bestModResponse = (msg) => {
  if (msg.content.toLowerCase() === 'best mod?') {
    let chance = Math.random() * 100;
    if (chance < 20) {
      msg.channel.send('Syed');
    }
    if (chance > 20 && chance < 40) {
      msg.channel.send('Kenny');
    }
    if (chance > 40 && chance < 60) {
      msg.channel.send('Ao');
    }
    if (chance > 60 && chance < 80) {
      msg.channel.send('Anco');
    }
    if (chance > 80) {
      msg.channel.send('Shinya');
    }
  }
  if (
    msg.content.toLowerCase() === 'syed is best mod' ||
    msg.content.toLowerCase() === 'syed best mod'
  ) {
    msg.channel.send('True');
  }
};

export const otherSeriesTalkResponse = (msg) => {
  let otherSeriesChannel = msg.guild.channels.cache.find(
    (ch) => ch.name === 'other-series'
  );
  let chance = Math.random() * 100;
  if (chance > 30) {
    msg.channel.send(`Go to <#${otherSeriesChannel.id}>`);
  }
};

export const xSeriesSucksResponse = (msg) => {
  let chance = Math.random() * 100;
  if (chance < 25) {
    msg.channel.send('Facts bro');
  }
  if (chance > 25 && chance < 50) {
    msg.channel.send('You said it bro');
  }
  if (chance > 50 && chance < 75) {
    msg.channel.send('This dude spitting');
  }
  if (chance > 75) {
    msg.channel.send('I agree <:100:730318095821963357>');
  }
};
