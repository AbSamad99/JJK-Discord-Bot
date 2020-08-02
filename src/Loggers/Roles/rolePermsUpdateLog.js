/*Function to handle logging when a roles perms are changed*/

const Discord = require('discord.js');

const gifOrPngCheck = require('../../Checks/gifOrPngCheck');

const rolePermsUpdateLog = async (
  roleUpdateAuditLog,
  added,
  removed,
  newRole
) => {
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
      .setColor(15854089)
      .setDescription(`Permissions for ${newRole} have been updated`);

    if (added) {
      roleUpdateEmbed.addField('Added', added);
    }

    if (removed) {
      roleUpdateEmbed.addField('Removed', removed);
    }

    //logging
    logsChannel.send(roleUpdateEmbed).catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

module.exports = rolePermsUpdateLog;
