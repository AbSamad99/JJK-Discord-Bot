/*Used to check the content of the message sent by the user and determine if the are commands, discord links,
links to nsfw sites, etc*/

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
  if (msg.author.bot) return;
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

  //sakuna response
  if (sukunaArray.some((s) => temp.includes(s))) {
    msg.channel.send(`It's Sukuna`).catch(console.log);
  }

  //weeb response
  else if (weebArray.some((w) => temp.includes(w))) {
    weebResponse(msg);
  }

  //nfufu response
  if (temp.includes('nfufu')) {
    nfufuResponse(msg);
  }

  // //mod response
  // if (temp.includes('mod')) {
  //   bestModResponse(msg, temp);
  // }

  // //series sucks response
  // if (sucksArray.some((s) => temp === s)) {
  //   xSeriesSucksResponse(msg);
  // }

  //boost check
  if (
    msg.type == 'USER_PREMIUM_GUILD_SUBSCRIPTION' &&
    msg.channel.id == '447513385211396096'
  ) {
    let msgArray, times, user1, user2, announcementChannel, chuuDo;
    chuuDo = msg.guild.emojis.cache.get('578526612421738526');
    announcementChannel = msg.guild.channels.cache.get('720958791432011789');
    try {
      // announcementChannel.send(msg.content).catch(console.log);
      console.log(msg);
      console.log(msg.content);
      announcementChannel.send(`Server was boosted`);
      msgArray = msg.content.split(' ');
      user1 = msgArray[0];
      user2 = msg.mentions.users.array()[0];
      announcementChannel.send(`${user2}`).catch(console.log);
      times = 1;
      if (msgArray.length > 5) {
        times = msgArray[5];
      }
      announcementChannel.send(
        `Thank you for boosting the server${
        times > 1 ? ` ${times} times` : ``
        } ${user1}, ${user2}`
      ).catch(console.log);
    } catch (err) {
      console.error(err);
      announcementChannel.send(`There was an error`).catch(console.log)
    }
  }
};

module.exports = messageCaseHandler;
