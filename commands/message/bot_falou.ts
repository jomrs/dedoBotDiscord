import { Client, Message, Events } from 'discord.js';

class BotFalou
{
    protected client!: Client;

    constructor (client: Client) {
        this.client = client;
    }

    listen(): void {
        this.client.on(Events.MessageCreate, message => {
            if(message.author.bot) return;
            if(message.content.startsWith('/u')) {
                this.botSendMessage(message);
            }
        });
    }

    botSendMessage(message: Message): void {
        const original_message: string = message.content;

        message.delete();
        message.channel.send(original_message.slice(2, message.content.length));
    }
}

export { BotFalou };
