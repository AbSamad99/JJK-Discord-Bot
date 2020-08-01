/*used to check if the user has a gif or an image as their avatar*/

const urlExist = require('url-exist');

const gifOrPngCheck = async (user1, user2) => {
  try {
    //when parameter is from the db
    if (!user1) {
      if (
        await urlExist(
          `https://cdn.discordapp.com/avatars/${user2.id}/${user2.avatar}.gif?size=256`
        )
      ) {
        return `https://cdn.discordapp.com/avatars/${user2.id}/${user2.avatar}.gif?size=256`;
      } else if (
        await urlExist(
          `https://cdn.discordapp.com/avatars/${user2.id}/${user2.avatar}.png?size=256`
        )
      ) {
        return `https://cdn.discordapp.com/avatars/${user2.id}/${user2.avatar}.png?size=256`;
      } else {
        return user2.avatarUrl;
      }
    }
    //when parameter is from the server
    else {
      if (
        await urlExist(
          `https://cdn.discordapp.com/avatars/${user1.id}/${user1.avatar}.gif?size=256`
        )
      ) {
        return `https://cdn.discordapp.com/avatars/${user1.id}/${user1.avatar}.gif?size=256`;
      } else if (
        await urlExist(
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

module.exports = gifOrPngCheck;
