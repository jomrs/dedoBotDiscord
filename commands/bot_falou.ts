import Discord from 'discord.js';

class BotFalou
{
    protected client!: Discord.Client;

    constructor (client: Discord.Client) {
        this.client = client;
    }

    listen(): void {
        this.client.on("message", message => {
            if(message.author.bot) return;
            if(message.content.startsWith('/u')) {
                this.botSendMessage(message);
            }
        });
    }

    botSendMessage(message: Discord.Message): void {
        const original_message: string = message.content;

        message.delete();
        message.channel.send(original_message.slice(2, message.content.length));
    }
}

export { BotFalou };
