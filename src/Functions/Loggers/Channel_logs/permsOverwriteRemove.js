const Discord = require('discord.js');
const gifOrPngCheck = require('../../Checks/gifOrPngCheck');

const permsOverwriteRemoveLog = async (
  executor,
  permsObject,
  logsChannel,
  channel
) => {
  try {
    let overwriteEmbed;
    overwriteEmbed = new Discord.MessageEmbed()
      .setAuthor(executor.tag, await gifOrPngCheck(executor))
      .setColor(10038562)
      .setTitle('Permission overwrite removed')
      .setDescription(
        `The permission overwrite for ${permsObject.roleOrUser} has been removed in ${channel}`
      )
      .setFooter(new Date());
    //   console.log(permsObject);
    logsChannel.send(overwriteEmbed).catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

module.exports = permsOverwriteRemoveLog;
