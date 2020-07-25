const urlExists = require('url-exist');

const checkIfGifOrPng = async (user1, user2) => {
  try {
    if (!user1) {
      if (
        await urlExists(
          `https://cdn.discordapp.com/avatars/${user2.id}/${user2.avatar}.gif?size=256`
        )
      ) {
        return `https://cdn.discordapp.com/avatars/${user2.id}/${user2.avatar}.gif?size=256`;
      } else if (
        await urlExists(
          `https://cdn.discordapp.com/avatars/${user2.id}/${user2.avatar}.png?size=256`
        )
      ) {
        return `https://cdn.discordapp.com/avatars/${user2.id}/${user2.avatar}.png?size=256`;
      } else {
        return user2.avatarUrl;
      }
    } else {
      if (
        await urlExists(
          `https://cdn.discordapp.com/avatars/${user1.id}/${user1.avatar}.gif?size=256`
        )
      ) {
        return `https://cdn.discordapp.com/avatars/${user1.id}/${user1.avatar}.gif?size=256`;
      } else if (
        await urlExists(
          `https://cdn.discordapp.com/avatars/${user1.id}/${user1.avatar}.png?size=256`
        )
      ) {
        return `https://cdn.discordapp.com/avatars/${user1.id}/${user1.avatar}.png?size=256`;
      } else {
        return user1.displayAvatarURL();
      }
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = checkIfGifOrPng;
