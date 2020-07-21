const fs = require('fs');

export const channelCheck = (msg, channelName) => {
  try {
    const channelArray = JSON.parse(
      fs.readFileSync(`${process.cwd()}/src/Json-Files/channels.json`)
    );
    const requiredChannel = channelArray.find((ch) => ch.name === channelName);
    if (!requiredChannel) {
      return 0;
    }
    if (requiredChannel.id === msg.channel.id) {
      return 1;
    } else return 0;
  } catch (err) {
    console.log(err);
  }
};

export const roleCheck = (user, roleName) => {
  try {
    // console.log(user.roles.cache.array());
    const rolesArray = JSON.parse(
      fs.readFileSync(`${process.cwd()}/src/Json-Files/roles.json`)
    );
    const requiredRole = rolesArray.find((role) => role.name === roleName);
    if (!requiredRole) return 0;
    // console.log(requiredRole.name);
    if (user.roles.cache.has(requiredRole.id)) return 1;
    else return 0;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  channelCheck: channelCheck,
  roleCheck: roleCheck,
};
