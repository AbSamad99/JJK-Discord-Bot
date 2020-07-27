const Discord = require('discord.js');

const checkIfGifOrPng = require('../Helpers/checkIfGifOrPng.js');

const userLeaveLog = async (mem, logsChannel) => {
  try {
    let leaveEmbed;

    //setting relevant fields
    leaveEmbed = new Discord.MessageEmbed()
      .setAuthor(mem.user.tag, await checkIfGifOrPng(mem.user))
      .setTitle('Member Left')
      .setColor(3447003)
      .setDescription(`<@${mem.user.id}> has left the server`)
      .setFooter(new Date());

    logsChannel.send(leaveEmbed).catch(console.logy);
  } catch (err) {
    console.log(err);
  }
};

module.exports = userLeaveLog;
