const Discord = require('discord.js');

const checkIfGifOrPng = require('../Helpers/checkIfGifOrPng.js');

//logs avatar updates
const changedAvatarLog = async (newMem, user) => {
  try {
    let logsChannel, changedAvatarEmbed, authorUrl;

    //selecting the logs channel
    logsChannel = newMem.guild.channels.cache.find(
      (ch) => ch.name === 'syed-bot-practice'
    );

    //setting relevant fields
    authorUrl = await checkIfGifOrPng(newMem.user);

    changedAvatarEmbed = new Discord.MessageEmbed()
      .setAuthor(newMem.user.tag, authorUrl)
      .setTitle('Avatar Changed')
      .setImage(await checkIfGifOrPng(null, user))
      .setDescription(
        `<@${newMem.user.id}> has updated their avatar from the one below to the one on the right`
      )
      .setColor(3447003)
      .setThumbnail(authorUrl)
      .setFooter(new Date());

    //sending to the logs
    logsChannel.send(changedAvatarEmbed).catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

module.exports = changedAvatarLog;
