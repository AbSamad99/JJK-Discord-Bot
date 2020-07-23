const fs = require('fs');

const {
  previousDeleteLogCount,
  previousDeleteLogId,
  previousMemberRoleUpdateLogId,
  previousMemberUpdateLogId,
  previousMemberKickLogId,
  previousMemberBanLogId,
  previousMemberBanRemoveLogId,
  characterArtObj,
} = require('../../utilities');

//fetches array of all users
const fetchUsers = (client) => {
  try {
    let tempArray = [];
    client.users.cache.array().forEach((user) => {
      tempArray.push({
        name: user.username,
        id: user.id,
        avatarUrl: user.displayAvatarURL(),
        avatar: user.avatar,
        discriminator: user.discriminator,
        strikes: 0,
      });
    });
    fs.writeFileSync(
      `${process.cwd()}/src/Json-Files/users.json`,
      JSON.stringify(tempArray)
    );
  } catch (err) {
    console.log(err);
  }
};

//fetches array of all channels
const fetchChannels = (client) => {
  try {
    let tempArray = [];
    client.channels.cache.array().forEach((channel) => {
      if (channel.type === 'category') {
        return;
      }
      tempArray.push({
        type: channel.type,
        name: channel.name,
        id: channel.id,
        nsfw: channel.nsfw,
      });
    });
    fs.writeFileSync(
      `${process.cwd()}/src/Json-Files/channels.json`,
      JSON.stringify(tempArray)
    );
  } catch (err) {
    console.log(err);
  }
};

//fetches array of all emotes
const fetchEmotes = (client) => {
  try {
    let tempArray = [];
    client.emojis.cache.array().forEach((emote) => {
      tempArray.push({
        name: emote.name,
        id: emote.id,
        animated: emote.animated,
      });
    });
    fs.writeFileSync(
      `${process.cwd()}/src/Json-Files/emotes.json`,
      JSON.stringify(tempArray)
    );
  } catch (err) {
    console.log(err);
  }
};

//fetches array of all roles
const fetchRoles = (client) => {
  try {
    let tempArray = [];
    client.guilds.cache
      .array()[0]
      .roles.cache.array()
      .forEach((role) => {
        tempArray.push({
          name: role.name,
          id: role.id,
          color: role.color,
        });
      });
    fs.writeFileSync(
      `${process.cwd()}/src/Json-Files/roles.json`,
      JSON.stringify(tempArray)
    );
  } catch (err) {
    console.log(err);
  }
};

//fetches message delete log id and count
const fetchMessageDeleteLogIdAndCount = async (client) => {
  try {
    let temp = await client.guilds.cache
      .first()
      .fetchAuditLogs({
        type: 'MESSAGE_DELETE',
      })
      .then((audit) => audit.entries.first());
    previousDeleteLogId.push(temp.id);
    previousDeleteLogCount.push(temp.extra.count);
  } catch (err) {
    console.log(err);
  }
};

//fetches member update log id
const fetchMemberUpdateLogId = async (client) => {
  try {
    let temp = await client.guilds.cache
      .first()
      .fetchAuditLogs({
        type: 'MEMBER_UPDATE',
      })
      .then((audit) => audit.entries.first());
    previousMemberUpdateLogId.push(temp.id);
  } catch (err) {
    console.log(err);
  }
};

//fetches member role update log id
const fetchMemberRoleUpdateLogId = async (client) => {
  try {
    let temp = await client.guilds.cache
      .first()
      .fetchAuditLogs({
        type: 'MEMBER_ROLE_UPDATE',
      })
      .then((audit) => audit.entries.first());
    previousMemberRoleUpdateLogId.push(temp.id);
  } catch (err) {
    console.log(err);
  }
};

//fetches member kick log id
const fetchMemberKickLogId = async (client) => {
  try {
    let temp = await client.guilds.cache
      .first()
      .fetchAuditLogs({
        type: 'MEMBER_KICK',
      })
      .then((audit) => audit.entries.first());
    previousMemberKickLogId.push(temp.id);
  } catch (err) {
    console.log(err);
  }
};

//fetches member ban log id
const fetchMemberBanLogId = async (client) => {
  try {
    let temp = await client.guilds.cache
      .first()
      .fetchAuditLogs({
        type: 'MEMBER_BAN_ADD',
      })
      .then((audit) => audit.entries.first());
    if (!temp) temp = { id: null };
    previousMemberBanLogId.push(temp.id);
  } catch (err) {
    console.log(err);
  }
};

//fetches member ban remove log id
const fetchMemberBanRemoveLogId = async (client) => {
  try {
    let temp = await client.guilds.cache
      .first()
      .fetchAuditLogs({
        type: 'MEMBER_BAN_REMOVE',
      })
      .then((audit) => audit.entries.first());
    if (!temp) temp = { id: null };
    previousMemberBanRemoveLogId.push(temp.id);
  } catch (err) {
    console.log(err);
  }
};

//constructs the charartobj
const stringifyCharacterArtObj = () => {
  try {
    fs.writeFileSync(
      `${process.cwd()}/src/Json-Files/art.json`,
      JSON.stringify(characterArtObj)
    );
    delete characterArtObj;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  fetchUsers: fetchUsers,
  fetchChannels: fetchChannels,
  fetchEmotes: fetchEmotes,
  fetchRoles: fetchRoles,
  fetchMessageDeleteLogIdAndCount: fetchMessageDeleteLogIdAndCount,
  fetchMemberUpdateLogId: fetchMemberUpdateLogId,
  fetchMemberRoleUpdateLogId: fetchMemberRoleUpdateLogId,
  fetchMemberKickLogId: fetchMemberKickLogId,
  fetchMemberBanLogId: fetchMemberBanLogId,
  fetchMemberBanRemoveLogId: fetchMemberBanRemoveLogId,
  stringifyCharacterArtObj: stringifyCharacterArtObj,
};
