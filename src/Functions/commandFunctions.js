import { reaction_numbers, channelArray, rolesArray } from '../utilities';
export const chapterAnnouncement = (msg) => {
  let mangaNewsRoleId = rolesArray.find((role) => role.name === 'Manga-News');
  let announcementChannel = msg.guild.channels.cache.find(
    (ch) => ch.name === 'announcements'
  );
  let temp = msg.content.slice(1);
  temp = temp.split(' ');
  let chapterNumber = temp[1];
  let vizLink = temp[2];
  let mpLink = temp[3];
  let replyMessage = `<@&${mangaNewsRoleId.id}> Chapter ${chapterNumber} is out!
  
  Viz: ${vizLink}
      
  Manga Plus: ${mpLink}`;
  if (temp[1] && temp[2] && temp[3]) {
    announcementChannel.send(replyMessage);
  }
};

export const pollAnnouncement = (msg) => {
  let announcementChannel = msg.guild.channels.cache.find(
    (ch) => ch.name === 'announcements'
  );
  let temp = msg.content.slice(1);
  temp = temp.split(' ');
  let pollNumber = Number(temp[1]);
  let replyMessage = `<:globe_with_meridians:729386644259471390> Chapter ${pollNumber} rating. <:globe_with_meridians:729386644259471390>
        
  \:five: Great
  \:four: Good
  \:three: Okay 
  \:two: Bad
  \:one: Awful`;
  if (pollNumber) {
    announcementChannel.send(replyMessage).then((msg) => {
      msg.react(reaction_numbers[5]);
      msg.react(reaction_numbers[4]);
      msg.react(reaction_numbers[3]);
      msg.react(reaction_numbers[2]);
      msg.react(reaction_numbers[1]);
    });
  }
};

export const fujoCommand = (msg) => {
  msg.channel.send('https://bit.ly/2ZoTsQ4');
};

export const todoCommand = (msg) => {
  let welcomeChannel = channelArray.find((ch) => ch.name === 'welcome');
  if (msg.channel.id === welcomeChannel.id) {
    msg.channel.send(
      'https://media.discordapp.net/attachments/447410298845003777/635705498624196608/K17.png'
    );
  }
};

export const welcomeCommand = (msg) => {
  let welcomeChannel = channelArray.find((ch) => ch.name === 'welcome');
  if (msg.channel.id === welcomeChannel.id) {
    let message = `Welcome newbie, we have three questions for you:
1. Are you up to date on the Jujutsu Kaisen manga?
2. Have you read the prequel?
3. Can Todo ask you a woke question?`;
    msg.channel.send(message);
  }
};

export const dontCareCommand = (msg) => {
  let welcomeChannel = channelArray.find((ch) => ch.name === 'welcome');
  if (msg.channel.id === welcomeChannel.id) {
    let message = `https://media.discordapp.net/attachments/447410298845003777/684664171174166538/20191130_235504.jpg?width=736&height=671`;
    msg.channel.send(message);
  }
};

export const shyCommand = (msg) => {
  let welcomeChannel = channelArray.find((ch) => ch.name === 'welcome');
  if (msg.channel.id === welcomeChannel.id) {
    let message = `https://cdn.discordapp.com/attachments/704934870622797904/731173904269312101/Screenshot_20200507-234318_MangaZone.jpg`;
    msg.channel.send(message);
  }
};

export const encyclopediaCommand = (msg) => {
  let message = `https://docs.google.com/document/d/1lPQvDk8o-jjJ_8qiIFkQmdB0GKAy4WeN_38_geoDsqw/edit?usp=sharing`;
  msg.channel.send(message);
};

export const catalogueCommand = (msg) => {
  let message = `https://docs.google.com/document/d/1LO6ZxqUlD3elokLhkjkoHqZGumdC3XQSHHysviKrBbA/edit?usp=sharing`;
  msg.channel.send(message);
};

export const chartCommand = (msg) => {
  let message = `https://docs.google.com/spreadsheets/d/1pyrdfwq-Qbj2eEJIsdD3nC9906n1KOYCNEpzn-8Wpx8/edit?usp=sharing`;
  msg.channel.send(message);
};

export const anonMessageCommand = (msg) => {
  let modBotChannel = msg.member.guild.channels.cache.find(
    (ch) => ch.name === 'mod-bots'
  );
  if (msg.channel.id === modBotChannel.id) {
    let temp = msg.content.slice(1);
    temp = temp.split(' ');
    let temp1 = temp.slice(2);
    let message = temp1.join(' ');
    let messageChannelId = temp[1].slice(2, temp[1].length - 1);
    // console.log(message, messageChannelId);
    let messageChannel = msg.member.guild.channels.cache.find(
      (ch) => ch.id === messageChannelId
    );
    messageChannel.send(message);
  }
};
