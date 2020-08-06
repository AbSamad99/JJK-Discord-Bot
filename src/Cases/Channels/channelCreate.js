/*Handles the logging of whenever a channel is created*/

const channelCreateLog = require('../../Loggers/Channel/channelCreateLog');

const channelCreateCaseHandler = async (channel) => {
  try {
    let channelCreateAuditLog,
      roleOrUser,
      name,
      obj = {};

    //fetching the audit logs
    channelCreateAuditLog = await channel.guild
      .fetchAuditLogs({
        type: 'CHANNEL_CREATE',
      })
      .then((audit) => audit.entries.first());

    //seeing if any perms were allowed or removed for roles/users
    channel.permissionOverwrites.forEach((ov) => {
      if (ov.type === 'role') {
        roleOrUser = channel.guild.roles.cache.get(ov.id);
      } else if (ov.type === 'member') {
        roleOrUser = channel.guild.members.cache.get(ov.id);
      }
      name = roleOrUser.name || roleOrUser.user.username;

      obj[name] = {
        roleOrUser: roleOrUser,
        type: ov.type,
        allow: ov.allow.toArray(),
        deny: ov.deny.toArray(),
      };
    });

    channelCreateLog(channel, channelCreateAuditLog, obj);
  } catch (err) {
    console.log(err);
  }
};

module.exports = channelCreateCaseHandler;
