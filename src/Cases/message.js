// const urlExist = require('url-exist');
const { prefix } = require('../utilities.js');

const {
  weebResponse,
  nfufuResponse,
  bestModResponse,
  otherSeriesTalkResponse,
  xSeriesSucksResponse,
} = require('../Functions/Responses/responseFunctions');

//importing required Check functions
const {
  containsDiscordLinkCheck,
  containsForbiddenLinkCheck,
} = require('../Functions/Checks/moderationHelpCheck.js');
const prefixCommandFunction = require('../Functions/Checks/prefixCommandTypeCheck.js');
const {
  xSeriesSucksCheck,
  weebCheck,
  otherSeriesTalkCheck,
} = require('../Functions/Checks/miscChecks.js');
const { roleCheck } = require('../Functions/Checks/helperChecks.js');
// const nsfwCheck = require('../Functions/Checks/nsfwCheck.js');

const messageCaseHandler = (msg) => {
  try {
    let temp = msg.content.toLowerCase();
    //checks from commannd
    if (msg.content.startsWith(prefix)) {
      prefixCommandFunction(msg, temp);
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
    if (containsForbiddenLinkCheck(temp)) {
      msg.delete().catch(console.error);
      msg
        .reply('Please refrain from posting links to NSFW sites')
        .catch(console.error);
    }
    //checks if it contains discord inv link
    if (containsDiscordLinkCheck(temp)) {
      if (
        !roleCheck(msg.member, 'Special-Grade Shaman') &&
        !roleCheck(msg.member, 'admin')
      ) {
        msg.delete().catch(console.error);
        msg.channel
          .reply('Please do not link invites to other servers')
          .catch(console.error);
      }
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
    else if (weebCheck(msg, temp)) {
      weebResponse(msg);
    }
    //sakuna response
    if (
      temp.includes('sakuna') ||
      temp.includes('sukana') ||
      temp.includes('sakana')
    ) {
      msg.channel.send(`It's Sukuna`);
    }
    //series sucks response
    if (xSeriesSucksCheck(temp)) {
      xSeriesSucksResponse(msg);
    }
    // //tells people to go to other series
    // else if (otherSeriesTalkCheck(msg, temp)) {
    //   otherSeriesTalkResponse(msg);
    // }
  } catch (err) {
    console.log(err);
  }
};

module.exports = messageCaseHandler;
