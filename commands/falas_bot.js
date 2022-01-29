"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FalasBot = void 0;
class FalasBot {
    constructor(client) {
        this.falas = require('../messages/falas.json');
        this.client = client;
    }
    listen() {
        for (let fala in this.falas) {
            this.client.on("message", (message) => {
                this.processMessage(message, fala);
            });
        }
    }
    processMessage(message, fala) {
        if (message.author.bot)
            return;
        if (message.content.includes(fala))
            message.channel.send(this.falas[fala]);
    }
}
exports.FalasBot = FalasBot;
