const Discord = require('discord.js');

const checkIfGifOrPng = require('../Helpers/checkIfGifOrPng.js');

//logs username changes
const changedUsernameAndDiscriminatorLog = async (newMem, user, type) => {
  try {
    let logsChannel, changedUsernameAndDiscriminatorEmbed;

    //selecting logs channel
    logsChannel = newMem.guild.channels.cache.find((ch) => ch.name === 'logs');

    //setting relevant fields

    changedUsernameAndDiscriminatorEmbed = new Discord.MessageEmbed()
      .setAuthor(newMem.user.tag, await checkIfGifOrPng(newMem.user))
      .setColor(3447003)
      .setFooter(new Date());

    //deciding between Username and discriminator logs
    if (type === 'username') {
      changedUsernameAndDiscriminatorEmbed
        .setTitle('Username Changed')
        .setDescription(`<@${newMem.user.id}> has changed their username`)
        .addField('Before:', user.name)
        .addField('After:', newMem.user.username);
    } else if (type === 'discriminator') {
      changedUsernameAndDiscriminatorEmbed
        .setTitle('Discriminator Changed')
        .setDescription(`<@${newMem.user.id}> has changed their discriminator`)
        .addField('Before:', user.discriminator)
        .addField('After:', newMem.user.discriminator);
    }

    //sending to logs channel
    logsChannel.send(changedUsernameAndDiscriminatorEmbed).catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

module.exports = changedUsernameAndDiscriminatorLog;
