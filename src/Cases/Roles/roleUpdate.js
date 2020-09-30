/*Handles the logging of whenever changes are made to the role name permissions*/

const { sentenceCase } = require('change-case');
const { myCache } = require('../../app');
const rolePermsUpdateLog = require('../../Loggers/Roles/rolePermsUpdateLog');
const roleUpdateLog = require('../../Loggers/Roles/roleUpdateLog');

const roleUpdateCaseHandler = async (oldRole, newRole) => {
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
    .then((audit) => audit.entries.first())
    .catch(console.log);

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
${sentenceCase(oldPermsArray[i])}`;
    }
  }

  //calling the logging function if perms were changed
  if (added || removed) {
    await rolePermsUpdateLog(roleUpdateAuditLog, added, removed, newRole).catch(
      console.log
    );
  }

  temp = myCache.get('previousRoleUpdateLogId');

  //checking if role name, color, etc was changed
  if (
    (nameChange || colorChange || mentionableChange || hoistChange) &&
    roleUpdateAuditLog !== temp
  ) {
    myCache.del('previousRoleUpdateLogId');
    myCache.set('previousRoleUpdateLogId', roleUpdateAuditLog.id);

    await roleUpdateLog(
      roleUpdateAuditLog,
      nameChange,
      mentionableChange,
      hoistChange,
      colorChange,
      newRole
    ).catch(console.log);
  }
};

module.exports = roleUpdateCaseHandler;
