/*Handles the fetching of the various audit log ids and counts whenever the bot logs in*/

const { fetchAuditLogIdAndCount } = require('../../Helpers/fetchFunctions.js');

const readyCaseHandler = async (client) => {
  try {
    console.log(`Logged in as The Honored One`);
    fetchAuditLogIdAndCount(client);
  } catch (err) {
    console.log(err);
  }
};

module.exports = readyCaseHandler;
