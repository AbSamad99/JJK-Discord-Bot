/*Handles the logging of whenever changes are made to the role name permissions*/

const { sentenceCase } = require('change-case');
const rolePermsUpdateLog = require('../../Loggers/Roles/rolePermsUpdateLog');
const roleNameUpdateLog = require('../../Loggers/Roles/roleNameUpdateLog');
const roleColorUpdateLog = require('../../Loggers/Roles/roleColorUpdateLog');
const utilities = require('../../utilities.js');

const roleUpdateCaseHandler = async (oldRole, newRole) => {
  try {
    let roleUpdateAuditLog,
      oldPermsArray,
      newPermsArray,
      i,
      added,
      removed,
      colorChange,
      nameChange;

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

    //checking if new perms were added
    for (i = 0; i < newPermsArray.length; i++) {
      if (!oldPermsArray.includes(newPermsArray[i])) {
        added = `${added}, ${sentenceCase(newPermsArray[i])}`;
      }
    }

    //checking if perms were removed
    for (i = 0; i < oldPermsArray.length; i++) {
      if (!newPermsArray.includes(oldPermsArray[i])) {
        removed = `${removed}, ${sentenceCase(newPermsArray[i])}`;
      }
    }

    //calling the logging function if perms were changed
    if (added || removed) {
      rolePermsUpdateLog(roleUpdateAuditLog, added, removed, newRole);
      utilities.previousRoleUpdateAuditLog = roleUpdateAuditLog.id;
    }

    if (utilities.previousRoleUpdateAuditLog !== roleUpdateAuditLog.id) {
      utilities.previousRoleUpdateAuditLog = roleUpdateAuditLog.id;

      //checking if role name was changed
      if (nameChange) {
        roleNameUpdateLog(roleUpdateAuditLog, nameChange, newRole);
      }

      //checking if role color was changed
      if (colorChange) {
        roleColorUpdateLog(roleUpdateAuditLog, colorChange, newRole);
      }
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = roleUpdateCaseHandler;
