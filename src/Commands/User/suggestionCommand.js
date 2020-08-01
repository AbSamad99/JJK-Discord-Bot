/*functions to handle the various user commands*/

const Discord = require('discord.js');
const ms = require('ms');

const { channelCheck, roleCheck } = require('../../Checks/helperChecks.js');
const gifOrPngCheck = require('../../Checks/gifOrPngCheck.js');

//makes a suggestion embed-user
const suggestionCommand = async (msg) => {
  try {
    let suggestEmbed, temp, message, index;

    //checking is the command was made in channels apart from the permitted channels
    if (
      !channelCheck(msg, 'server-suggestions') &&
      !roleCheck(msg.member, 'Special-Grade Shaman') &&
      !roleCheck(msg.member, 'admin')
    )
      return;

    //getting info from the message
    temp = msg.content.slice(1);
    temp = temp.split(' ');

    //checking if any suggestion was given or not
    if (temp.length < 2) {
      msg.channel.send(`Provide an input`);
      return;
    }

    //checking if suggestion is less than 10 words
    if (temp.length < 11) {
      msg.channel.send('Input must contain at least 10 words');
      return;
    }

    //constructing the message
    message = temp[1];
    for (index = 2; index < temp.length; index++) {
      message = `${message} ${temp[index]}`;
    }

    //constructing the embed
    suggestEmbed = new Discord.MessageEmbed()
      .setAuthor(msg.author.tag, await gifOrPngCheck(msg.author))
      .setTitle('Suggestion')
      .setColor(msg.member.displayColor)
      .setDescription(
        `${msg.author} has provided a suggestion, react to either 👍 or 👎 to vote in favour of the suggestion or against it respectively. Feel free to discuss for and against this suggestion here.`
      )
      .addField('Suggestion', message)
      .setFooter(new Date());

    //checking to see if any image was given
    if (msg.attachments.array()[0]) {
      suggestEmbed.setImage(msg.attachments.array()[0].url);
    }

    //sending the embed
    msg.channel
      .send(suggestEmbed)
      .then((botMsg) => {
        botMsg.react('👍');
        botMsg.react('👎');
      })
      .then(() => msg.delete())
      .catch(console.error);

    // setTimeout(() => {
    //   msg.delete().catch(console.error);
    // }, ms('2s'));
  } catch (err) {
    console.log(err);
  }
};

module.exports = suggestionCommand;
