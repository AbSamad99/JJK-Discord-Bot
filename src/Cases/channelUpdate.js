const permsOverwriteCreateLog = require('../Functions/Loggers/Channel_logs/permsOverwriteCreateLog.js');
const permsOverwriteRemoveLog = require('../Functions/Loggers/Channel_logs/permsOverwriteRemove.js');
const permsOverwriteEditLog = require('../Functions/Loggers/Channel_logs/permsOverwriteEditLog.js');
const channelNameUpdateLog = require('../Functions/Loggers/Channel_logs/channelNameUpdateLog.js');
const { previousChannelUpdateLogId } = require('../utilities.js');
const channelSlowmodeUpdateLog = require('../Functions/Loggers/Channel_logs/channelSlowmodeUpdateLog.js');

const channelUpdateCaseHandler = async (oldChannel, newChannel) => {
  try {
    let channelOverwriteUpdateAuditLogs,
      channelOverwriteDeleteAuditLogs,
      channelOverwriteCreateAuditLogs,
      channelUpdateAuditLog,
      logsChannel,
      oldObj = {},
      newObj = {};

    //fetching the audit logs
    channelOverwriteUpdateAuditLogs = await newChannel.guild
      .fetchAuditLogs({
        type: 'CHANNEL_OVERWRITE_UPDATE',
      })
      .then((audit) => audit.entries.first());

    channelOverwriteDeleteAuditLogs = await newChannel.guild
      .fetchAuditLogs({
        type: 'CHANNEL_OVERWRITE_DELETE',
      })
      .then((audit) => audit.entries.first());

    channelOverwriteCreateAuditLogs = await newChannel.guild
      .fetchAuditLogs({
        type: 'CHANNEL_OVERWRITE_CREATE',
      })
      .then((audit) => audit.entries.first());

    channelUpdateAuditLog = await newChannel.guild
      .fetchAuditLogs({
        type: 'CHANNEL_UPDATE',
      })
      .then((audit) => audit.entries.first());

    logsChannel = newChannel.guild.channels.cache.find(
      (ch) => ch.name === 'logs'
    );

    //getting all the various users/roles and their perms
    oldChannel.permissionOverwrites.forEach((ov) => {
      if (ov.type === 'role') {
        roleOrUser = newChannel.guild.roles.cache.find(
          (role) => role.id === ov.id
        );
      } else if (ov.type === 'member') {
        roleOrUser = newChannel.guild.members.cache.find(
          (mem) => mem.id === ov.id
        );
      }
      let name = roleOrUser.name || roleOrUser.user.username;

      oldObj[name] = {
        roleOrUser: roleOrUser,
        type: ov.type,
        allow: ov.allow.toArray(),
        deny: ov.deny.toArray(),
      };
    });

    newChannel.permissionOverwrites.forEach((ov) => {
      if (ov.type === 'role') {
        roleOrUser = newChannel.guild.roles.cache.find(
          (role) => role.id === ov.id
        );
      } else if (ov.type === 'member') {
        roleOrUser = newChannel.guild.members.cache.find(
          (mem) => mem.id === ov.id
        );
      }
      let name = roleOrUser.name || roleOrUser.user.username;

      newObj[name] = {
        roleOrUser: roleOrUser,
        type: ov.type,
        allow: ov.allow.toArray(),
        deny: ov.deny.toArray(),
      };
    });
    let oldKeys = Object.keys(oldObj);
    let newKeys = Object.keys(newObj);

    if (channelUpdateAuditLog.id !== previousChannelUpdateLogId[0]) {
      let channelNameChange, channelSlowmodeChange;
      channelNameChange = channelUpdateAuditLog.changes.find(
        (change) => change.key === 'name'
      );
      if (channelNameChange) {
        channelNameUpdateLog(
          channelUpdateAuditLog.executor,
          channelNameChange,
          logsChannel,
          newChannel
        );
      }

      channelSlowmodeChange = channelUpdateAuditLog.changes.find(
        (change) => change.key === 'rate_limit_per_user'
      );
      if (channelSlowmodeChange) {
        channelSlowmodeUpdateLog(
          channelUpdateAuditLog.executor,
          channelSlowmodeChange,
          logsChannel,
          newChannel
        );
      }
    }

    //new overwrite created
    for (let i = 0; i < newKeys.length; i++) {
      if (!oldKeys.includes(newKeys[i])) {
        permsOverwriteCreateLog(
          channelOverwriteCreateAuditLogs.executor,
          newObj[newKeys[i]],
          logsChannel,
          newChannel
        );
        return;
      }
    }
    //overwrite deleted
    for (i = 0; i < oldKeys.length; i++) {
      if (!newKeys.includes(oldKeys[i])) {
        permsOverwriteRemoveLog(
          channelOverwriteDeleteAuditLogs.executor,
          oldObj[oldKeys[i]],
          logsChannel,
          newChannel
        );
        return;
      }
    }
    //overwrite edit check
    for (i = 0; i < oldKeys.length; i++) {
      if (
        oldObj[oldKeys[i]].allow.length < newObj[oldKeys[i]].allow.length ||
        oldObj[oldKeys[i]].deny.length > newObj[oldKeys[i]].deny.length
      ) {
        permsOverwriteEditLog(
          channelOverwriteUpdateAuditLogs.executor,
          oldObj[oldKeys[i]],
          newObj[oldKeys[i]],
          null,
          null,
          logsChannel,
          newChannel
        );
      } else if (
        oldObj[oldKeys[i]].allow.length > newObj[oldKeys[i]].allow.length ||
        oldObj[oldKeys[i]].deny.length < newObj[oldKeys[i]].deny.length
      ) {
        permsOverwriteEditLog(
          channelOverwriteUpdateAuditLogs.executor,
          null,
          null,
          oldObj[oldKeys[i]],
          newObj[oldKeys[i]],
          logsChannel,
          newChannel
        );
      }
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = channelUpdateCaseHandler;
