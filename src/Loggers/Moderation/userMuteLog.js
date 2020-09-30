/*Function to log when user is muted in the server*/

const { MessageEmbed } = require('discord.js');

const gifOrPngCheck = require('../../Helpers/gifOrPngCheck.js');

const userMuteLog = async (msg, toMute, muteRole, reason, time, type) => {
  let logsChannel, muteEmbed;

  //getting logs channel
  logsChannel = msg.guild.channels.cache.get('757852261329272853');

  //constructing the embed
  muteEmbed = new MessageEmbed()
    .setAuthor(msg.author.tag, await gifOrPngCheck(msg.author))
    .setFooter(new Date())
    .setThumbnail(await gifOrPngCheck(toMute.user));

  if (type === 'add') {
    muteEmbed
      .setTitle('User muted')
      .setDescription(`${toMute} has been <@&${muteRole.id}> for ${time}`)
      .addField('Reason:', reason);
  } else if (type === 'remove') {
    muteEmbed
      .setTitle('User unmuted')
      .setColor(muteRole.color)
      .setDescription(`${toMute} is no longer <@&${muteRole.id}>`);
  }

  //logging
  logsChannel
    .send(muteEmbed)
    .then(() => {
      if (type === 'add') {
        msg.channel.send(muteEmbed);
      }
    })
    .catch(console.log);
};

module.exports = userMuteLog;
