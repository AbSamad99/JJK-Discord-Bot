const {
  fetchAuditLogIdAndCount,
} = require('../Functions/Helpers/fetchFunctions.js');

const readyCaseHandler = async (client) => {
  try {
    console.log(`Logged in as The Honored One`);
    fetchAuditLogIdAndCount(client);
  } catch (err) {
    console.log(err);
  }
};

module.exports = readyCaseHandler;
