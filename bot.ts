//Libs | Commands
import Discord from 'discord.js';
import dotenv from 'dotenv';
import { FalasBot }  from './commands/falas_bot';
import { MensagemRandom } from './commands/mensagem_random';
import { MensagemImagem } from './commands/mensagem_imagem';
import { MilAnos } from './commands/mil_anos';

//configs
dotenv.config();
const client: Discord.Client = new Discord.Client().setMaxListeners(0);

// Commands
const falasBot: FalasBot = new FalasBot(client);
const mensagemRandom: MensagemRandom = new MensagemRandom(client);
const mensagemImagem: MensagemImagem = new MensagemImagem(client);
const milAnos: MilAnos = new MilAnos(client);

// Greeting
client.on("ready", () => {
	console.log(process.env.GREETING);
});

// HANDLER DE COMANDOS IMAGENS
client.on('message', message => {
	if(message.author.bot) return;
	if(message.content.startsWith('/u')) {
		let msg_original = message.content;
		message.delete();
		message.channel.send(msg_original.slice(2, message.content.length));
	}
})

// Listen Commands
falasBot.listen();
mensagemRandom.listen();
mensagemImagem.listen();
milAnos.listen();

// Login
client.login(process.env.BOT);