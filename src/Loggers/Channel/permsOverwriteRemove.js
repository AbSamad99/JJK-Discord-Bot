/*Function to log overwrite deletion*/

const { MessageEmbed } = require('discord.js');
const { sentenceCase } = require('change-case');

const gifOrPngCheck = require('../../Helpers/gifOrPngCheck');

const permsOverwriteRemoveLog = async (
  executor,
  permsObject,
  logsChannel,
  channel
) => {
  let overwriteEmbed, allowed, denied, i;
  overwriteEmbed = new MessageEmbed()
    .setAuthor(executor.tag, await gifOrPngCheck(executor))
    .setColor(10038562)
    .setTitle('Permission overwrite removed')
    .setDescription(
      `Permission overwrites for ${permsObject.roleOrUser} removed in ${channel}`
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
};

module.exports = permsOverwriteRemoveLog;
