/*Command to list the various roles available for users to self assign */

const { MessageEmbed } = require('discord.js');

const { lockedRolesArray } = require('../../checkArrays');

const roleListCommand = (msg) => {
  //checking if command was issued in proper channels
  if (
    !(msg.channel.id === '447513472427622410') /*bot commands channel*/ &&
    !(msg.channel.id === '720958791432011789') /*Syed bot channel*/
  )
    return;

  try {
    let allRolesArray, roles, rolesEmbed;

    //initialising
    allRolesArray = msg.guild.roles.cache.array();
    roles = ``;

    allRolesArray.forEach((role) => {
      if (lockedRolesArray.includes(role.name)) {
        roles = `${roles}
${role}`;
      }
    });

    rolesEmbed = new MessageEmbed().setTitle('Role List')
      .setDescription(`Following is the list of all self assignable roles:
  ${roles}`);

    msg.channel.send(rolesEmbed).catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

module.exports = roleListCommand;
