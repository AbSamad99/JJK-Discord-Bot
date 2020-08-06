/*Function to log creation of channel*/

const Discord = require('discord.js');
const { sentenceCase } = require('change-case');

const gifOrPngCheck = require('../../Checks/Other/gifOrPngCheck');

const channelCreateLog = async (channel, channelCreateAuditLog, obj) => {
  try {
    let keys,
      channelCreateEmbed,
      logsChannel,
      i,
      j,
      perms = ``;

    //getting keys
    keys = Object.keys(obj);

    //getting logs channel
    logsChannel = channel.guild.channels.cache.get('447513266395283476');

    //creating embed
    channelCreateEmbed = new Discord.MessageEmbed()
      .setAuthor(
        channelCreateAuditLog.executor.tag,
        await gifOrPngCheck(channelCreateAuditLog.executor)
      )
      .setTitle('Channel created')
      .setColor(3066993)
      .setFooter(new Date())
      .addField(
        'Details:',
        `Name: ${channel.name}
Type: ${channel.type}
Topic: ${channel.topic ? channel.topic : 'None'}
NSFW: ${channel.nsfw ? 'Yes' : 'No'}`
      );

    //constructing the perms field
    for (i = 0; i < keys.length; i++) {
      if (i !== 0) {
        perms = `${perms}

Overwrite for ${obj[keys[i]].roleOrUser}:`;
        for (j = 0; j < obj[keys[i]].allow.length; j++) {
          perms = `${perms}
${sentenceCase(obj[keys[i]].allow[j])}: ✅`;
        }
        for (j = 0; j < obj[keys[i]].deny.length; j++) {
          perms = `${perms}
${sentenceCase(obj[keys[i]].deny[j])}: ❌`;
        }
      } else {
        perms = `Overwrite for ${obj[keys[i]].roleOrUser}:`;
        for (j = 0; j < obj[keys[i]].allow.length; j++) {
          perms = `${perms}
${sentenceCase(obj[keys[i]].allow[j])}: ✅`;
        }
        for (j = 0; j < obj[keys[i]].deny.length; j++) {
          perms = `${perms}
${sentenceCase(obj[keys[i]].deny[j])}: ❌`;
        }
      }
    }

    if (perms.length) {
      channelCreateEmbed.addField('Permission overwrites:', perms);
    }

    //logging
    logsChannel.send(channelCreateEmbed).catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

module.exports = channelCreateLog;
