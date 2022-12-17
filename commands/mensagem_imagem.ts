import { Client, Message, Events } from 'discord.js';

class MensagemImagem
{
    private client!: Client;
    msg_imagens = require('../messages/msg_imagens.json');

    constructor(client: Client) {
        this.client = client;
    }

    listen(): void {
        for(let imagem in this.msg_imagens) {
            this.client.on(Events.MessageCreate, (received_message) => {
                this.processMessage(received_message, imagem);
            });
        }
    }

    processMessage(received_message: Message, imagem: string): void {
        if (received_message.author.bot) return;
        if (received_message.content.includes(imagem)) {
            try {
                received_message.channel.send({files: this.msg_imagens[imagem]});
            } catch (error) {
                console.log(`problema ao mandar a imagem para o canal! ${error}`);
            }
        }
    }
}

export { MensagemImagem };