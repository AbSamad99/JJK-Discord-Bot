/*Function to log role addition/removal*/

const { MessageEmbed } = require('discord.js');

const gifOrPngCheck = require('../../Checks/Other/gifOrPngCheck.js');

const changedRoleLog = async (newMem, roleLogs, msg, role, type) => {
  let roleEmbed, logsChannel, roleColor, roles;

  if (!msg) {
    //getting logs channel
    logsChannel = newMem.guild.channels.cache.get('447513266395283476');

    //getting role color
    roleColor = newMem.guild.roles.cache.get(roleLogs.changes[0].new[0].id)
      .color;

    roles = ``;

    //getting all the roles
    roleLogs.changes[0].new.forEach((role) => {
      roles = `${roles} <@&${role.id}>`;
    });

    //creating the embed
    roleEmbed = new MessageEmbed()
      .setAuthor(roleLogs.executor.tag, await gifOrPngCheck(roleLogs.executor))
      .setColor(roleColor)
      .setFooter(new Date());

    //adding fields based on type
    if (roleLogs.changes[0].key === '$add') {
      roleEmbed
        .setTitle('Role added')
        .setDescription(`Added ${roles} to ${roleLogs.target}`);
    } else if (roleLogs.changes[0].key === '$remove') {
      roleEmbed
        .setTitle('Role removed')
        .setDescription(`Removed ${roles} from ${roleLogs.target}`);
    }
  } else {
    //getting logs channel
    logsChannel = msg.guild.channels.cache.get('447513266395283476');

    //creating the embed
    roleEmbed = new MessageEmbed()
      .setAuthor(msg.author.tag, await gifOrPngCheck(msg.author))
      .setFooter(new Date())
      .setColor(role.color);

    if (type === 'add') {
      roleEmbed
        .setTitle('Role added')
        .setDescription(`Added <@&${role.id}> to ${msg.author}`);
    } else if (type === 'remove') {
      roleEmbed
        .setTitle('Role removed')
        .setColor(role.color)
        .setDescription(`Removed <@&${role.id}> from ${msg.author}`);
    }
  }

  //sending the messages
  logsChannel
    .send(roleEmbed)
    .then(() => {
      if (msg) {
        msg.channel.send(roleEmbed);
      }
    })
    .catch(console.error);
};

module.exports = changedRoleLog;
