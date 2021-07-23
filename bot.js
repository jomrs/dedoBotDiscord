const Discord = require("discord.js");
const falas_bot = require('./messages/falas.json');
require('dotenv').config();

const client = new Discord.Client();

client.on("ready", () => {
	console.log("Tamo junto fml, pai ta on!");
});

// HANDLER DE MENSAGENS
Object.keys(falas_bot).forEach((fala) => {
	client.on("message", (mensagem) => {
		if(mensagem.content.startsWith(fala)) {
			mensagem.channel.send(falas_bot[fala]);
		}
	});
});

client.login(process.env.BOT);
