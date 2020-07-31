const Discord = require('discord.js');
const gifOrPngCheck = require('../../Checks/gifOrPngCheck');

const permsOverwriteEditLog = async (
  executor,
  oldPermsObject1,
  newPermsObject1,
  oldPermsObject2,
  newPermsObject2,
  logsChannel,
  channel
) => {
  try {
    let overwriteEmbed, changes;

    overwriteEmbed = new Discord.MessageEmbed()
      .setAuthor(executor.tag, await gifOrPngCheck(executor))
      .setColor(15854089)
      .setTitle('Permission overwrite edited')
      .setFooter(new Date());

    if (!newPermsObject2 && !oldPermsObject2) {
      let newAllowedPermsFilter, oldDeniedPermsFilter;
      changes = ``;
      newAllowedPermsFilter = newPermsObject1.allow.filter(
        (perm) => !oldPermsObject1.allow.includes(perm)
      );
      oldDeniedPermsFilter = oldPermsObject1.deny.filter(
        (perm) => !newPermsObject1.deny.includes(perm)
      );
      newAllowedPermsFilter.forEach((perm) => {
        if (oldDeniedPermsFilter.includes(perm)) {
          changes = `${changes}
${perm}: ❌ ➜ ✅`;
        } else {
          changes = `${changes}
${perm}: ⬜ ➜ ✅`;
        }
      });
      oldDeniedPermsFilter.forEach((perm) => {
        if (!newAllowedPermsFilter.includes(perm)) {
          changes = `${changes}
${perm}: ❌ ➜ ⬜`;
        }
      });

      overwriteEmbed.setDescription(
        `A permission overwrite for ${newPermsObject1.roleOrUser} has been edited in ${channel}:
${changes}`
      );
    } else {
      let oldAllowedPermsFilter, newDeniedPermsFilter;
      changes = ``;
      oldAllowedPermsFilter = oldPermsObject2.allow.filter(
        (perm) => !newPermsObject2.allow.includes(perm)
      );
      newDeniedPermsFilter = newPermsObject2.deny.filter(
        (perm) => !oldPermsObject2.deny.includes(perm)
      );
      oldAllowedPermsFilter.forEach((perm) => {
        if (newDeniedPermsFilter.includes(perm)) {
          changes = `${changes}
${perm}: ✅ ➜ ❌`;
        } else {
          changes = `${changes}
${perm}: ✅ ➜ ⬜`;
        }
      });
      newDeniedPermsFilter.forEach((perm) => {
        if (!oldAllowedPermsFilter.includes(perm)) {
          changes = `${changes}
${perm}: ⬜ ➜ ❌`;
        }
      });

      overwriteEmbed.setDescription(
        `A permission overwrite for ${newPermsObject2.roleOrUser} has been edited in ${channel}:
${changes}`
      );
    }

    //   console.log(permsObject);
    logsChannel.send(overwriteEmbed).catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

module.exports = permsOverwriteEditLog;
