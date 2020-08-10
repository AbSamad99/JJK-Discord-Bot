/*Function to handle the user unstrike command*/

const { MessageEmbed } = require('discord.js');

const UserSchema = require('../../Schemas/UserSchema.js');
const gifOrPngCheck = require('../../Checks/Other/gifOrPngCheck.js');

const unstrikeCommand = async (msg) => {
  let toUnStrike, user, logsChannel, strikesCount, unStrikeEmbed;

  //getting user to issue strikes to
  toUnStrike = msg.mentions.members.array()[0];

  //getting logs channel
  logsChannel = msg.guild.channels.cache.get('447513266395283476');

  //checking if user given is valid
  if (!toUnStrike) {
    msg.channel
      .send('Please mention a user to remove a strike from')
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

  strikesCount = user.strikes;

  if (strikesCount === 0) {
    msg.channel.send('User has no strikes').catch(console.log);
    return;
  }

  strikesCount--;

  await UserSchema.findOneAndUpdate(
    { id: toUnStrike.user.id },
    { strikes: strikesCount },
    { useFindAndModify: false }
  );

  //making the embed
  unStrikeEmbed = new MessageEmbed()
    .setAuthor(msg.author.tag, await gifOrPngCheck(msg.author))
    .setTitle('Strike removed')
    .setColor(10038562)
    .setThumbnail(await gifOrPngCheck(toUnStrike.user))
    .setDescription(
      `${toUnStrike} now have ${strikesCount} ${
        strikesCount === 1 ? 'strike' : 'strikes'
      }`
    )
    .setFooter(new Date());

  msg.channel
    .send(unStrikeEmbed)
    .then(() => logsChannel.send(unStrikeEmbed))
    .catch(console.log);
};

module.exports = unstrikeCommand;
