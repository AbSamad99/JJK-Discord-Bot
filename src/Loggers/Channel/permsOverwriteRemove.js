/*Function to log overwrite deletion*/

const Discord = require('discord.js');
const { sentenceCase } = require('change-case');

const gifOrPngCheck = require('../../Checks/Other/gifOrPngCheck');

const permsOverwriteRemoveLog = async (
  executor,
  permsObject,
  logsChannel,
  channel
) => {
  try {
    let overwriteEmbed, allowed, denied, i;
    overwriteEmbed = new Discord.MessageEmbed()
      .setAuthor(executor.tag, await gifOrPngCheck(executor))
      .setColor(10038562)
      .setTitle('Permission overwrite removed')
      .setDescription(
        `The permission overwrite for ${permsObject.roleOrUser} has been removed in ${channel}`
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

module.exports = permsOverwriteRemoveLog;
