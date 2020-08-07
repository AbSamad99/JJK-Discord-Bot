/*Used to check the content of the message sent by the user and determine if the are commands, discord links,
links to nsfw sites, etc*/

// const urlExist = require('url-exist');

const {
  weebResponse,
  nfufuResponse,
  bestModResponse,
  otherSeriesTalkResponse,
  xSeriesSucksResponse,
} = require('../../Functions/responseFunctions');

//importing required Check functions
const {
  containsDiscordLinkCheck,
  containsForbiddenLinkCheck,
} = require('../../Checks/Other/moderationHelpCheck.js');
const prefixCommandFunction = require('../../Checks/Command/prefixCommandTypeCheck.js');
const {
  xSeriesSucksCheck,
  weebCheck,
  otherSeriesTalkCheck,
} = require('../../Checks/Other/miscChecks.js');
const { roleCheck } = require('../../Checks/Other/helperChecks.js');

const messageCaseHandler = async (msg, client, myCache) => {
  let temp = msg.content.toLowerCase();
  //checks from command
  if (temp.startsWith('-')) {
    prefixCommandFunction(msg, temp, myCache);
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
    // let temp;
    if (
      !roleCheck(msg.member, 'Special-Grade Shaman') &&
      !roleCheck(msg.member, 'admin')
    ) {
      msg.delete().catch(console.error);
      // console.log(msg.content);
      // temp = await client.fetchInvite(msg.content);
      // console.log({
      //   owner: temp.guild.owner ? temp.guild.owner.user.tag : null,
      //   name: temp.guild.name,
      //   memberCount: temp.memberCount,
      //   code: temp.code,
      // });
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
    msg.channel.send(`It's Sukuna`).catch(console.log);
  }

  //series sucks response
  if (xSeriesSucksCheck(temp)) {
    xSeriesSucksResponse(msg);
  }

  // //tells people to go to other series
  // else if (otherSeriesTalkCheck(msg, temp)) {
  //   otherSeriesTalkResponse(msg);
  // }

  if (temp.includes('tuturu') && msg.author.id === '434443106847424513') {
    msg.channel
      .send(
        'https://cdn.discordapp.com/attachments/720958791432011789/740882166694543421/Studio_Project.jpeg'
      )
      .catch(console.log);
  }
};

module.exports = messageCaseHandler;
