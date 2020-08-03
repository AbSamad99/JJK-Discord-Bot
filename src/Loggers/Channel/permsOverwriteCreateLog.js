/*Function to log creation of perm overwrite*/

const Discord = require('discord.js');
const { sentenceCase } = require('change-case');

const gifOrPngCheck = require('../../Checks/gifOrPngCheck');

const permsOverwriteCreateLog = async (
  executor,
  permsObject,
  logsChannel,
  channel
) => {
  try {
    let overwriteEmbed, allowed, denied, i;
    overwriteEmbed = new Discord.MessageEmbed()
      .setAuthor(executor.tag, await gifOrPngCheck(executor))
      .setColor(3066993)
      .setTitle('Permission overwrite created')
      .setDescription(
        `A permission overwrite for ${permsObject.roleOrUser} has been created in ${channel}`
      )
      .setFooter(new Date());

    if (permsObject.allow.length) {
      allowed = ``;
      for (i = 0; i < permsObject.allow.length; i++) {
        allowed = `${allowed}
${sentenceCase(permsObject.allow[i])}`;
      }
      overwriteEmbed.addField('Allowed Permissions:', allowed, true);
    }

    if (permsObject.deny.length) {
      denied = ``;
      for (i = 0; i < permsObject.deny.length; i++) {
        denied = `${denied}
${sentenceCase(permsObject.deny[i])}`;
      }
      overwriteEmbed.addField('Denied Permissions:', denied, true);
    }

    logsChannel.send(overwriteEmbed).catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

module.exports = permsOverwriteCreateLog;
