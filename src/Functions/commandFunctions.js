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
