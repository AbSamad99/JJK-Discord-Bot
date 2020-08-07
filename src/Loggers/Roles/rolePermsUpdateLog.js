/*Function to handle logging when a roles perms are changed*/

const { MessageEmbed } = require('discord.js');

const gifOrPngCheck = require('../../Checks/Other/gifOrPngCheck');

const rolePermsUpdateLog = async (
  roleUpdateAuditLog,
  added,
  removed,
  newRole
) => {
  let roleUpdateEmbed, logsChannel;

  //getting logs channel
  logsChannel = newRole.guild.channels.cache.get('447513266395283476');

  //creating the embed
  roleUpdateEmbed = new MessageEmbed()
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
};

module.exports = rolePermsUpdateLog;
