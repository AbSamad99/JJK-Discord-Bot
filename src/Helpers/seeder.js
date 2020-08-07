/*Function to seed all users in cache to the database*/

const UserSchema = require('../Schemas/UserSchema.js');

const seedUsers = async (msg) => {
  //deleting all users already present in database
  await UserSchema.deleteMany().catch(console.error);
  let tempArray = [],
    userArray;

  userArray = await msg.guild.members.fetch();

  //looping through cache and pushing each user info to tempArray
  userArray.array().forEach((member) => {
    tempArray.push({
      name: member.user.username,
      id: member.user.id,
      avatarUrl: member.user.displayAvatarURL(),
      avatar: member.user.avatar,
      discriminator: member.user.discriminator,
      strikes: 0,
    });
  });

  //adding the users to the database
  await UserSchema.create(tempArray).catch(console.error);
  console.log('complete');
};

module.exports = seedUsers;
