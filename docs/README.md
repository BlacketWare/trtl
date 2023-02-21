# trtl documentation
Trtl uses handwritten documentation, not TypeDoc or some other generated shit.

If you're new to NPM/JS/Coding, you might want to view the [starter](https://github.com/VillainsRule4000/trtl/blob/main/docs/starter.md) docs explaining what's going on in trtl.<br>
If you're a more advanced coder, go ahead and look at the docs for...
- [API](https://github.com/VillainsRule4000/trtl/blob/main/docs/API.md)
    - Explains everything going on in Turtle interacting with the API
- [EventEmitter](https://github.com/VillainsRule4000/trtl/blob/main/docs/events.md)
    - Explains everything going on in Turtle interacting with the EventEmitter/WebSocket based.

### Constructor
```js
const trtl = require('trtl');
let client = new trtl.Client('botname', 'botpass', 'blacket.org')
// let client = new trtl(the bot's username, the bot's password, the "instance" to connect to)
```