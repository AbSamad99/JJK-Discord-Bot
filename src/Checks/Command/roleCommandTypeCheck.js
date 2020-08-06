/*Checks to see which type of role command was input by the mod*/

const roleListCommand = require('../../Commands/Role/roleListCommand.js');
const roleAssignCommand = require('../../Commands/Role/roleAssignCommand.js');

const roleCommandTypeCheck = (msg, keyword) => {
  try {
    //role command
    if (keyword === 'role') {
      roleAssignCommand(msg);
    }

    //role list command
    else if (keyword === 'rolelist') {
      roleListCommand(msg);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = roleCommandTypeCheck;
