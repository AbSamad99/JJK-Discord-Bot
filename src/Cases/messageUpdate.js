const fs = require('fs');

const editMessageLog = require('../Functions//Loggers/messageUpdateLog.js');

const messageUpdateCaseHandler = async (oldMsg, newMsg) => {
  try {
    const userArray = JSON.parse(
      fs.readFileSync(`${process.cwd()}/src/Json-Files/users.json`)
    );

    let honoredOne = await userArray.find(
      (user) => user.name === 'The Honored One'
    );
    if (
      newMsg.author.id !== honoredOne.id &&
      oldMsg.content !== newMsg.content
    ) {
      try {
        await editMessageLog(oldMsg, newMsg);
      } catch (err) {
        console.log(err);
      }
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = messageUpdateCaseHandler;
