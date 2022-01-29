//Libs
import Discord from 'discord.js';
import ytdl from 'ytdl-core';
import dotenv from 'dotenv';
// import { createRequire } from 'module';

//commands
let sendBuzz = require('./commands/buzz.js');

//configs

dotenv.config();
const client = new Discord.Client();
const prefix = '!';
// const require = createRequire(import.meta.url);
let fila = new Map();
const Canvas = require('canvas');

//data
const falas_bot = require('./messages/falas.json');
const msg_random = require('./messages/random_msg.json');
const msg_imagens = require('./commands/msg_imagens.json');

client.on("ready", () => {
	console.log("Tamo junto fml, pai ta on!");
});


// HANDLER DE MENSAGENS
Object.keys(falas_bot).forEach((fala) => {
	client.on("message", (mensagem) => {
		if(mensagem.author.bot) return;
		if(mensagem.content.includes(fala)) mensagem.channel.send(falas_bot[fala]);
	});
});

Object.keys(msg_random).forEach((fala) => {
	client.on("message", (mensagem) => {
		if(mensagem.author.bot) return;
		if(mensagem.content.includes(fala)) {
			const maior_valor = msg_random[fala].length; 
			let posicao_aleatoria = Math.floor(Math.random() * (maior_valor - 0));
			mensagem.channel.send(msg_random[fala][posicao_aleatoria]);
		}
	});
});

// HANDLER DE COMANDOS IMAGENS
Object.keys(msg_imagens).forEach((fala) => {
	client.on("message", (mensagem) => {
		if(mensagem.author.bot) return;
		if(mensagem.content.includes(fala)) mensagem.channel.send({files: msg_imagens[fala]});
	});
});

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

sendBuzz(client);

client.login(process.env.BOT);