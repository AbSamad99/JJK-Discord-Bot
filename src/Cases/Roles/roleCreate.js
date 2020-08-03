/*Handles the logging of whenever new role is created*/

const { sentenceCase } = require('change-case');
const roleCreateLog = require('../../Loggers/Roles/roleCreateLog');

const roleCreateCaseHandler = async (role) => {
  try {
    let roleCreateAuditLog, permsArray, perms;

    //getting required audit log
    roleCreateAuditLog = await role.guild
      .fetchAuditLogs({
        type: 'ROLE_CREATE',
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

    roleCreateLog(roleCreateAuditLog, role, perms);
  } catch (err) {
    console.log(err);
  }
};

module.exports = roleCreateCaseHandler;
