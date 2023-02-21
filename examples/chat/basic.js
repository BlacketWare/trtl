// If you are a knowledgable coder, do NOT start here.
// Kindly find your way to advanced.js, you will be able to understand it.

const trtl = require('trtl');
let client = new trtl.Client('botname', 'botpass', 'blacket.org');

client.on('connected', () => {
  console.log(`Connected to ${client.auth.username}!`);

  client.join();

  client.on('message', (data) => {
    console.log(`[${data.user.role}] ${data.user.username} > ${data.message}`);
    
    if (data.message === '?hithere') {
        client.send(`@${data.user.username}, hi there!`);
    };
  });
});