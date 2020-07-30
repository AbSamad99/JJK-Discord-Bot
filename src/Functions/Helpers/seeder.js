const UserSchema = require('../../Schemas/UserSchema.js');

const seedUsers = async (msg) => {
  try {
    await UserSchema.deleteMany();
    let tempArray = [];
    msg.guild.members.cache.forEach((member) => {
      tempArray.push({
        name: member.user.username,
        id: member.user.id,
        avatarUrl: member.user.displayAvatarURL(),
        avatar: member.user.avatar,
        discriminator: member.user.discriminator,
        strikes: 0,
      });
    });
    await UserSchema.create(tempArray).catch(console.error);
    console.log('complete');
  } catch (err) {
    console.log(err);
  }
};

module.exports = seedUsers;
