const { todoLink, shyLink, guyLink } = require('../../links');

const welcomeCommands = (msg) => {
  if (
    !(
      msg.channel.id === '704934870622797904' /*Welcome channel*/ ||
      msg.channel.id === '720958791432011789'
    ) /*Syed bot channel*/
  )
    return;

  let temp;

  //getting required keyword
  temp = msg.content.slice(1);
  temp = temp.split(' ');
  temp[0]=temp[0].toLowerCase();

  if (temp[0] === 'todo') msg.channel.send(todoLink).catch(console.error);

  if (temp[0] === 'shy') msg.channel.send(shyLink).catch(console.error);

  if (temp[0] === 'guy') msg.channel.send(guyLink).catch(console.error);

  if (temp[0] === 'questions') {
    let message = `Welcome newbie, we have four questions for you:
1. Are you a manga reader or an anime-only?
2. Are you up to date on the Jujutsu Kaisen manga?
3. Have you read the prequel?
4. Can Todo ask you a woke question?`;

    msg.channel.send(message).catch(console.error);
  }
};

module.exports = welcomeCommands;
