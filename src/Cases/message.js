import { prefix } from '../utilities';

import {
  weebResponse,
  nfufuResponse,
  bestModResponse,
  otherSeriesTalkResponse,
  xSeriesSucksResponse,
} from '../Functions/Responses/responseFunctions';

//importing required Check functions
import { modPermsCheck } from '../Functions/Checks/RoleChecks.js';
import {
  isSuggestionCheck,
  containsDiscordLinkCheck,
  containsForbiddenLinkCheck,
} from '../Functions/Checks/moderationHelpCheck.js';
import { prefixCommandFunction } from '../Functions/Checks/prefixCommandTypeCheck.js';
import {
  xSeriesSucksCheck,
  weebCheck,
  otherSeriesTalkCheck,
} from '../Functions/Checks/miscChecks.js';

export const messageCaseHandler = (msg) => {
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
      if (!modPermsCheck(msg)) {
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
    //checks if the message is a suggestion
    if (isSuggestionCheck(msg)) {
      msg
        .react('👍')
        .then(() => msg.react('👎'))
        .catch(console.log);
    }
  } catch (err) {
    console.log(err);
  }
};
