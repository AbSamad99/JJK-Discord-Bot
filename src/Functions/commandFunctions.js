import { channelArray, rolesArray } from '../utilities';
import { assignMuteRole, assignRole, removeRole } from './roleFunctions.js';
import { hasRoleCheck, lockedRolesCheck } from './checkFunctions.js';

export const chapterAnnouncement = (msg) => {
  let modBotChannel = channelArray.find((ch) => ch.name === 'mod-bots');
  let practiceChannel = channelArray.find(
    (ch) => ch.name === 'syed-bot-practice'
  );
  let mangaNewsRole = rolesArray.find((role) => role.name === 'Manga News');
  let announcementChannel = msg.guild.channels.cache.find(
    (ch) => ch.name === 'announcements'
  );
  let temp = msg.content.slice(1);
  temp = temp.split(' ');
  let chapterNumber = temp[1];
  let vizLink = temp[2];
  let mpLink = temp[3];
  let replyMessage = `<@&${mangaNewsRole.id}> Chapter ${chapterNumber} is out!
  
  Viz: ${vizLink}
      
  Manga Plus: ${mpLink}`;
  if (temp[1] && temp[2] && temp[3]) {
    if (msg.channel.id === practiceChannel.id) {
      msg.channel.send(replyMessage).catch(console.log);
    } else if (msg.channel.id === modBotChannel.id) {
      announcementChannel.send(replyMessage).catch(console.log);
    }
  } else {
    msg.channel
      .send('Please follow the proper syntax of the command')
      .catch(console.log);
  }
};

export const pollAnnouncement = (msg) => {
  let modBotChannel = channelArray.find((ch) => ch.name === 'mod-bots');
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
    announcementChannel
      .send(replyMessage)
      .then((msg) => {
        msg.react('5️⃣');
        msg.react('4️⃣');
        msg.react('3️⃣');
        msg.react('2️⃣');
        msg.react('1️⃣');
      })
      .catch(console.log);
  }
};

export const fujoCommand = (msg) => {
  msg.channel.send('https://bit.ly/2ZoTsQ4').catch(console.log);
};

export const todoCommand = (msg) => {
  let welcomeChannel = channelArray.find((ch) => ch.name === 'welcome');
  let testChannel = channelArray.find((ch) => ch.name === 'syed-bot-practice');
  if (
    msg.channel.id === welcomeChannel.id ||
    msg.channel.id === testChannel.id
  ) {
    msg.channel
      .send(
        'https://media.discordapp.net/attachments/447410298845003777/635705498624196608/K17.png'
      )
      .catch(console.log);
  }
};

export const welcomeCommand = (msg) => {
  let welcomeChannel = channelArray.find((ch) => ch.name === 'welcome');
  let testChannel = channelArray.find((ch) => ch.name === 'syed-bot-practice');
  if (
    msg.channel.id === welcomeChannel.id ||
    msg.channel.id === testChannel.id
  ) {
    let message = `Welcome newbie, we have three questions for you:
1. Are you up to date on the Jujutsu Kaisen manga?
2. Have you read the prequel?
3. Can Todo ask you a woke question?`;
    msg.channel.send(message).catch(console.log);
  }
};

export const dontCareCommand = (msg) => {
  let welcomeChannel = channelArray.find((ch) => ch.name === 'welcome');
  let testChannel = channelArray.find((ch) => ch.name === 'syed-bot-practice');
  if (
    msg.channel.id === welcomeChannel.id ||
    msg.channel.id === testChannel.id
  ) {
    let message = `https://media.discordapp.net/attachments/447410298845003777/684664171174166538/20191130_235504.jpg?width=736&height=671`;
    msg.channel.send(message).catch(console.log);
  }
};

export const shyCommand = (msg) => {
  let welcomeChannel = channelArray.find((ch) => ch.name === 'welcome');
  let testChannel = channelArray.find((ch) => ch.name === 'syed-bot-practice');
  if (
    msg.channel.id === welcomeChannel.id ||
    msg.channel.id === testChannel.id
  ) {
    let message = `https://cdn.discordapp.com/attachments/704934870622797904/731173904269312101/Screenshot_20200507-234318_MangaZone.jpg`;
    msg.channel.send(message).catch(console.log);
  }
};

export const encyclopediaCommand = (msg) => {
  let message = `https://docs.google.com/document/d/1lPQvDk8o-jjJ_8qiIFkQmdB0GKAy4WeN_38_geoDsqw/edit?usp=sharing`;
  msg.channel.send(message).catch(console.log);
};

export const catalogueCommand = (msg) => {
  let message = `https://docs.google.com/document/d/1LO6ZxqUlD3elokLhkjkoHqZGumdC3XQSHHysviKrBbA/edit?usp=sharing`;
  msg.channel.send(message);
};

export const chartCommand = (msg) => {
  let message = `https://docs.google.com/spreadsheets/d/1pyrdfwq-Qbj2eEJIsdD3nC9906n1KOYCNEpzn-8Wpx8/edit?usp=sharing`;
  msg.channel.send(message).catch(console.log);
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
    messageChannel.send(message).catch(console.log);
  }
};

export const roleAssignCommand = (msg) => {
  let botChannel = msg.guild.channels.cache.find(
    (ch) => ch.name === 'bot-commands'
  );
  let testChannel = msg.guild.channels.cache.find(
    (ch) => ch.name === 'syed-bot-practice'
  );
  if (msg.channel.id !== botChannel.id && msg.channel.id !== testChannel.id)
    return;
  let temp = msg.content.slice(1);
  temp = temp.split(' ');
  let desiredRole = rolesArray.find(
    (role) => role.name.toLowerCase() == temp[1].toLowerCase()
  );
  if (!desiredRole) return;
  if (lockedRolesCheck(desiredRole)) return;
  if (!hasRoleCheck(msg, desiredRole)) {
    assignRole(msg, desiredRole, testChannel);
  } else {
    removeRole(msg, desiredRole, testChannel);
  }
};

export const muteCommand = (msg) => {
  let testChannel = msg.guild.channels.cache.find(
    (ch) => ch.name === 'syed-bot-practice'
  );
  let toMute = msg.mentions.members.array()[0];
  if (!toMute) {
    msg.channel.send('Please mestion a user to mute');
    return;
  }
  let muteRole = rolesArray.find((role) => role.name === 'Muted');
  toMute = msg.guild.member(toMute);
  let temp = msg.content.slice(1);
  temp = temp.split(' ');
  if (!temp[2] || !temp[3]) {
    msg.channel.send('Please mention duration of the mute');
    return;
  } else if (
    isNaN(temp[2]) ||
    (temp[3] !== 'm' && temp[3] !== 's' && temp[3] !== 'd' && temp[3] !== 'd')
  ) {
    msg.channel.send('Please specify valid time format');
    return;
  }
  if (toMute.roles.cache.has(muteRole.id)) {
    msg.channel.send('User is Already Muted');
    return;
  }
  let time = temp[2].concat(temp[3]);
  assignMuteRole(msg, toMute, muteRole, time, testChannel);
};
