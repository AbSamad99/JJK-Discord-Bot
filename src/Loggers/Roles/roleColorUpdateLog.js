/*Function to handle logging when a roles color is changed*/

const Discord = require('discord.js');

const gifOrPngCheck = require('../../Checks/gifOrPngCheck');

const roleColorUpdateLog = async (roleUpdateAuditLog, colorChange, newRole) => {
  try {
    let roleUpdateEmbed, logsChannel;

    //getting logs channel
    logsChannel = newRole.guild.channels.cache.get('447513266395283476');

    //creating the embed
    roleUpdateEmbed = new Discord.MessageEmbed()
      .setAuthor(
        roleUpdateAuditLog.executor.tag,
        await gifOrPngCheck(roleUpdateAuditLog.executor)
      )
      .setDescription(`Color for ${newRole} has been changed`)
      .setColor(15854089)
      .addField('Before:', `#${colorChange.old.toString(16)}`, true)
      .addField('After:', `#${colorChange.new.toString(16)}`, true);

    //logging
    logsChannel.send(roleUpdateEmbed).catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

module.exports = roleColorUpdateLog;
