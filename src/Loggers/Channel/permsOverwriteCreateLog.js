/*Function to log creation of perm overwrite*/

const Discord = require('discord.js');
const gifOrPngCheck = require('../../Checks/gifOrPngCheck');

const permsOverwriteCreateLog = async (
  executor,
  permsObject,
  logsChannel,
  channel
) => {
  try {
    let overwriteEmbed;
    overwriteEmbed = new Discord.MessageEmbed()
      .setAuthor(executor.tag, await gifOrPngCheck(executor))
      .setColor(3066993)
      .setTitle('Permission overwrite created')
      .setDescription(
        `A permission overwrite for ${permsObject.roleOrUser} has been created in ${channel}`
      )
      .setFooter(new Date());
    //   console.log(permsObject);
    logsChannel.send(overwriteEmbed).catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

module.exports = permsOverwriteCreateLog;
