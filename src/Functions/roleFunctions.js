const Discord = require('discord.js');
const ms = require('ms');

export const assignRole = (msg, role, testChannel) => {
  let embedResponse = new Discord.MessageEmbed()
    .setAuthor(msg.author.tag, msg.author.avatarURL())
    .setTitle('Role Added')
    .setColor(3447003)
    .setDescription(`Added <@&${role.id}> to <@${msg.author.id}>`)
    .setFooter(new Date());
  msg.member.roles
    .add(role)
    .then(() => {
      msg.channel.send(embedResponse);
    })
    .then(() => {
      testChannel.send(embedResponse);
    })
    .catch(console.log);
};

export const removeRole = (msg, role, testChannel) => {
  let embedResponse = new Discord.MessageEmbed()
    .setAuthor(msg.author.tag, msg.author.avatarURL())
    .setTitle('Role Removed')
    .setColor(3447003)
    .setDescription(`Removed <@&${role.id}> from <@${msg.author.id}>`)
    .setFooter(new Date());

  msg.member.roles
    .remove(role)
    .then(() => {
      msg.channel.send(embedResponse);
    })
    .then(() => {
      testChannel.send(embedResponse);
    })
    .catch(console.log);
};

export const assignMuteRole = (msg, toMute, muteRole, time, testChannel) => {
  let addEmbedResponse = new Discord.MessageEmbed()
    .setAuthor(msg.author.tag, msg.author.avatarURL())
    .setTitle('User Muted')
    .setColor(3447003)
    .setDescription(`<@${toMute.id}> has been muted for ${time}`)
    .setFooter(new Date());
  let removeEmbedResponse = new Discord.MessageEmbed()
    .setAuthor(msg.author.tag, msg.author.avatarURL())
    .setTitle('User Unmuted')
    .setColor(3447003)
    .setDescription(`<@${toMute.id}> has been unmuted`)
    .setFooter(new Date());
  toMute.roles
    .add(muteRole)
    .then(() => {
      msg.channel.send(addEmbedResponse);
    })
    .then(() => {
      testChannel.send(addEmbedResponse);
    })
    .catch(console.log);
  setTimeout(() => {
    toMute.roles
      .remove(muteRole)
      .then(() => {
        testChannel.send(removeEmbedResponse);
      })
      .catch(console.log);
  }, ms(time));
};
