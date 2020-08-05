/*Handles the fetching of the various audit log ids and counts whenever the bot logs in*/

const { fetchAuditLogIdAndCount } = require('../../Helpers/fetchFunctions.js');

const readyCaseHandler = async (client, myCache) => {
  try {
    await client.user.setStatus('online');
    await client.user.setActivity('You All', {
      type: 'WATCHING',
    });
    console.log(`Logged in as The Honored One`);
    fetchAuditLogIdAndCount(client, myCache);
  } catch (err) {
    console.log(err);
  }
};

module.exports = readyCaseHandler;
