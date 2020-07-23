const fs = require('fs');

const { assignRole, removeRole } = require('../Roles/roleFunctions.js');
const { lockedRolesCheck } = require('../Checks/miscChecks.js');
const { channelCheck, roleCheck } = require('../Checks/helperChecks.js');
const createEmbed = require('../Helpers/createEmbed.js');
const checkIfGifOrPng = require('../Helpers/checkIfGifOrPng.js');

//assigns character role to a member
const roleAssignCommand = (msg) => {
  try {
    const rolesArray = JSON.parse(
      fs.readFileSync(`${process.cwd()}/src/Json-Files/roles.json`)
    );
    let temp, desiredRole;
    if (
      !channelCheck(msg, 'bot-commands') &&
      !channelCheck(msg, 'syed-bot-practice')
    )
      return;
    temp = msg.content.slice(1);
    temp = temp.split(' ');
    if (!temp[1]) {
      msg.channel.send('Please specify a character name');
      return;
    }
    desiredRole = rolesArray.find(
      (role) => role.name.toLowerCase() === temp[1].toLowerCase()
    );
    if (!desiredRole) {
      msg.channel.send('Please specify a valid character name');
      return;
    }
    if (lockedRolesCheck(desiredRole)) {
      msg.channel.send('Cannot Assign that role');
      return;
    }
    if (!roleCheck(msg.member, desiredRole.name)) {
      assignRole(msg, desiredRole);
    } else {
      removeRole(msg, desiredRole);
    }
  } catch (err) {
    console.log(err);
  }
};

//makes a suggestion embed-user
const userSuggestionCommand = async (msg) => {
  try {
    let suggestEmbed,
      temp,
      message,
      index,
      authorName,
      authorUrl,
      title,
      color,
      field1,
      description,
      image;
    if (
      !channelCheck(msg, 'server-suggestions') &&
      (!roleCheck(msg.member, 'Special-Grade Shaman') ||
        !roleCheck(msg.member, 'admin'))
    )
      return;
    temp = msg.content.slice(1);
    temp = temp.split(' ');
    if (!temp[1]) {
      msg.channel.send(`Provide an input`);
      return;
    }
    if (temp.length < 11) {
      msg.channel.send('Input must contain at least 10 words');
      return;
    }
    message = temp[1];
    for (index = 2; index < temp.length; index++) {
      message = `${message} ${temp[index]}`;
    }
    authorName = msg.author.tag;
    authorUrl = await checkIfGifOrPng(msg.author);
    title = 'Suggestion';
    color = 3447003;
    description = `<@${msg.author.id}> has provided a suggestion, react to either 👍 or 👎 to vote in favour of the suggestion or against it respectively`;
    field1 = {
      title: 'Suggestion:',
      content: message,
    };
    console.log(msg.attachments.array()[0]);
    if (msg.attachments.array()[0]) {
      image = msg.attachments.array()[0].url;
    } else image = null;
    suggestEmbed = createEmbed(
      authorName,
      authorUrl,
      title,
      color,
      field1,
      null,
      null,
      description,
      image
    );
    msg.channel
      .send(suggestEmbed)
      .then((botMsg) => {
        botMsg.react('👍');
        botMsg.react('👎');
      })
      .then(() => msg.delete())
      .catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  roleAssignCommand: roleAssignCommand,
  userSuggestionCommand: userSuggestionCommand,
};
