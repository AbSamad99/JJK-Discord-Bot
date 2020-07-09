import { reaction_numbers } from '../utilities';
export const chapterAnnouncement = (msg) => {
  let mangaNewsRoleId = msg.guild.roles.cache.find(
    (role) => role.name === 'Manga-News'
  );
  let announcementChannel = msg.member.guild.channels.cache.find(
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
  if (temp[1] || temp[2] || temp[3]) {
    announcementChannel.send(replyMessage);
  }
};

export const pollAnnouncement = (msg) => {
  let announcementChannel = msg.member.guild.channels.cache.find(
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
  console.log(temp[1]);
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
  let temp = msg.content.slice(1);
  let welcomeChannel = msg.member.guild.channels.cache.find(
    (ch) => ch.name === 'welcome'
  );
  if (
    msg.channel.id === welcomeChannel.id &&
    temp.toLowerCase().startsWith('todo')
  ) {
    msg.channel.send(
      'https://media.discordapp.net/attachments/447410298845003777/635705498624196608/K17.png'
    );
  }
};

export const welcomeCommand = (msg) => {
  let temp = msg.content.slice(1);
  let welcomeChannel = msg.member.guild.channels.cache.find(
    (ch) => ch.name === 'welcome'
  );
  if (
    msg.channel.id === welcomeChannel.id &&
    temp.toLowerCase().startsWith('welcome')
  ) {
    let message = `Welcome newbie, we have three questions for you:
1. Are you up to date on the Jujutsu Kaisen manga?
2. Have you read the prequel?
3. Can Todo ask you a woke question?`;
    msg.channel.send(message);
  }
};

export const anonMessageCommand = (msg) => {
  let modBotChannel = msg.member.guild.channels.cache.find(
    (ch) => ch.name === 'mod-bots'
  );
  if (msg.channel.id === modBotChannel.id) {
    console.log(msg.content);
  }
};
