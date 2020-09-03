/*Used to check the content of the message sent by the user and determine if the are commands, discord links,
links to nsfw sites, etc*/

// const urlExist = require('url-exist');

const {
  weebResponse,
  nfufuResponse,
  bestModResponse,
  xSeriesSucksResponse,
} = require('../../Functions/responseFunctions');

//importing required Check functions
const discordLinkPostedLog = require('../../Loggers/Others/discordLinkPostedLog');
const commandsObject = require('../../commandsObject.js');
const {
  weebArray,
  sukunaArray,
  sucksArray,
  discorLinksArray,
  forbiddenLinksArray,
} = require('../../checkArrays');

const messageCaseHandler = async (msg) => {
  try {
    let temp = msg.content.toLowerCase();
    //checks from command
    if (temp.startsWith('-')) {
      let keyword = temp.slice(1);
      keyword = keyword.split(' ');
      keyword = keyword[0];

      let requiredCommand = commandsObject[keyword];

      if (requiredCommand) {
        if (requiredCommand.constructor.name === 'AsyncFunction')
          requiredCommand(msg).catch(console.log);
        else requiredCommand(msg);
      }
    }
    //checks if the image or link provided contains nsfw content
    // if (
    //   (await urlExist(msg.content)) &&
    //   (msg.content.includes('png') ||
    //     msg.content.includes('jpg') ||
    //     msg.content.includes('jpeg') ||
    //     msg.content.includes('gif'))
    // ) {
    //   try {
    //     console.log('1');
    //     if (await nsfwCheck(msg.content)) {
    //       msg.delete();
    //     }
    //   } catch (err) {
    //     console.error(err);
    //   }
    // } else if (msg.attachments.array().length) {
    //   console.log('2');
    //   msg.attachments.array().forEach(async (attch) => {
    //     if (await nsfwCheck(attch.url)) {
    //       msg.delete();
    //     }
    //   });
    // }

    //checks if it contains a forbidden link
    if (forbiddenLinksArray.some((l) => temp.includes(l))) {
      msg
        .reply('Please do not post links to NSFW sites')
        .then(() => msg.delete())
        .catch(console.error);
    }

    //checks if it contains discord inv link
    if (discorLinksArray.some((l) => temp.includes(l))) {
      // let temp;
      if (
        !msg.member.roles.cache.has(
          '447512454810042369'
        ) /*Special Grade role*/ &&
        !msg.member.roles.cache.has('447512449248395267') /*admin role*/
      ) {
        msg
          .reply('Please do not post invites')
          .then(() => msg.delete())
          .catch(console.error);
      }
      await discordLinkPostedLog(msg).catch(console.log);
    }

    //mod response
    if (temp.includes('mod')) {
      bestModResponse(msg, temp);
    }

    //nfufu response
    if (temp.includes('nfufu')) {
      nfufuResponse(msg);
    }

    //weeb response
    else if (weebArray.some((w) => temp.includes(w))) {
      weebResponse(msg);
    }

    //sakuna response
    if (sukunaArray.some((s) => temp.includes(s))) {
      msg.channel.send(`It's Sukuna`).catch(console.log);
    }

    //series sucks response
    if (sucksArray.some((s) => temp === s)) {
      xSeriesSucksResponse(msg);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = messageCaseHandler;
