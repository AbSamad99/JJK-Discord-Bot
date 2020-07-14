import { channelArray, rolesArray } from '../../utilities';
import { assignMuteRole } from '../roleFunctions.js';

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
  assignMuteRole(msg, toMute, muteRole, time);
};
