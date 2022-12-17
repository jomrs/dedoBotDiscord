// Imports | Libs
import { Client, GatewayIntentBits, Events } from 'discord.js';
import dotenv from 'dotenv';
import { FalasBot }  from './commands/message/falas_bot';
import { MensagemRandom } from './commands/message/mensagem_random';
import { MensagemImagem } from './commands/message/mensagem_imagem';
import { MilAnos } from './commands/message/mil_anos';
import { BotFalou } from './commands/message/bot_falou'; 
import { SetupSlashCommands } from './commands/setup_slash';

// Configs
dotenv.config();
const BOT_TOKEN: string = process.env.BOT!;

const client: Client = new Client(
	{
		intents: [
			GatewayIntentBits.Guilds,
			GatewayIntentBits.GuildMessages,
			GatewayIntentBits.MessageContent
		]
	}
);

// Commands
const falasBot: FalasBot = new FalasBot(client);
const mensagemRandom: MensagemRandom = new MensagemRandom(client);
const mensagemImagem: MensagemImagem = new MensagemImagem(client);
const milAnos: MilAnos = new MilAnos(client);
const botFalou: BotFalou = new BotFalou(client);
const setupSlash: SetupSlashCommands = new SetupSlashCommands(client);

// Greeting
client.on(Events.ClientReady, () => console.log(process.env.GREETING));

// Listen Commands
falasBot.listen();
mensagemRandom.listen();
mensagemImagem.listen();
milAnos.listen();
botFalou.listen();
setupSlash.init();

// Login
client.login(BOT_TOKEN);
