const createEmbed = require('../Helpers/createEmbed.js');
const checkIfGifOrPng = require('../Helpers/checkIfGifOrPng.js');

//logs when user joins the server
const userJoinLog = async (mem, modChannel) => {
  try {
    let joinEmbed, authorName, authorUrl, title, color, thumbnail, description;

    //setting relevant fields
    authorName = mem.user.tag;
    authorUrl = await checkIfGifOrPng(mem.user);
    title = 'Member Joined';
    color = 3447003;
    thumbnail = authorUrl;
    description = `<@${mem.user.id}> has joined the server. The total number of users is now at ${mem.guild.memberCount}`;

    //creating the embed
    joinEmbed = createEmbed(
      authorName,
      authorUrl,
      title,
      color,
      null,
      null,
      thumbnail,
      description
    );

    //logging
    modChannel.send(joinEmbed).catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

module.exports = userJoinLog;
