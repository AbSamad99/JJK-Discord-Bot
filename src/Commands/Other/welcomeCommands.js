const { todoLink, shyLink, guyLink } = require('../../links');

const welcomeCommands = (msg) => {
  let temp;

  //getting required keyword
  temp = msg.content.slice(1);
  temp = temp.split(' ');

  if (
    temp[0] === 'todo' &&
    (msg.channel.id === '704934870622797904' /*Welcome channel*/ ||
      msg.channel.id === '720958791432011789') /*Syed bot channel*/
  )
    msg.channel.send(todoLink).catch(console.error);

  if (
    temp[0] === 'shy' &&
    (msg.channel.id === '704934870622797904' /*Welcome channel*/ ||
      msg.channel.id === '720958791432011789') /*Syed bot channel*/
  )
    msg.channel.send(shyLink).catch(console.error);

  if (
    temp[0] === 'guy' &&
    (msg.channel.id === '704934870622797904' /*Welcome channel*/ ||
      msg.channel.id === '720958791432011789') /*Syed bot channel*/
  )
    msg.channel.send(guyLink).catch(console.error);

  if (
    temp[0] === 'welcome' &&
    (msg.channel.id === '704934870622797904' /*Welcome channel*/ ||
      msg.channel.id === '720958791432011789') /*Syed bot channel*/
  ) {
    let message = `Welcome newbie, we have three questions for you:
1. Are you up to date on the Jujutsu Kaisen manga?
2. Have you read the prequel?
3. Can Todo ask you a woke question?`;

    msg.channel.send(message).catch(console.error);
  }
};

module.exports = welcomeCommands;
