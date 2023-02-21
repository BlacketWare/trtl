// If you are a learning coder, do NOT start here.
// Kindly find your way to basic.js.

const trtl = require('trtl');
let client = new trtl.Client('botname', 'botpass', 'blacket.org');

client.on('connected', () => {
  console.log(`Connected to ${client.auth.username}!`);

  client.on('join', (t) => {
    client.on('message', async (data) => {
      console.log(`[${data.user.role}] ${data.user.username} > ${data.message}`);
        
      if (data.message === '?hithere') client.send(`@${data.user.username}, hi there!`);
      else if (data.message === '?me') {
        let user = await client.user(data.user.id);
        client.send(`@${data.user.username}, you are a ${data.user.role} with ${user.user.tokens} and ${Object.keys(user.user.blooks).length} unique Blooks.`);
      };
    });
    
    client.on('disconnected', (ws) => console.log(`Disconnected from the WebSocket.`));
  });

  client.join();
});