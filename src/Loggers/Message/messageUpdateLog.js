/*Function to log message update*/

const Discord = require('discord.js');

const gifOrPngCheck = require('../../Checks/Other/gifOrPngCheck.js');

//logs edited messages
const messageUpdatedLog = async (oldMsg, newMsg) => {
  try {
    let editEmbed, logsChannel;

    //selecting log channel
    logsChannel = newMsg.guild.channels.cache.get('447513266395283476');

    //setting the fields
    editEmbed = new Discord.MessageEmbed()
      .setAuthor(newMsg.author.tag, await gifOrPngCheck(newMsg.author))
      .setTitle(`Message edited in #${newMsg.channel.name}`)
      .setColor(15854089)
      .addField('Before:', oldMsg.content)
      .addField('After:', newMsg.content)
      .setFooter(new Date());

    //sending message to logs
    logsChannel.send(editEmbed).catch(console.error);
  } catch (err) {
    console.log(err);
  }
};

module.exports = messageUpdatedLog;
