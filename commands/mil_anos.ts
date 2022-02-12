import Discord from 'discord.js';
import Canvas from 'canvas';

class MilAnos
{
    protected client!: Discord.Client;
    protected defaultProfilePic: string = "./src/pictures/bot.png";
    protected canvas = Canvas.createCanvas(600, 600);
    protected context = this.canvas.getContext('2d');

    constructor (client: Discord.Client) {
        this.client = client;
    }

    listen(): void {
        this.client.on("message", async message => {
            if (message.content.includes('@') && this.mentions(message)) {
                try {
                    const mil_anos_bg = await Canvas.loadImage('./src/pictures/naruto.jpg');
                    const author_pic = await Canvas.loadImage(this.authorProfilePicture(message));
                    const mensionado_pic = await Canvas.loadImage(this.mentionedProfilePicture(message));
        
                    this.context.drawImage(mil_anos_bg, 0, 0, this.canvas.width, this.canvas.height);
                    this.context.drawImage(author_pic, 325, 215, 85, 85);
                    this.context.drawImage(mensionado_pic, 12, 85, 85, 85);
        
                    const attachment = new Discord.MessageAttachment(this.canvas.toBuffer(), 'mil_anos.png');
                    message.channel.send(attachment);
                } catch (error) {
                    console.log(`Erro ao tentar desenhar no canvas: ${error}`);
                }
            }
        });
    }

    mentions(message: Discord.Message): boolean {
        return message.mentions.users.first() ? true : false;
    }

    authorProfilePicture(message: Discord.Message): string {
        let author: Discord.User | undefined = message.author;

        if (author && author.avatar) {
            return `https://cdn.discordapp.com/avatars/${author.id}/${author.avatar}.png?size=256`
        }

        return this.defaultProfilePic;
    }

    mentionedProfilePicture(message: Discord.Message): string {
        let mentioned: Discord.User | undefined = message.mentions.users.first();

        if (mentioned && mentioned.avatar) {
            return `https://cdn.discordapp.com/avatars/${mentioned.id}/${mentioned.avatar}.png?size=256`
        }

        return this.defaultProfilePic;
    }
}

export { MilAnos };