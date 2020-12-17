/*functions to handle the various user commands*/

const { MessageEmbed } = require('discord.js');

const ms = require('ms');

const gifOrPngCheck = require('../../Helpers/gifOrPngCheck.js');

//makes a suggestion embed-user
const suggestionCommand = async (msg) => {
  //checking is the command was made in channels apart from the permitted channels
  if (
    !(msg.channel.id === '491422518955999263' /*Server management channel*/ ||
      msg.member.roles.cache.has('447512454810042369') /*Special Grade role*/ ||
      msg.member.roles.cache.has('447512449248395267')) /*admin role*/
  )
    return;

  let suggestEmbed, temp, suggestion;

  //getting info from the suggestion
  temp = msg.content.split(' ');
  temp.splice(0, 1);

  //checking if any suggestion was given or not
  if (!temp.length) {
    msg.channel.send(`Provide an input`).catch(console.log);
    return;
  }

  //checking if suggestion is less than 10 words
  if (temp.length < 10) {
    msg.channel.send('Input must contain at least 10 words').catch(console.log);
    return;
  }

  //constructing the suggestion
  suggestion = temp.join(' ');

  //constructing the embed
  suggestEmbed = new MessageEmbed()
    .setAuthor(msg.author.tag, await gifOrPngCheck(msg.author))
    .setTitle('Suggestion')
    .setColor(msg.member.displayColor)
    .setDescription(suggestion)
    .addField(
      'Info',
      `${msg.author} has provided this suggestion, react to either 👍 or 👎 to vote in favour of the suggestion or against it respectively. Feel free to discuss for and against this suggestion here.`
    )
    .setFooter(new Date());

  //checking to see if any image was given
  if (msg.attachments.array()[0]) {
    suggestEmbed.setImage(msg.attachments.array()[0].url);
  }

  //sending the embed
  msg.channel
    .send(suggestEmbed)
    .then(async (botMsg) => {
      await botMsg.react('👍');
      await botMsg.react('👎');
    })
    .catch(console.error);

  setTimeout(() => {
    msg.delete().catch(console.error);
  }, ms('3s'));
};

module.exports = suggestionCommand;
