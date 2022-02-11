//Libs | Commands
import Discord from 'discord.js';
import dotenv from 'dotenv';
import { FalasBot }  from './commands/falas_bot';
import { MensagemRandom } from './commands/mensagem_random';
import { MensagemImagem } from './commands/mensagem_imagem';

//configs
dotenv.config();
const client = new Discord.Client();
const Canvas = require('canvas');
const falasBot: FalasBot = new FalasBot(client);
const mensagemRandom: MensagemRandom = new MensagemRandom(client);
const mensagemImagem: MensagemImagem = new MensagemImagem(client);
client.setMaxListeners(0);

client.on("ready", () => {
	console.log("Tamo junto fml, pai ta on!");
});

// HANDLER DE COMANDOS IMAGENS
client.on("message", async msg => {
	const mensionado = msg.mentions.users.first();
	const autor_msg = msg.author;

	if(msg.content.includes('@') && mensionado) {
		try {
			const autor_msg_url = autor_msg.avatar ? `https://cdn.discordapp.com/avatars/${autor_msg.id}/${autor_msg.avatar}.png?size=256`: "./src/pictures/bot.png";
			const mensionado_url = mensionado.avatar ? `https://cdn.discordapp.com/avatars/${mensionado.id}/${mensionado.avatar}.png?size=256`: "./src/pictures/bot.png";

			const canvas = Canvas.createCanvas(600, 600);
			const context = canvas.getContext('2d');

    		let mil_anos_bg = await Canvas.loadImage('./src/pictures/naruto.jpg');
    		const autor_pic = await (Canvas.loadImage(autor_msg_url));
    		const mensionado_pic = await (Canvas.loadImage(mensionado_url));

    		context.drawImage(mil_anos_bg, 0, 0, canvas.width, canvas.height);
    		context.drawImage(autor_pic, 325, 215, 85, 85);
    		context.drawImage(mensionado_pic, 12, 85, 85, 85);

			const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'mil_anos.png');
			msg.channel.send(attachment);
		}
		catch (error) {
			console.log(error);
		}
	}
});

client.on('message', message => {
	if(message.author.bot) return;
	if(message.content.startsWith('/u')) {
		let msg_original = message.content;
		message.delete();
		message.channel.send(msg_original.slice(2, message.content.length));
	}
})

// INIT LISTENERS
falasBot.listen();
mensagemRandom.listen();
mensagemImagem.listen();

client.login(process.env.BOT);
