const Discord = require("discord.js");
const Canvas = require('canvas');
const falas_bot = require('./messages/falas.json');
const msg_imagens = require('./commands/msg_imagens.json');
require('dotenv').config();

const client = new Discord.Client();

client.on("ready", () => {
	console.log("Tamo junto fml, pai ta on!");
});

// HANDLER DE MENSAGENS
Object.keys(falas_bot).forEach((fala) => {
	client.on("message", (mensagem) => {
		if(mensagem.content.includes(fala)) mensagem.channel.send(falas_bot[fala]);
	});
});

// HANDLER DE COMANDOS IMAGENS
Object.keys(msg_imagens).forEach((fala) => {
	client.on("message", (mensagem) => {
		if(mensagem.content.includes(fala)) mensagem.channel.send({files: msg_imagens[fala]});
	});
});

client.on("message", async msg => {
	const mensionado = msg.mentions.users.first();
	const autor_msg = msg.author;

	if(mensionado) {
		try {
			const autor_msg_url = autor_msg.avatar ? `https://cdn.discordapp.com/avatars/${autor_msg.id}/${autor_msg.avatar}.png?size=256`: "./src/pictures/bot.png";
			const mensionado_url = mensionado.avatar ? `https://cdn.discordapp.com/avatars/${mensionado.id}/${mensionado.avatar}.png?size=256`: "./src/pictures/bot.png";

			const canvas = Canvas.createCanvas(600, 600);
			const context = canvas.getContext('2d');

    		let mil_anos_bg = await Canvas.loadImage('./src/pictures/naruto.jpg');
    		autor_pic = await (Canvas.loadImage(autor_msg_url));
    		mensionado_pic = await (Canvas.loadImage(mensionado_url));

    		context.drawImage(mil_anos_bg, 0, 0, canvas.width, canvas.height);
    		context.drawImage(autor_pic, 325, 215, 85, 85);
    		context.drawImage(mensionado_pic, 12, 85, 85, 85);

			const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'mil_anos.png');
    		msg.channel.send(attachment);
		}
		catch (error) {
			msg.channel.send("bota uma foto de perfil antes seu corno.");
		}
	}
});

client.login(process.env.BOT);
