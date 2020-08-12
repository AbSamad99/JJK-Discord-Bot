const {
  prequelLink,
  fujoLink,
  encyclopediaLink,
  catalogueLink,
  chartLink,
} = require('../../links');

const miscCommands = (msg) => {
  try {
    let temp;

    //getting required keyword
    temp = msg.content.slice(1);
    temp = temp.split(' ');

    if (
      temp[0] === 'prequel' &&
      (msg.channel.id === '704934870622797904' /*Welcome channel*/ ||
      msg.channel.id === '720958791432011789' /*Syed bot channel*/ ||
        msg.channel.id === '447514061769277450') /*Manga channel*/
    )
      msg.channel.send(prequelLink).catch(console.error);

    if (temp[0] === 'fujo') msg.channel.send(fujoLink).catch(console.error);

    if (temp[0] === 'encyclopedia')
      msg.channel.send(encyclopediaLink).catch(console.error);

    if (temp[0] === 'chart') msg.channel.send(chartLink).catch(console.error);

    if (temp[0] === 'catalogue')
      msg.channel.send(catalogueLink).catch(console.error);

    if (temp[0] === 'wiki') msg.channel.send(wikiLink).catch(console.error);
  } catch (err) {
    console.log(err);
  }
};

module.exports = miscCommands;
