import { rolesArray } from '../../utilities.js';
import { assignRole, removeRole } from '../Roles/roleFunctions.js';
import { hasRoleCheck, lockedRolesCheck } from '../Checks/RoleChecks';

//assigns character role to a member
export const roleAssignCommand = (msg) => {
  let botChannel, testChannel, temp, desiredRole;
  botChannel = msg.guild.channels.cache.find(
    (ch) => ch.name === 'bot-commands'
  );
  testChannel = msg.guild.channels.cache.find(
    (ch) => ch.name === 'syed-bot-practice'
  );
  if (msg.channel.id !== botChannel.id && msg.channel.id !== testChannel.id)
    return;
  temp = msg.content.slice(1);
  temp = temp.split(' ');
  if (!temp[1]) {
    msg.channel.send('Please specify a character name');
    return;
  }
  desiredRole = rolesArray.find(
    (role) => role.name.toLowerCase() == temp[1].toLowerCase()
  );
  if (!desiredRole) {
    msg.channel.send('Please specify a valid character name');
    return;
  }
  if (lockedRolesCheck(desiredRole)) {
    msg.channel.send('Cannot Assign that role');
    return;
  }
  if (!hasRoleCheck(msg, desiredRole)) {
    assignRole(msg, desiredRole);
  } else {
    removeRole(msg, desiredRole);
  }
};
