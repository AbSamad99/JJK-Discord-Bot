/*Handles the logging of whenever changes are made to the role name permissions*/

const { sentenceCase } = require('change-case');
const rolePermsUpdateLog = require('../../Loggers/Roles/rolePermsUpdateLog');
const roleUpdateLog = require('../../Loggers/Roles/roleUpdateLog');

const roleUpdateCaseHandler = async (oldRole, newRole, myCache) => {
  try {
    let roleUpdateAuditLog,
      oldPermsArray,
      newPermsArray,
      i,
      added,
      removed,
      colorChange,
      nameChange,
      hoistChange,
      mentionableChange,
      temp;

    //getting old and new perms
    oldPermsArray = oldRole.permissions.toArray();
    newPermsArray = newRole.permissions.toArray();

    added = ``;
    removed = ``;

    //getting the audit log
    roleUpdateAuditLog = await newRole.guild
      .fetchAuditLogs({
        type: 'ROLE_UPDATE',
      })
      .then((audit) => audit.entries.first());

    //getting required changes from audit log
    colorChange = roleUpdateAuditLog.changes.find(
      (change) => change.key === 'color'
    );
    nameChange = roleUpdateAuditLog.changes.find(
      (change) => change.key === 'name'
    );
    mentionableChange = roleUpdateAuditLog.changes.find(
      (change) => change.key === 'mentionable'
    );
    hoistChange = roleUpdateAuditLog.changes.find(
      (change) => change.key === 'hoist'
    );

    temp = myCache.get('previousRoleUpdateAuditLog');

    //checking if new perms were added
    for (i = 0; i < newPermsArray.length; i++) {
      if (!oldPermsArray.includes(newPermsArray[i])) {
        added = `${added}
${sentenceCase(newPermsArray[i])}`;
      }
    }

    //checking if perms were removed
    for (i = 0; i < oldPermsArray.length; i++) {
      if (!newPermsArray.includes(oldPermsArray[i])) {
        removed = `${removed}
${sentenceCase(newPermsArray[i])}`;
      }
    }

    //calling the logging function if perms were changed
    if (added || removed) {
      myCache.del('previousRoleUpdateAuditLog');
      myCache.set('previousRoleUpdateAuditLog', roleUpdateAuditLog.id);
      await rolePermsUpdateLog(roleUpdateAuditLog, added, removed, newRole);
    }

    if (roleUpdateAuditLog.id !== temp) {
      myCache.del('previousRoleUpdateAuditLog');
      myCache.set('previousRoleUpdateAuditLog', roleUpdateAuditLog.id);

      //checking if role name, color, etc was changed
      if (nameChange || colorChange || mentionableChange || hoistChange) {
        await roleUpdateLog(
          roleUpdateAuditLog,
          nameChange,
          mentionableChange,
          hoistChange,
          colorChange,
          newRole
        );
      }
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = roleUpdateCaseHandler;
