/*Function to handle the debate command*/

const prettyMilliseconds = require('pretty-ms');
const { MessageEmbed } = require('discord.js');
const { capitalCase } = require('change-case');

const DebateSchema = require('../../Schemas/DebateSchema.js');
const { myCache } = require('../../app.js');
const ms = require('ms');

const debateCommand = async (msg) => {
  if (
    msg.channel.id !== '713119662337949757' && //debates channel
    msg.channel.id !== '720958791432011789' //syed bot channel
  )
    return;

  let char1, char2, charArray, debateEmbed, temp;

  temp = myCache.get('debateTimeoutActive');

  if (temp.status) {
    msg.channel.send(
      `The command is on a cooldown, time left: ${prettyMilliseconds(
        temp.timeStamp - Date.now(),
        { compact: true }
      )}`
    );
    return;
  }

  //fetching from db
  charArray = await DebateSchema.findOne({ _id: '5f26cc89a8c67f48085af72f' });
  charArray = charArray.names;

  //getting 2 random chars
  char1 = charArray[Math.floor(Math.random() * charArray.length)];
  char2 = charArray[Math.floor(Math.random() * charArray.length)];
  while (char1 === char2) {
    char2 = charArray[Math.floor(Math.random() * charArray.length)];
  }
  //creating the embed
  debateEmbed = new MessageEmbed()
    .setTitle('Versus battle!')
    .setDescription(
      'Debate between who emerges victorious when these two characters face off!'
    )
    .setColor(10181046)
    .addField('Contestant 1:', capitalCase(char1), true)
    .addField('Contestant 2:', capitalCase(char2), true);

  //sending the embed
  msg.channel
    .send(debateEmbed)
    .then(() => {
      myCache.del('debateTimeoutActive');
      myCache.set('debateTimeoutActive', {
        status: true,
        timeStamp: Date.now() + ms('15m'),
      });
      setTimeout(() => {
        myCache.del('debateTimeoutActive');
        myCache.set('debateTimeoutActive', {
          status: false,
        });
      }, ms('15m'));
    })
    .catch(console.log);
};

module.exports = debateCommand;
