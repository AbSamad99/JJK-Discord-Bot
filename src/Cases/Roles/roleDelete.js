/*Handles the logging of whenever new role is created*/

const { sentenceCase } = require('change-case');
const roleCreateLog = require('../../Loggers/Roles/roleCreateLog');
const roleDeleteLog = require('../../Loggers/Roles/roleDeleteLog');

const roleDeleteCaseHandler = async (role) => {
  try {
    let roleDeleteAuditLog, permsArray, perms;

    //getting required audit log
    roleDeleteAuditLog = await role.guild
      .fetchAuditLogs({
        type: 'ROLE_DELETE',
      })
      .then((audit) => audit.entries.first());

    //getting perms array
    permsArray = role.permissions.toArray();

    perms = ``;
    //putting perms into a proper format
    for (i = 0; i < permsArray.length; i++) {
      perms = `${perms}
  ${sentenceCase(permsArray[i])}`;
    }

    roleDeleteLog(roleDeleteAuditLog, role, perms);
  } catch (err) {
    console.log(err);
  }
};

module.exports = roleDeleteCaseHandler;
