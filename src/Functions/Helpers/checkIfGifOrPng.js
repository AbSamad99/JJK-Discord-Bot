const urlExists = require('url-exist');

export const checkIfGifOrPng = async (user1, user2) => {
  try {
    if (!user1) {
      // console.log(user2);
      if (
        await urlExists(
          `https://cdn.discordapp.com/avatars/${user2.id}/${user2.avatar}.gif?size=256`
        )
      ) {
        // console.log('1');
        return `https://cdn.discordapp.com/avatars/${user2.id}/${user2.avatar}.gif?size=256`;
      } else if (
        await urlExists(
          `https://cdn.discordapp.com/avatars/${user2.id}/${user2.avatar}.png?size=256`
        )
      ) {
        // console.log('2');
        // console.log(user2.id, user2.avatar);
        return `https://cdn.discordapp.com/avatars/${user2.id}/${user2.avatar}.png?size=256`;
      } else {
        // console.log('3');
        return user2.avatarUrl;
      }
    } else {
      // console.log(user1);
      if (
        await urlExists(
          `https://cdn.discordapp.com/avatars/${user1.id}/${user1.avatar}.gif?size=256`
        )
      ) {
        // console.log('1');
        return `https://cdn.discordapp.com/avatars/${user1.id}/${user1.avatar}.gif?size=256`;
      } else if (
        await urlExists(
          `https://cdn.discordapp.com/avatars/${user1.id}/${user1.avatar}.png?size=256`
        )
      ) {
        // console.log('2');
        // console.log(user1.id, user1.avatar);
        return `https://cdn.discordapp.com/avatars/${user1.id}/${user1.avatar}.png?size=256`;
      } else {
        // console.log('3');
        return user1.displayAvatarURL();
      }
    }
  } catch (err) {
    console.log(err);
  }
};
