const Discord = require('discord.js');

const checkIfGifOrPng = require('../Helpers/checkIfGifOrPng.js');

const userLeaveLog = async (mem, modChannel) => {
  try {
    let leaveEmbed, authorUrl;

    //setting relevant fields
    authorUrl = await checkIfGifOrPng(mem.user);

    leaveEmbed = new Discord.MessageEmbed()
      .setAuthor(mem.user.tag, authorUrl)
      .setTitle('Member Left')
      .setColor(3447003)
      .setDescription(`<@${mem.user.id}> has left the server`)
      .setFooter(new Date());

    modChannel.send(leaveEmbed).catch(console.logy);
  } catch (err) {
    console.log(err);
  }
};

module.exports = userLeaveLog;
