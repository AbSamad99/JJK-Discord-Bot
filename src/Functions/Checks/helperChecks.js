const urlExist = require('url-exist');
const fs = require('fs');

//checking the channel where message is sent
const channelCheck = (msg, channelName) => {
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

//checking if user has a role
const roleCheck = (user, roleName) => {
  try {
    const rolesArray = JSON.parse(
      fs.readFileSync(`${process.cwd()}/src/Json-Files/roles.json`)
    );
    const requiredRole = rolesArray.find((role) => role.name === roleName);
    if (!requiredRole) return 0;
    if (user.roles.cache.has(requiredRole.id)) return 1;
    else return 0;
  } catch (err) {
    console.log(err);
  }
};

//checking the art command parameters
const artCommandParametersCheck = (temp, msg, characterArtObj) => {
  let characterArray;
  if (!temp[1]) {
    msg.channel.send('Please specify a character name');
    return 0;
  }
  characterArray = characterArtObj[temp[1].toLowerCase()];
  if (!characterArray) {
    msg.channel.send('Invalid character');
    return 0;
  }
  return 1;
};

module.exports = {
  channelCheck: channelCheck,
  roleCheck: roleCheck,
  artCommandParametersCheck: artCommandParametersCheck,
};