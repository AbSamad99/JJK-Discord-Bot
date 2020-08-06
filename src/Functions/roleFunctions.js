const Discord = require('discord.js');
const ms = require('ms');

//adds role to user
const assignRole = (msg, role) => {
  try {
    let embedResponse = new Discord.MessageEmbed()
      .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
      .setTitle('Role added')
      .setColor(role.color)
      .setDescription(`Added <@&${role.id}> to ${msg.author}`)
      .setFooter(new Date());
    msg.member.roles
      .add(role.id)
      .then(() => {
        msg.channel.send(embedResponse);
      })
      .catch(console.error);
  } catch (err) {
    console.log(err);
  }
};

//removes role from user
const removeRole = (msg, role) => {
  try {
    let embedResponse = new Discord.MessageEmbed()
      .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
      .setTitle('Role removed')
      .setColor(role.color)
      .setDescription(`Removed <@&${role.id}> from ${msg.author}`)
      .setFooter(new Date());

    msg.member.roles
      .remove(role.id)
      .then(() => {
        msg.channel.send(embedResponse);
      })
      .catch(console.error);
  } catch (err) {
    console.log(err);
  }
};

//mutes/unmutes the user
const assignMuteRole = (msg, toMute, muteRole, time, logsChannel, reason) => {
  try {
    let addEmbedResponse, removeEmbedResponse;

    //creating the mute embed
    addEmbedResponse = new Discord.MessageEmbed()
      .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
      .setTitle('User muted')
      .setColor(muteRole.color)
      .setDescription(`${toMute} has been <@&${muteRole.id}> for ${time}`)
      .addField('Reason:', reason)
      .setFooter(new Date());

    //creating the unmute embed
    removeEmbedResponse = new Discord.MessageEmbed()
      .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
      .setTitle('User unmuted')
      .setColor(muteRole.color)
      .setDescription(`${toMute} is no longer <@&${muteRole.id}>`)
      .setFooter(new Date());

    //assigning the mute role
    toMute.roles
      .add(muteRole.id)
      .then(() => {
        msg.channel.send(addEmbedResponse);
      })
      .then(() => {
        logsChannel.send(addEmbedResponse);
      })
      .catch(console.error);

    //unmuting
    setTimeout(() => {
      toMute = msg.guild.member(toMute);

      if (!toMute.roles.cache.has(muteRole.id)) {
        return;
      }

      toMute.roles
        .remove(muteRole.id)
        .then(() => {
          logsChannel.send(removeEmbedResponse);
        })
        .catch(console.error);
    }, ms(time));
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  assignRole: assignRole,
  removeRole: removeRole,
  assignMuteRole: assignMuteRole,
};
