import { Client, Message, Events } from 'discord.js';

class MensagemRandom
{
    private client!: Client;
    msg_random = require('../messages/random_msg.json');

    constructor(client: Client) {
        this.client = client;
    }

    listen(): void {
        for(let mensagem in this.msg_random) {
            this.client.on(Events.MessageCreate, (received_message) => {
                this.processMessage(received_message, mensagem);
            });
        }
    }

    randomPosition(maxResult: number): number {
        return Math.floor(Math.random() * (maxResult - 0));
    }

    processMessage(received_message: Message, mensagem: string): void {
        if (received_message.author.bot) return;
        if (received_message.content.includes(mensagem)) {
            const tamanho_falas = this.msg_random[mensagem].length;
            let pick_random = this.randomPosition(tamanho_falas);
            received_message.channel.send(this.msg_random[mensagem][pick_random]);
        }
    }
}

export { MensagemRandom };