import { channelArray, rolesArray } from '../../utilities';
import { assignMuteRole } from '../Roles/roleFunctions.js';

//command to help with chapter announcement
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

//command to help with poll announcement
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

//command to send anon messages
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

//command to mute users
export const muteCommand = (msg) => {
  let toMute, muteRole, temp, reason, time, testChannel;
  toMute = msg.mentions.members.array()[0];
  testChannel = msg.guild.channels.cache.find(
    (ch) => ch.name === 'syed-bot-practice'
  );
  if (!toMute) {
    msg.channel.send('Please mention a user to mute');
    return;
  }
  muteRole = rolesArray.find((role) => role.name === 'Muted');
  toMute = msg.guild.member(toMute);
  temp = msg.content.slice(1);
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
  if (temp.length > 4) {
    reason = temp.slice(4);
    reason = reason.join(' ');
  } else {
    reason = 'No reason specified';
  }
  time = temp[2].concat(temp[3]);
  assignMuteRole(msg, toMute, muteRole, time, testChannel, reason);
};

//command to kick users
export const kickCommand = (msg) => {
  let toKick, temp, reason, testChannel;
  toKick = msg.mentions.members.array()[0];
  testChannel = msg.guild.channels.cache.find(
    (ch) => ch.name === 'syed-bot-practice'
  );
  if (!toKick) {
    msg.channel.send('Please mention a user to kick');
    return;
  }
  temp = msg.content.slice(1);
  temp = temp.split(' ');
  if (temp.length > 2) {
    reason = temp.slice(2);
    reason = reason.join(' ');
  } else {
    msg.channel.send('Please provide a reason for kick');
    return;
  }
  console.log({
    user: toKick.user.username,
    reason: reason,
  });
  // toKick.kick(reason);
};
