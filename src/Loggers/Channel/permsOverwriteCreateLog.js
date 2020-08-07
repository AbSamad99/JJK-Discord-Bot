/*Function to log creation of perm overwrite*/

const { MessageEmbed } = require('discord.js');
const { sentenceCase } = require('change-case');

const gifOrPngCheck = require('../../Checks/Other/gifOrPngCheck');

const permsOverwriteCreateLog = async (
  executor,
  permsObject,
  logsChannel,
  channel
) => {
  let overwriteEmbed, allowed, denied, i;
  overwriteEmbed = new MessageEmbed()
    .setAuthor(executor.tag, await gifOrPngCheck(executor))
    .setColor(3066993)
    .setTitle('Permission overwrite created')
    .setDescription(
      `Permission overwrites for ${permsObject.roleOrUser} created in ${channel}`
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

module.exports = permsOverwriteCreateLog;
