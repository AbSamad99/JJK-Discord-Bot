/*Function to handle logging when a role is deleted*/

const Discord = require('discord.js');

const gifOrPngCheck = require('../../Checks/Other/gifOrPngCheck');

const roleDeleteLog = async (roleDeletAuditLog, role, perms) => {
  try {
    let roleDeleteEmbed, logsChannel;

    //getting logs channel
    logsChannel = role.guild.channels.cache.get('447513266395283476');

    //creating the rmbed
    roleDeleteEmbed = new Discord.MessageEmbed()
      .setAuthor(
        roleDeletAuditLog.executor.tag,
        await gifOrPngCheck(roleDeletAuditLog.executor)
      )
      .setTitle('Role Deleted')
      .setDescription(`A role has been deleted`)
      .setColor(10038562)
      .setFooter(new Date())
      .addField(
        'Details:',
        `Name: ${role.name}
Color: #${role.color.toString(16).toUpperCase().padStart(6, '0')}
Displayed separately: ${role.hoist}
Mentionable: ${role.mentionable}`
      );

    if (perms) {
      roleDeleteEmbed.addField('Permissions:', perms);
    }

    logsChannel.send(roleDeleteEmbed).catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

module.exports = roleDeleteLog;
