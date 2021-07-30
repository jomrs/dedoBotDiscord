const Discord = require("discord.js");
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

client.login(process.env.BOT);
