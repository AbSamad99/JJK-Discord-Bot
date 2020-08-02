/*Function to handle logging when a roles name is changed*/

const Discord = require('discord.js');

const gifOrPngCheck = require('../../Checks/gifOrPngCheck');

const roleNameUpdateLog = async (roleUpdateAuditLog, nameChange, newRole) => {
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
      .setDescription(`Name for ${newRole} has been changed`)
      .setColor(15854089)
      .addField('Before:', nameChange.old, true)
      .addField('After:', nameChange.new, true);

    //logging
    logsChannel.send(roleUpdateEmbed).catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

module.exports = roleNameUpdateLog;
