// Imports | Libs
import Discord from 'discord.js';
import dotenv from 'dotenv';
import { FalasBot }  from './commands/falas_bot';
import { MensagemRandom } from './commands/mensagem_random';
import { MensagemImagem } from './commands/mensagem_imagem';
import { MilAnos } from './commands/mil_anos';
import { BotFalou } from './commands/bot_falou'; 

// Configs
dotenv.config();
const client: Discord.Client = new Discord.Client().setMaxListeners(0);

// Commands
const falasBot: FalasBot = new FalasBot(client);
const mensagemRandom: MensagemRandom = new MensagemRandom(client);
const mensagemImagem: MensagemImagem = new MensagemImagem(client);
const milAnos: MilAnos = new MilAnos(client);
const botFalou: BotFalou = new BotFalou(client);

// Greeting
client.on("ready", () => {
	console.log(process.env.GREETING);
});

// Listen Commands
falasBot.listen();
mensagemRandom.listen();
mensagemImagem.listen();
milAnos.listen();
botFalou.listen();

// Login
client.login(process.env.BOT);
