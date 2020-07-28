const Discord = require('discord.js');
const ms = require('ms');

const { assignRole, removeRole } = require('../Roles/roleFunctions.js');
const { lockedRolesCheck } = require('../Checks/miscChecks.js');
const { channelCheck, roleCheck } = require('../Checks/helperChecks.js');
const gifOrPngCheck = require('../Checks/gifOrPngCheck.js');

//assigns character role to a member
const roleAssignCommand = (msg) => {
  try {
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
    desiredRole = msg.guild.roles.cache
      .array()
      .find((role) => role.name.toLowerCase() === temp[1].toLowerCase());
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
const suggestionCommand = async (msg) => {
  try {
    let suggestEmbed, temp, message, index, authorUrl;

    if (
      !channelCheck(msg, 'server-suggestions') &&
      !roleCheck(msg.member, 'Special-Grade Shaman') &&
      !roleCheck(msg.member, 'admin')
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
    suggestEmbed = new Discord.MessageEmbed()
      .setAuthor(msg.author.tag, await gifOrPngCheck(msg.author))
      .setTitle('Suggestion')
      .setColor(3447003)
      .setDescription(
        `<@${msg.author.id}> has provided a suggestion, react to either 👍 or 👎 to vote in favour of the suggestion or against it respectively`
      )
      .addField('Suggestion', message)
      .setFooter(new Date());
    if (msg.attachments.array()[0]) {
      suggestEmbed.setImage(msg.attachments.array()[0].url);
    }
    await msg.channel
      .send(suggestEmbed)
      .then((botMsg) => {
        botMsg.react('👍');
        botMsg.react('👎');
      })
      .catch(console.error);

    setTimeout(() => {
      msg.delete().catch(console.error);
    }, ms('2s'));
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  roleAssignCommand: roleAssignCommand,
  suggestionCommand: suggestionCommand,
};
