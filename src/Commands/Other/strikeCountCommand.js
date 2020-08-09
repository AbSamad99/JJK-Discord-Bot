/*Function to handle the user strike count command*/

const UserSchema = require('../../Schemas/UserSchema.js');

const strikeCountCommand = async (msg) => {
  let mentioned, user, temp;

  temp = msg.content.split(' ');

  //getting user to issue strikes to
  mentioned = msg.mentions.members.array()[0];

  //checking if user is mentioned
  if (!mentioned && !temp[1]) {
    user = await UserSchema.findOne({ id: msg.author.id });
    //adding user to the database if they dont exist
    if (!user) {
      await UserSchema.create({
        name: msg.author.user.username,
        id: msg.author.user.id,
        avatarUrl: msg.author.user.displayAvatarURL(),
        avatar: msg.author.user.avatar,
        discriminator: msg.author.user.discriminator,
        strikes: 0,
      }).catch(console.log);
      msg.channel.send(`${msg.author.username}: 0 strikes`).catch(console.log);
      return;
    }
    msg.channel
      .send(
        `${user.name}: ${user.strikes} ${
          user.strikes === 1 ? 'strike' : 'strikes'
        }`
      )
      .catch(console.log);
    return;
  } else if (!mentioned && temp[1]) {
    user = await UserSchema.findOne({ id: temp[1] });
    //adding user to the database if they dont exist
    if (!user) {
      msg.channel.send(`No such user present`).catch(console.log);
      return;
    }
    msg.channel
      .send(
        `${user.name}: ${user.strikes} ${
          user.strikes === 1 ? 'strike' : 'strikes'
        }`
      )
      .catch(console.log);
    return;
  } else {
    user = await UserSchema.findOne({ id: mentioned.user.id });
    //adding user to the database if they dont exist
    if (!user) {
      await UserSchema.create({
        name: mentioned.user.username,
        id: mentioned.user.id,
        avatarUrl: mentioned.user.displayAvatarURL(),
        avatar: mentioned.user.avatar,
        discriminator: mentioned.user.discriminator,
        strikes: 0,
      });
      msg.channel.send(`0 strikes`).catch(console.log);
      return;
    }
    msg.channel
      .send(
        `${user.name}: ${user.strikes} ${
          user.strikes === 1 ? 'strike' : 'strikes'
        }`
      )
      .catch(console.log);
    return;
  }
};

module.exports = strikeCountCommand;
