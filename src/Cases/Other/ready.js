/*Handles the fetching of the various audit log ids and counts whenever the bot logs in*/

import { client } from '../../app';

const fetchFunction = require('../../Helpers/fetchFunction');

const readyCaseHandler = async () => {
  await client.user.setStatus('online').catch(console.log);
  await client.user
    .setActivity('You All', {
      type: 'WATCHING',
    })
    .catch(console.log);
  console.log(`Logged in as The Honored One`);
  fetchFunction().catch(console.log);
};

module.exports = readyCaseHandler;
