/*Function to log role addition/removal*/

const { MessageEmbed } = require('discord.js');

const gifOrPngCheck = require('../../Checks/Other/gifOrPngCheck.js');

const changedRoleLog = async (
  newMem,
  executor,
  target,
  roleChanges,
  msg,
  role,
  type
) => {
  let roleEmbed, logsChannel, roleColor, roles;

  if (!msg) {
    //getting logs channel
    logsChannel = newMem.guild.channels.cache.get('447513266395283476');

    //getting role color
    roleColor = newMem.guild.roles.cache.get(roleChanges.new[0].id).color;

    roles = ``;

    //getting all the roles
    roleChanges.new.forEach((role) => {
      roles = `${roles} <@&${role.id}>`;
    });

    //creating the embed
    roleEmbed = new MessageEmbed()
      .setAuthor(executor.tag, await gifOrPngCheck(executor))
      .setColor(roleColor)
      .setFooter(new Date());

    //adding fields based on type
    if (roleChanges.key === '$add') {
      roleEmbed
        .setTitle('Role added')
        .setDescription(`Added ${roles} to ${target}`);
    } else if (roleChanges.key === '$remove') {
      roleEmbed
        .setTitle('Role removed')
        .setDescription(`Removed ${roles} from ${target}`);
    }
  } else {
    //getting logs channel
    logsChannel = msg.guild.channels.cache.get('447513266395283476');

    roles = ``;

    //getting all the roles
    role.forEach((role) => {
      roles = `${roles} ${role}`;
    });

    //creating the embed
    roleEmbed = new MessageEmbed()
      .setAuthor(msg.author.tag, await gifOrPngCheck(msg.author))
      .setFooter(new Date())
      .setColor(role.color);

    if (type === 'add') {
      roleEmbed
        .setTitle('Role added')
        .setDescription(`Added ${roles} to ${msg.author}`);
    } else if (type === 'remove') {
      roleEmbed
        .setTitle('Role removed')
        .setColor(role.color)
        .setDescription(`Removed ${roles} from ${msg.author}`);
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
