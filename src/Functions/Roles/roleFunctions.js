const Discord = require('discord.js');
const ms = require('ms');

//adds role to user
export const assignRole = (msg, role) => {
  let embedResponse = new Discord.MessageEmbed()
    .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
    .setTitle('Role Added')
    .setColor(3447003)
    .setDescription(`Added <@&${role.id}> to <@${msg.author.id}>`)
    .setFooter(new Date());
  msg.member.roles
    .add(role.id)
    .then(() => {
      msg.channel.send(embedResponse);
    })
    .catch(console.log);
};

//removes role from user
export const removeRole = (msg, role) => {
  let embedResponse = new Discord.MessageEmbed()
    .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
    .setTitle('Role Removed')
    .setColor(3447003)
    .setDescription(`Removed <@&${role.id}> from <@${msg.author.id}>`)
    .setFooter(new Date());

  msg.member.roles
    .remove(role.id)
    .then(() => {
      msg.channel.send(embedResponse);
    })
    .catch(console.log);
};

//mutes/unmutes the user
export const assignMuteRole = (
  msg,
  toMute,
  muteRole,
  time,
  testChannel,
  reason
) => {
  let addEmbedResponse = new Discord.MessageEmbed()
    .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
    .setTitle('User Muted')
    .setColor(3447003)
    .setDescription(`<@${toMute.id}> has been <@&${muteRole.id}> for ${time}`)
    .addField('Reason:', reason)
    .setFooter(new Date());
  let removeEmbedResponse = new Discord.MessageEmbed()
    .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
    .setTitle('User Unmuted')
    .setColor(3447003)
    .setDescription(`<@${toMute.id}> is no longer <@&${muteRole.id}>`)
    .setFooter(new Date());
  toMute.roles
    .add(muteRole.id)
    .then(() => {
      msg.channel.send(addEmbedResponse);
    })
    .then(() => {
      testChannel.send(addEmbedResponse);
    })
    .catch(console.log);
  setTimeout(() => {
    toMute.roles
      .remove(muteRole.id)
      .then(() => {
        testChannel.send(removeEmbedResponse);
      })
      .catch(console.log);
  }, ms(time));
};