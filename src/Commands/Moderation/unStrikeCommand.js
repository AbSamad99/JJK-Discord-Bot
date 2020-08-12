/*Function to handle the user unstrike command*/

const { MessageEmbed } = require('discord.js');

const UserSchema = require('../../Schemas/UserSchema.js');
const gifOrPngCheck = require('../../Helpers/gifOrPngCheck.js');

const unstrikeCommand = async (msg) => {
  if (
    !(
      msg.member.roles.cache.has('447512454810042369') /*Special Grade role*/
    ) &&
    !(msg.member.roles.cache.has('447512449248395267') /*admin role*/)
  )
    return;

  let temp, toUnStrike, user, logsChannel, unStrikeEmbed;

  //getting needed info
  temp = msg.content.slice(1);
  temp = temp.split(' ');

  //getting user to issue strikes to
  toUnStrike = msg.mentions.members.array()[0];

  //getting logs channel
  logsChannel = msg.guild.channels.cache.get('447513266395283476');

  //checking if user given is valid
  if (!toUnStrike) {
    toUnStrike = msg.guild.members.cache.get(temp[1]);
  }

  //2nd check
  if (!toUnStrike) {
    msg.channel
      .send('Please mention a user to remove a strike from or provide their id')
      .catch(console.log);
    return;
  }

  //getting user from the database
  user = await UserSchema.findOne({ id: toUnStrike.user.id });

  //adding user to the database if they dont exist
  if (!user) {
    await UserSchema.create({
      name: toUnStrike.user.username,
      id: toUnStrike.user.id,
      avatarUrl: toUnStrike.user.displayAvatarURL(),
      avatar: toUnStrike.user.avatar,
      discriminator: toUnStrike.user.discriminator,
      strikes: 0,
    });
    msg.channel.send('User has no strikes').catch(console.log);
    return;
  }

  if (user.strikes === 0) {
    msg.channel.send('User has no strikes').catch(console.log);
    return;
  }

  user = await UserSchema.findOneAndUpdate(
    { id: toUnStrike.user.id },
    {
      $inc: {
        strikes: -1,
      },
    },
    { useFindAndModify: false, new: true }
  );

  //making the embed
  unStrikeEmbed = new MessageEmbed()
    .setAuthor(msg.author.tag, await gifOrPngCheck(msg.author))
    .setTitle('Strike removed')
    .setColor(10038562)
    .setThumbnail(await gifOrPngCheck(toUnStrike.user))
    .setDescription(
      `${toUnStrike} now have ${user.strikes} ${
        user.strikes === 1 ? 'strike' : 'strikes'
      }`
    )
    .setFooter(new Date());

  msg.channel
    .send(unStrikeEmbed)
    .then(() => logsChannel.send(unStrikeEmbed))
    .catch(console.log);
};

module.exports = unstrikeCommand;
