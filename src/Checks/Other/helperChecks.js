/*Checks for the channel, role and art parameters*/

//checking the channel where message is sent
const channelCheck = (msg, channelName) => {
  try {
    const requiredChannel = msg.guild.channels.cache.find(
      (ch) => ch.name === channelName
    );
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

//checking if user has a role
const roleCheck = (user, roleName) => {
  try {
    const requiredRole = user.guild.roles.cache.find(
      (role) => role.name === roleName
    );
    if (!requiredRole) return 0;
    if (user.roles.cache.has(requiredRole.id)) return 1;
    else return 0;
  } catch (err) {
    console.log(err);
  }
};

//checking the art command parameters
const artCommandParametersCheck = (temp, msg, characterArtObj) => {
  try {
    if (!temp[1]) {
      msg.channel.send('Please specify a character name');
      return 0;
    }
    if (!characterArtObj) {
      msg.channel.send('Invalid character');
      return 0;
    }
    return 1;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  channelCheck: channelCheck,
  roleCheck: roleCheck,
  artCommandParametersCheck: artCommandParametersCheck,
};
