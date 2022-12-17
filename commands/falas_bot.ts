import { Client, Message, Events } from 'discord.js';
import { FalasBotSchema }  from '../interfaces/falasBotSchema';

class FalasBot
{
    private client!: Client;
    falas: FalasBotSchema = require('../messages/falas.json');

    constructor(client: Client) {
        this.client = client;
    }

    listen(): void {
        for(let fala in this.falas) {
            this.client.on(Events.MessageCreate, (message) => {
                this.processMessage(message, fala);
            });
        }
    }

    processMessage(message: Message, fala: string): void {
        if(message.author.bot) return;
        if(message.content.includes(fala)) message.channel.send(this.falas[fala]);
    }
}

export { FalasBot };