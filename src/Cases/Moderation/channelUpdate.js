/*Handles the logging of whenever changes are made to the channels name and slowmode. Also logs whenever
the perms for a role or a user are created, removed or edited*/

const utilities = require('../../utilities.js');

//getting the required logging functions
const permsOverwriteCreateLog = require('../../Loggers/Channel/permsOverwriteCreateLog.js');
const permsOverwriteRemoveLog = require('../../Loggers/Channel/permsOverwriteRemove.js');
const permsOverwriteEditLog = require('../../Loggers/Channel/permsOverwriteEditLog.js');
const channelNameUpdateLog = require('../../Loggers/Channel/channelNameUpdateLog.js');
const channelSlowmodeUpdateLog = require('../../Loggers/Channel/channelSlowmodeUpdateLog.js');

const channelUpdateCaseHandler = async (oldChannel, newChannel) => {
  try {
    let channelOverwriteUpdateAuditLogs,
      channelOverwriteDeleteAuditLogs,
      channelOverwriteCreateAuditLogs,
      channelUpdateAuditLog,
      logsChannel,
      oldObj = {},
      newObj = {};

    //fetching the audit logs - channel overwrite update
    channelOverwriteUpdateAuditLogs = await newChannel.guild
      .fetchAuditLogs({
        type: 'CHANNEL_OVERWRITE_UPDATE',
      })
      .then((audit) => audit.entries.first());

    //fetching the audit logs - channel overwrite delete
    channelOverwriteDeleteAuditLogs = await newChannel.guild
      .fetchAuditLogs({
        type: 'CHANNEL_OVERWRITE_DELETE',
      })
      .then((audit) => audit.entries.first());

    //fetching the audit logs - channel overwrite create
    channelOverwriteCreateAuditLogs = await newChannel.guild
      .fetchAuditLogs({
        type: 'CHANNEL_OVERWRITE_CREATE',
      })
      .then((audit) => audit.entries.first());

    //fetching the audit logs - channel update
    channelUpdateAuditLog = await newChannel.guild
      .fetchAuditLogs({
        type: 'CHANNEL_UPDATE',
      })
      .then((audit) => audit.entries.first());

    logsChannel = newChannel.guild.channels.cache.get('447513266395283476');

    //getting all the various users/roles and their perms - old
    oldChannel.permissionOverwrites.forEach((ov) => {
      if (ov.type === 'role') {
        roleOrUser = newChannel.guild.roles.cache.get(ov.id);
      } else if (ov.type === 'member') {
        roleOrUser = newChannel.guild.members.cache.get(ov.id);
      }
      let name = roleOrUser.name || roleOrUser.user.username;

      oldObj[name] = {
        roleOrUser: roleOrUser,
        type: ov.type,
        allow: ov.allow.toArray(),
        deny: ov.deny.toArray(),
      };
    });

    //getting all the various users/roles and their perms - new
    newChannel.permissionOverwrites.forEach((ov) => {
      if (ov.type === 'role') {
        roleOrUser = newChannel.guild.roles.cache.get(ov.id);
      } else if (ov.type === 'member') {
        roleOrUser = newChannel.guild.members.cache.get(ov.id);
      }
      let name = roleOrUser.name || roleOrUser.user.username;

      newObj[name] = {
        roleOrUser: roleOrUser,
        type: ov.type,
        allow: ov.allow.toArray(),
        deny: ov.deny.toArray(),
      };
    });

    //getting keys of the objects
    let oldKeys = Object.keys(oldObj);
    let newKeys = Object.keys(newObj);

    //checking if the channel was updated
    if (channelUpdateAuditLog.id !== utilities.previousChannelUpdateLogId) {
      utilities.previousChannelUpdateLogId = channelUpdateAuditLog.id;

      let channelNameChange, channelSlowmodeChange;

      channelNameChange = channelUpdateAuditLog.changes.find(
        (change) => change.key === 'name'
      );

      //logging channel name change
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

      //logging channel slowdown change
      if (channelSlowmodeChange) {
        channelSlowmodeUpdateLog(
          channelUpdateAuditLog.executor,
          channelSlowmodeChange,
          logsChannel,
          newChannel
        );
      }
    }

    //checking if a new overwrite was created
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

    //checking if a overwrite was deleted
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

    ////checking if a overwrite was edited
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
