/*Function to handle the remove debate character command*/

const DebateSchema = require('../../Schemas/DebateSchema.js');

const removeDebateCharacterCommand = async (msg) => {
  let charArray, temp, index;

  //getting the array from db
  charArray = await DebateSchema.findOne({ _id: '5f26cc89a8c67f48085af72f' });
  charArray = charArray.names;

  //getting required info from message
  temp = msg.content.slice(1);
  temp = temp.split(' ');

  //checking if name was given
  if (!temp[1]) {
    msg.channel.send('Please provide a character');
    return;
  }

  //checking if name is already present
  if (!charArray.includes(temp[1])) {
    msg.channel.send('No such character exists');
    return;
  }

  //removing from the database
  index = charArray.findIndex((char) => char === temp[1]);
  charArray.splice(index, 1);
  await DebateSchema.findOneAndUpdate({ id: 1 }, { names: charArray });

  msg.channel.send(`Removed character ${temp[1]}`).catch(console.log);
};

module.exports = removeDebateCharacterCommand;
