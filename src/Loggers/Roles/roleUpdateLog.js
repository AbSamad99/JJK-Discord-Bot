/*Function to handle logging when a roles name is changed*/

const Discord = require('discord.js');

const gifOrPngCheck = require('../../Checks/Other/gifOrPngCheck');

const roleUpdateLog = async (
  roleUpdateAuditLog,
  nameChange,
  mentionableChange,
  hoistChange,
  colorChange,
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
      .setDescription(`Name for ${newRole} has been changed`)
      .setColor(15854089);

    if (nameChange) {
      roleUpdateEmbed.addField(
        'Name:',
        `Before: ${nameChange.old}
After: ${nameChange.new}`
      );
    }

    if (mentionableChange) {
      roleUpdateEmbed.addField(
        'Mentionable:',
        `Before: ${mentionableChange.old}
After: ${mentionableChange.new}`
      );
    }

    if (hoistChange) {
      roleUpdateEmbed.addField(
        'Displayed separately:',
        `Before: ${hoistChange.old}
After: ${hoistChange.new}`
      );
    }

    if (colorChange) {
      roleUpdateEmbed.addField(
        'Color:',
        `Before: #${colorChange.old.toString(16).toUpperCase()}
After: #${colorChange.new.toString(16).toUpperCase()}`
      );
    }

    //logging
    logsChannel.send(roleUpdateEmbed).catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

module.exports = roleUpdateLog;
