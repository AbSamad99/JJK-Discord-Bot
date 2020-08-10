/*Checks to see which type of welcome command was input by the user*/

const { todoLink, shyLink, guyLink } = require('../../links.js');

const welcomeCommandTypeCheck = (msg, keyword) => {
  try {
    //todo command
    if (
      keyword === 'todo' &&
      (msg.channel.id === '704934870622797904' /*Welcome channel*/ ||
        msg.channel.id === '720958791432011789') /*Syed bot channel*/
    ) {
      msg.channel.send(todoLink).catch(console.error);
    }

    //welcome command
    if (
      keyword === 'welcome' &&
      (msg.channel.id === '704934870622797904' /*Welcome channel*/ ||
        msg.channel.id === '720958791432011789') /*Syed bot channel*/
    ) {
      let message = `Welcome newbie, we have three questions for you:
1. Are you up to date on the Jujutsu Kaisen manga?
2. Have you read the prequel?
3. Can Todo ask you a woke question?`;
      msg.channel.send(message).catch(console.error);
    }

    //guy command
    if (
      keyword === 'guy' &&
      (msg.channel.id === '704934870622797904' /*Welcome channel*/ ||
        msg.channel.id === '720958791432011789') /*Syed bot channel*/
    ) {
      msg.channel.send(guyLink).catch(console.error);
    }

    //shy command
    if (
      keyword === 'shy' &&
      (msg.channel.id === '704934870622797904' /*Welcome channel*/ ||
        msg.channel.id === '720958791432011789') /*Syed bot channel*/
    ) {
      msg.channel.send(shyLink).catch(console.error);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = welcomeCommandTypeCheck;
