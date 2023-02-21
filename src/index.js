/**
 *  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄
 * ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░▌
 *  ▀▀▀▀█░█▀▀▀▀ ▐░█▀▀▀▀▀▀▀█░▌ ▀▀▀▀█░█▀▀▀▀ ▐░▌
 *      ▐░▌     ▐░▌       ▐░▌     ▐░▌     ▐░▌
 *      ▐░▌     ▐░█▄▄▄▄▄▄▄█░▌     ▐░▌     ▐░▌
 *      ▐░▌     ▐░░░░░░░░░░░▌     ▐░▌     ▐░▌
 *      ▐░▌     ▐░█▀▀▀▀█░█▀▀      ▐░▌     ▐░▌
 *      ▐░▌     ▐░▌     ▐░▌       ▐░▌     ▐░▌
 *      ▐░▌     ▐░▌      ▐░▌      ▐░▌     ▐░█▄▄▄▄▄▄▄▄▄
 *      ▐░▌     ▐░▌       ▐░▌     ▐░▌     ▐░░░░░░░░░░░▌
 *       ▀       ▀         ▀       ▀       ▀▀▀▀▀▀▀▀▀▀▀
 *
 * TRTL Library
 * 2023
 * villainsrule.xyz
 * *
 * Copyright 2022-2069 Acaiberii/L2vy7, Death X
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const events = require('events');
const axios = require('axios');
const wes = require('ws');
const fs = require('fs');

class Client {
    token;
    #instance;

    #socket;
    #room;

    events;
    auth;

    constructor(username = '', password = '', instance = 'blacket.org') {
        this.#instance = instance;

        this.events = new events.EventEmitter({
            captureRejections: true,
        });
        this.events.setMaxListeners(Infinity);

        axios.get(`https://${this.#instance}/worker/verify`).then(() => {
            axios.post(`https://${this.#instance}/worker/login`, {
                username: username,
                password: password
            }).then((res) => {
                if (res.request.path === '/502/') throw new Error(`Blacket is under maintenance.`);
                if (res.data.error) throw new Error(res.data.reason);

                this.token = res.headers['set-cookie'][0].split(';')[0];
                this.auth = {
                    username: JSON.parse(res.config.data).username,
                    password: JSON.parse(res.config.data).password
                };

                axios.defaults.headers.common['Cookie'] = this.token;

                this.#socket = new wes.WebSocket(`wss://${instance}/worker/socket`, {
                  headers: {
                    cookie: this.token
                  },
                });

                this.#socket.listenon = (type, callback) => {
                    this.#socket.addEventListener('message', (data) => {
                        let msg = JSON.parse(data.data);
                        if (msg.type == type) callback(msg);
                    });
                };

                this.#socket.listenemit = (type, data) => {
                    this.#socket.send(JSON.stringify({
                        type: type,
                        data: data,
                    }));
                };

                this.#socket.addEventListener('error', (err) => {
                    this.events.emit('error', err);
                });

                this.#socket.addEventListener('message', (message) => {
                    this.events.emit('generic', message);
                });

                this.#socket.listenon.bind(this.#socket)('join', (data) => {
                    this.events.emit('join', data);
                });

                this.#socket.listenon.bind(this.#socket)('chat', (data) => {
                    this.events.emit('message', data);
                });

                this.#socket.addEventListener('open', () => {
                    this.events.emit('connected', this.socket);
                });

                this.#socket.addEventListener('close', () => {
                    this.events.emit('disconnected', this.socket);
                });

                this.#socket.listenon.bind(this.#socket)('request', (data) => {
                    if (data.error) return this.events.emit('error', data.reason);
                    if (data.data) {
                        if (data.data.id) return this.events.emit('request', {
                            id: data.data,
                            user: data.user
                        });

                        if (data.data.cancelled) return this.events.emit('cancelled');
                        if (data.data.declined) return this.events.emit('declined');
                    };
                });
            });
        });
    };

    // EVENTEMITTER

    on(event, callback) {
        this.events.on(event, callback);
    };

    emit(event, data) {
        this.events.emit(event, data);
    };

    
    // GLOBAL REQUESTS
    
    async post(url, body, opts) {
        return await axios.post(url, body, opts);
    };
    
    async get(url, opts) {
        return await axios.get(url, opts);
    };


    // SPECIFIC REQUESTS
    
    async badges() {
        return (await axios.get(`https://${this.#instance}/worker/badges`, {
            headers: {
                Cookie: this.token,
            },
        })).data;
    };

    async banners() {
        return (await axios.get(`https://${this.#instance}/worker/banners`, {
            headers: {
                Cookie: this.token,
            },
        })).data;
    };

    async buyBazaar(itemId) {
        return (await axios.post(`https://${this.#instance}/worker/bazaar/buy`, {
            id: itemId
        }, {
            headers: {
                Cookie: this.token,
            },
        })).data;
    };

    async blooks() {
        return (await axios.get(`https://${this.#instance}/worker/blooks`, {
            headers: {
                Cookie: this.token,
            },
        })).data;
    };

    async booster() {
        return (await axios.get(`https://${this.#instance}/worker/booster`, {
            headers: {
                Cookie: this.token,
            },
        })).data;
    };
    
    async changeColor(newColor) {
        return (await axios.post(`https://${this.#instance}/worker/change`, {
            type: 'color',
            color: newColor,
        }, {
            headers: {
                Cookie: this.token,
            },
        })).data;
    };

    async claim() {
        return (await axios.get(`https://${this.#instance}/worker/claim`, {
            headers: {
                Cookie: this.token,
            },
        })).data;
    };

    async config() {
        return (await axios.get(`https://${this.#instance}/worker/config`, {
            headers: {
                Cookie: this.token,
            },
        })).data;
    };

    async emojis() {
        return (await axios.get(`https://${this.#instance}/worker/emojis`, {
            headers: {
                Cookie: this.token,
            },
        })).data;
    };

    async getBazaar(item) {
        return (await axios.get(`https://${this.#instance}/worker/bazaar${(item) ? '?item=' + encodeURIComponent(item) : ''}`, {
            headers: {
                Cookie: this.token,
            },
        })).data;
    };

    async leaderboard() {
        return (await axios.get(`https://${this.#instance}/worker/leaderboard`, {
            headers: {
                Cookie: this.token,
            },
        })).data;
    };

    async listBazaar(item, price) {
        return (await axios.post(`https://${this.#instance}/worker/bazaar/list`, {
            item: item,
            price: Number(price)
        }, {
            headers: {
                Cookie: this.token,
            },
        })).data;
    };

    async news() {
        return (await axios.get(`https://${this.#instance}/worker/news`, {
            headers: {
                Cookie: this.token,
            },
        })).data;
    };

    async open(pack) {
        return (await axios.post(`https://${this.#instance}/worker/open`, {
            pack: pack,
        }, {
            headers: {
                Cookie: this.token,
            },
        })).data;
    };

    async packs() {
        return (await axios.get(`https://${this.#instance}/worker/packs`, {
            headers: {
                Cookie: this.token,
            },
        })).data;
    };
    
    async rarities() {
        return (await axios.get(`https://${this.#instance}/worker/rarities`, {
            headers: {
                Cookie: this.token,
            },
        })).data;
    };

    async removeBazaar(itemId) {
        return (await axios.post(`https://${this.#instance}/worker/bazaar/remove`, {
                id: itemId
        }, {
            headers: {
                Cookie: this.token,
            },
        })).data;
    };

    async sell(name, quantity = 1) {
        return (await axios.post(`https://${this.#instance}/worker/sell`, {
            blook: name,
            quantity: quantity
        }, {
            headers: {
                Cookie: this.token,
            },
        })).data;
    };

    async setBanner(name) {
        return (await axios.post(`https://${this.#instance}/worker/set`, {
            type: 'banner',
            banner: name,
        }, {
            headers: {
                Cookie: this.token,
            },
        })).data;
    };

    async setProfile(name) {
        return (await axios.post(`https://${this.#instance}/worker/set`, {
            type: 'blook',
            blook: name,
        }, {
            headers: {
                Cookie: this.token,
            },
        })).data;
    };

    async user(name = '') {
        return (await axios.get(`https://${this.#instance}/worker/user${(name) ? '/' + name : ''}`, {
            headers: {
                Cookie: this.token,
            },
        })).data;
    };


    // GLOBAL SOCKET FUNCTIONS

    socketOn(event, callback) {
        this.#socket.listenon.bind(this.#socket)(event, callback);
    };

    socketEmit(event, data) {
        this.#socket.listenemit.bind(this.#socket)(event, data);
    };


    // SPECIFIC SOCKET FUNCTIONS
    
    async cancelTrade() {
        this.#socket.listenemit('cancel');
    };

    async join(room = 'global') {
        this.#room = room;
        var j = this.#socket.listenemit.bind(this.#socket)('join', room);
        return await new Promise((res) => {
            this.#socket.listenon.bind(this.#socket)('join', (d) => {
                res(d);
            });
        });
    };

    async messages(room = this.#room) {
        this.#socket.listenemit.bind(this.#socket)('join', room);
        return await new Promise((res) => {
            this.#socket.listenon.bind(this.#socket)('join', () => {
                this.#socket.listenemit.bind(this.#socket)('info');
                this.#socket.listenon.bind(this.#socket)('info', (d) => {
                    res(d);
                });
            });
        });
    };

    async send(message) {
        this.#socket.listenemit.bind(this.#socket)('chat', message);
    };

    async sendTrade(name) {
        this.#socket.listenemit('request', (await this.user(user)).user.id);
    };
};

class Handler {
    #folder;
    #subFolders;
    commands = {};
    aliases = {};

    constructor(folder = './commands/', aliases, subFolders = false) {
        this.#folder = folder;
        
        if (subFolders) {
            fs.readdirSync(this.#folder).forEach((folder) => {
                if (folder.startsWith('.')) return; // deal with mac hidden files (such as .DS_STORE)

                fs.readdirSync(`./commands/${folder}/`).filter(a => a.endsWith('.js')).forEach((file) => {
                    let command = require(`./commands/${folder}/${file}`);
                    this.commands[command.name] = command.run;
                });
            });
        } else {
            fs.readdirSync(`./commands/`).filter(a => a.endsWith('.js')).forEach((file) => {
                let command = require(`./commands/${file}`);
                this.commands[command.name] = command.run;
            });
        };


        this.aliases = Object.fromEntries(Object.entries(aliases).map(([key, value]) => [value, key]));
    };
    
    async run(name, ...args) {
        try {
            this.commands[name](...args);
        } catch {
            this.commands[this.aliases[name]](...args);
        }
    };

    async get(name) {
        try {
            if (this.commands[name]) return true;
            else if (this.aliases[name]) return true; 
            else return false;
        } catch {
            return false;
        }
    }
};

module.exports = {
    Client,
    Handler
};