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
	if(msg.content.includes("@")) msg.channel.send("yup eu vi q você mensionou o cara, na surdina ne?");
	const mensionado = msg.mentions.users.first();
	const autor_msg = msg.author;

	if(mensionado) {
		const mil_anos = "./src/pictures/naruto.jpg"
		const autor_msg_pic = `https://cdn.discordapp.com/avatars/${autor_msg.id}/${autor_msg.avatar}.png?size=256`
		const mensionado_pic = `https://cdn.discordapp.com/avatars/${mensionado.id}/${mensionado.avatar}.png?size=256`;

		const canvas = Canvas.createCanvas(600, 600);
		const context = canvas.getContext('2d');

		const background = await Canvas.loadImage(mil_anos);
		const mensionado_pic = await Canvas.loadImage(mensionado_pic);
		const autor_msg_pic = await Canvas.loadImage(autor_msg_pic);
		
		//imagem base
		context.drawImage(background, 0, 0, canvas.width, canvas.height);
		//naruto
		context.drawImage(mensionado_pic, 12, 50,85,85);
		//kakashi
		context.drawImage(autor_msg_pic, 325, 275, 85, 85);
		
		const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'imagem-gerada.png');

		msg.channel.send(attachment);
	}
});

client.login(process.env.BOT);
