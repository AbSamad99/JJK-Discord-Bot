/*Function to handle the add debate character command*/

const DebateSchema = require('../../Schemas/DebateSchema.js');

const editDebateCharacterCommand = async (msg) => {
  try {
    let charArray, temp, index;

    //getting the array from db
    charArray = await DebateSchema.findOne({ _id: '5f26cc89a8c67f48085af72f' });
    charArray = charArray.names;

    //getting required info from message
    temp = msg.content.slice(1);
    temp = temp.split(' ');

    //checking if name was given
    if (!temp[1]) {
      msg.channel.send('Please provide a character name');
      return;
    }

    if (!temp[2]) {
      msg.channel.send('Please provide a new name');
      return;
    }

    //finding index of char
    index = charArray.findIndex((name) => name === temp[1]);

    //checking if name is present
    if (index === -1) {
      msg.channel.send('No such character present');
      return;
    }

    charArray.splice(index, 1);

    //adding to database
    charArray.push(temp[2].toLowerCase());
    await DebateSchema.findOneAndUpdate(
      { _id: '5f26cc89a8c67f48085af72f' },
      { names: charArray }
    );

    msg.channel.send(`Edited character name`).catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

module.exports = editDebateCharacterCommand;
