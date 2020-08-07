/*Function to handle logging when a role is created*/

const { MessageEmbed } = require('discord.js');

const gifOrPngCheck = require('../../Checks/Other/gifOrPngCheck');

const roleCreateLog = async (roleCreateAuditLog, role, perms) => {
  let roleCreateEmbed, logsChannel;

  //getting logs channel
  logsChannel = role.guild.channels.cache.get('447513266395283476');

  //creating the rmbed
  roleCreateEmbed = new MessageEmbed()
    .setAuthor(
      roleCreateAuditLog.executor.tag,
      await gifOrPngCheck(roleCreateAuditLog.executor)
    )
    .setTitle('New role created')
    .setDescription(`${role} role has been created`)
    .setColor(3066993)
    .setFooter(new Date())
    .addField(
      'Details:',
      `Name: ${role.name}
Color: #${role.color.toString(16).toUpperCase().padStart(6, '0')}
Displayed separately: ${role.hoist}
Mentionable: ${role.mentionable}`
    );

  if (perms) {
    roleCreateEmbed.addField('Permissions:', perms);
  }

  logsChannel.send(roleCreateEmbed).catch(console.log);
};

module.exports = roleCreateLog;
