import { editMessageLog } from '../Functions/Loggers/loggingFunctions.js';

import { userArray } from '../utilities';

export const messageUpdateCaseHandler = async (oldMsg, newMsg) => {
  try {
    let honoredOne = await userArray.find(
      (user) => user.name === 'The Honored One'
    );
    if (
      newMsg.author.id !== honoredOne.id &&
      oldMsg.content !== newMsg.content
    ) {
      try {
        await editMessageLog(oldMsg, newMsg);
      } catch (error) {
        console.log(error);
      }
    }
  } catch (err) {
    console.log(err);
  }
};
