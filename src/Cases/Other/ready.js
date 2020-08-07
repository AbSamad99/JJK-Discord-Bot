/*Handles the fetching of the various audit log ids and counts whenever the bot logs in*/

const fetchAuditLogIdAndCount = require('../../Helpers/fetchFunctions');

const readyCaseHandler = async (client, myCache) => {
  await client.user.setStatus('online').catch(console.log);
  await client.user
    .setActivity('You All', {
      type: 'WATCHING',
    })
    .catch(console.log);
  console.log(`Logged in as The Honored One`);
  fetchAuditLogIdAndCount(client, myCache).catch(console.log);
};

module.exports = readyCaseHandler;
