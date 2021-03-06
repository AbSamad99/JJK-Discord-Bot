/*Function to log when a user changes their avatar*/

const { MessageEmbed } = require('discord.js');

const gifOrPngCheck = require('../../Helpers/gifOrPngCheck.js');

const changedAvatarLog = async (newMem, user) => {
  let logsChannel, changedAvatarEmbed, authorUrl;

  //selecting the logs channel
  logsChannel = newMem.guild.channels.cache.get('447513266395283476');

  //setting relevant fields
  authorUrl = await gifOrPngCheck(newMem.user);

  changedAvatarEmbed = new MessageEmbed()
    .setAuthor(newMem.user.tag, authorUrl)
    .setTitle('Avatar changed')
    .setImage(await gifOrPngCheck(null, user))
    .setDescription(
      `${newMem.user} has updated their avatar from the one below to the one on the right`
    )
    .setColor(15854089)
    .setThumbnail(authorUrl)
    .setFooter(new Date());

  //sending to the logs
  logsChannel.send(changedAvatarEmbed).catch(console.error);
};

module.exports = changedAvatarLog;
