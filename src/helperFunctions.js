import { reaction_numbers } from './utilities';

export const containsForbiddenLink = (msg) => {
  if (msg.content.toLowerCase().includes('pornhub.com' || 'nhentai.net')) {
    return true;
  } else return false;
};

export const containsDiscordLink = (msg) => {
  if (
    msg.content
      .toLowerCase()
      .includes('discord.gg/' || 'discordapp.com/invite/')
  ) {
    return true;
  } else return false;
};

export const pollAnnouncement = (msg) => {
  let temp = msg.content.slice(1);
  temp = temp.split(' ');
  let pollNumber = Number(temp[1]);
  let replyMessage = `<:globe_with_meridians:729386644259471390> Chapter ${pollNumber} rating. <:globe_with_meridians:729386644259471390>
      
\:five: Great
\:four: Good
\:three: Okay 
\:two: Bad
\:one: Awful`;
  console.log(temp[1]);
  if (pollNumber) {
    msg.channel.send(replyMessage).then((msg) => {
      msg.react(reaction_numbers[5]);
      msg.react(reaction_numbers[4]);
      msg.react(reaction_numbers[3]);
      msg.react(reaction_numbers[2]);
      msg.react(reaction_numbers[1]);
    });
  }
};

export const chapterAnnouncement = (msg) => {
  let mangaNewsRoleId = msg.guild.roles.cache.find(
    (role) => role.name === 'Manga-News'
  );
  let temp = msg.content.slice(1);
  temp = temp.split(' ');
  let chapterNumber = temp[1];
  let vizLink = temp[2];
  let mpLink = temp[3];
  let replyMessage = `<@&${mangaNewsRoleId.id}> Chapter ${chapterNumber} is out!

Viz: ${vizLink}
    
Manga Plus: ${mpLink}`;
  if (temp[1] || temp[2] || temp[3]) {
    msg.channel.send(replyMessage);
  }
};

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
    msg.channel.send('Syed');
  }
  if (msg.content.toLowerCase() === 'syed is best mod') {
    msg.channel.send('True');
  }
};

export const weebCheck = (msg) => {
  if (
    msg.content.toLowerCase().includes('desu') ||
    msg.content.toLowerCase().includes('sore wa') ||
    msg.content.toLowerCase().includes('sore de wa') ||
    msg.content.toLowerCase().includes('shikashi') ||
    msg.content.toLowerCase().includes('omoshiroi') ||
    msg.content.toLowerCase().includes('bakadomo') ||
    msg.content.toLowerCase().includes('omaye') ||
    msg.content.toLowerCase().includes('naruhodo') ||
    msg.content.toLowerCase().includes('webtoonsu') ||
    msg.content.toLowerCase().includes('ningendomo')
  ) {
    return 1;
  } else return 0;
};

export const otherSeriesTalkCheck = (msg) => {
  let otherSeriesChannel = msg.guild.channels.cache.find(
    (ch) => ch.name === 'other-series'
  );
  if (
    msg.channel.id !== otherSeriesChannel.id &&
    (msg.content.toLowerCase().includes('fate') ||
      msg.content.toLowerCase().includes('nasu') ||
      msg.content.toLowerCase().includes('d gray man') ||
      msg.content.toLowerCase().includes('D. Gray-man'))
  ) {
    return 1;
  } else return 0;
};

export const xSeriesSucksCheck = (msg) => {
  if (
    msg.content.toLowerCase() === 'fate sucks' ||
    msg.content.toLowerCase() === 'd gray man sucks' ||
    msg.content.toLowerCase() === 'kubera sucks'
  ) {
    return 1;
  } else return 0;
};

export const isSuggestion = (msg) => {
  let suggestionsChannel = msg.guild.channels.cache.find(
    (ch) => ch.name === 'server-suggestions'
  );
  if (msg.channel.id === suggestionsChannel.id) {
    return 1;
  } else return 0;
};
