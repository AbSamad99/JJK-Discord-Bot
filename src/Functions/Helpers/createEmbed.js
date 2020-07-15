const Discord = require('discord.js');

const createEmbed = (
  authorName,
  authorUrl,
  title,
  color,
  field1,
  field2,
  thumbnail,
  description,
  image
) => {
  let discorEmbed = new Discord.MessageEmbed()
    .setAuthor(authorName, authorUrl)
    .setTitle(title)
    .setColor(color)
    .setFooter(new Date());
  if (thumbnail) {
    discorEmbed.setThumbnail(thumbnail);
  }
  if (field1) {
    discorEmbed.addField(field1.title, field1.content);
  }
  if (field2) {
    discorEmbed.addField(field2.title, field2.content);
  }
  if (description) {
    discorEmbed.setDescription(description);
  }
  if (image) {
    discorEmbed.setImage(image);
  }
  return discorEmbed;
};

module.exports = {
  createEmbed: createEmbed,
};
