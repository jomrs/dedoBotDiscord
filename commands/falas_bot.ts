import Discord from 'discord.js';
import { FalasBotSchema }  from '../interfaces/falasBotSchema';

class FalasBot
{
    private client!: Discord.Client;
    falas: FalasBotSchema = require('../messages/falas.json');

    constructor(client: Discord.Client) {
        this.client = client;
    }

    listen(): void {
        for(let fala in this.falas) {
            this.client.on("message", (message) => {
                this.processMessage(message, fala);
            });
        }
    }

    processMessage(message: Discord.Message, fala: string): void {
        if(message.author.bot) return;
        if(message.content.includes(fala)) message.channel.send(this.falas[fala]);
    }
}

export { FalasBot };