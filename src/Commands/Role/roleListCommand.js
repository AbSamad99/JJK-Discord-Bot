/*Command to list the various roles available for users to self assign */

const Discord = require('discord.js');

const { lockedRolesCheck } = require('../../Checks/Other/miscChecks');
const { channelCheck } = require('../../Checks/Other/helperChecks');

const roleListCommand = (msg) => {
  try {
    let allRolesArray, roles, rolesEmbed;

    //checking if command was issued in proper channels
    if (
      !channelCheck(msg, 'bot-commands') &&
      !channelCheck(msg, 'syed-bot-practice')
    )
      return;

    //initialising
    allRolesArray = msg.guild.roles.cache.array();
    roles = ``;

    allRolesArray.forEach((role) => {
      if (!lockedRolesCheck(role.name)) {
        roles = `${roles}
${role}`;
      }
    });

    rolesEmbed = new Discord.MessageEmbed().setTitle('Role List')
      .setDescription(`Following is the list of all self assignable roles:
  ${roles}`);

    msg.channel.send(rolesEmbed).catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

module.exports = roleListCommand;
