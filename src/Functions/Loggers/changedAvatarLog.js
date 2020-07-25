const Discord = require('discord.js');

const checkIfGifOrPng = require('../Helpers/checkIfGifOrPng.js');

//logs avatar updates
const changedAvatarLog = async (newMem, user) => {
  try {
    let modChannel, changedAvatarEmbed, authorUrl, image;

    //selecting the logs channel
    modChannel = newMem.guild.channels.cache.find(
      (ch) => ch.name === 'syed-bot-practice'
    );

    //setting relevant fields
    authorUrl = await checkIfGifOrPng(newMem.user);
    image = await checkIfGifOrPng(null, user);

    changedAvatarEmbed = new Discord.MessageEmbed()
      .setAuthor(newMem.user.tag, authorUrl)
      .setTitle('Avatar Changed')
      .setImage(image)
      .setDescription(
        `<@${newMem.user.id}> has updated their avatar from the one below to the one on the right`
      )
      .setColor(3447003)
      .setThumbnail(authorUrl)
      .setFooter(new Date());

    //sending to the logs
    modChannel.send(changedAvatarEmbed).catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

module.exports = changedAvatarLog;
