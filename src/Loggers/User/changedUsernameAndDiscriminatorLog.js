/*Function to log username and discriminator changes*/

const { MessageEmbed } = require('discord.js');

const gifOrPngCheck = require('../../Helpers/gifOrPngCheck.js');

//logs username changes
const changedUsernameAndDiscriminatorLog = async (newMem, user, type) => {
  let logsChannel, changedUsernameAndDiscriminatorEmbed;

  //selecting logs channel
  logsChannel = newMem.guild.channels.cache.get('447513266395283476');

  //setting relevant fields
  changedUsernameAndDiscriminatorEmbed = new MessageEmbed()
    .setAuthor(newMem.user.tag, await gifOrPngCheck(newMem.user))
    .setColor(15854089)
    .setFooter(new Date());

  //deciding between Username and discriminator logs
  if (type === 'username') {
    changedUsernameAndDiscriminatorEmbed
      .setTitle('Username changed')
      .setDescription(`${newMem.user} has changed their username`)
      .addField('Before:', user.name)
      .addField('After:', newMem.user.username);
  } else if (type === 'discriminator') {
    changedUsernameAndDiscriminatorEmbed
      .setTitle('Discriminator changed')
      .setDescription(`${newMem.user} has changed their discriminator`)
      .addField('Before:', user.discriminator)
      .addField('After:', newMem.user.discriminator);
  }

  //sending to logs channel
  logsChannel.send(changedUsernameAndDiscriminatorEmbed).catch(console.error);
};

module.exports = changedUsernameAndDiscriminatorLog;
