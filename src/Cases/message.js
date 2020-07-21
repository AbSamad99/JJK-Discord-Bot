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

const messageCaseHandler = (msg) => {
  try {
    //checks from commannd
    if (msg.content.startsWith(prefix)) {
      prefixCommandFunction(msg);
    }
    //checks if it contains a forbidden link
    if (containsForbiddenLinkCheck(msg)) {
      msg.delete().catch(console.log);
      msg
        .reply('Please refrain from posting links to NSFW sites')
        .catch(console.log);
    }
    //checks if it contains discord inv link
    if (containsDiscordLinkCheck(msg)) {
      if (!roleCheck(msg.member, 'Special-Grade Shaman')) {
        msg.delete().catch(console.log);
        msg.channel
          .reply('Please do not link invites to other servers')
          .catch(console.log);
      } else {
        console.log('mod');
      }
    }
    //mod response
    if (msg.content.toLowerCase().includes('mod')) {
      bestModResponse(msg);
    }
    //nfufu response
    if (msg.content.toLowerCase().includes('nfufu')) {
      nfufuResponse(msg);
    }
    //weeb response
    else if (weebCheck(msg)) {
      weebResponse(msg);
    }
    //sakuna response
    if (
      msg.content.toLowerCase().includes('sakuna') ||
      msg.content.toLowerCase().includes('sukana') ||
      msg.content.toLowerCase().includes('sakana')
    ) {
      msg.channel.send(`It's Sukuna`);
    }
    //series sucks response
    if (xSeriesSucksCheck(msg)) {
      xSeriesSucksResponse(msg);
    }
    // //tells people to go to other series
    // else if (otherSeriesTalkCheck(msg)) {
    //   otherSeriesTalkResponse(msg);
    // }
  } catch (err) {
    console.log(err);
  }
};

module.exports = messageCaseHandler;
