//Libs
import Discord from 'discord.js';
import Canvas from 'canvas';
import ytdl from 'ytdl-core';
import dotenv from 'dotenv';
import { createRequire } from 'module';

//commands
import { sendBuzz } from './commands/buzz.js'; 


//configs

dotenv.config();
const client = new Discord.Client();
const prefix = '!';
const require = createRequire(import.meta.url);
import * as msg_imagens from './commands/msg_imagens.json';

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

client.on('message', message => {
	if(message.author.bot) return;
	if(message.content.startsWith('/u')) {
		msg_original = message.content;
		message.delete();
		message.channel.send(msg_original.slice(2, message.content.length));
	}
})

// CODIGO DO BOT DE MÚSICA
client.on("message", async message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const filaServidor = fila.get(message.guild.id);

    if (message.content.startsWith(`${prefix}play`)) {
    	executar(message, filaServidor);
    	return;
    } else if (message.content.startsWith(`${prefix}skip`)) {
    	skip(message, filaServidor);
    	return;
    } else if (message.content.startsWith(`${prefix}stop`)) {
    	stop(message, filaServidor);
    	return;
    } else if (message.content.startsWith(`${prefix}fila`)) {
		filaPlayer(message, filaServidor);
		return;
	} else if (message.content.startsWith(`${prefix}cmd`)) {
		message.channel.send(`**Paleta de Comandos:**\n**!play {url} -** Arroxa no play.\n**!stop -** Comando dos estraga festa.\n**!skip -** Skipa a música atual.\n**!fila -** Lista a fila de músicas bb.`);
		return;
 	} else {
    message.channel.send("Comando invalido amigão!");
    }
});

async function executar(message, filaServidor) {
	args = message.content.split(" ");
  
	const voiceChannel = message.member.voice.channel;
	if (!voiceChannel)
	  return message.channel.send(
		"Ta tirando? Entra num canal de voz primeiro, anta!"
	  );
	const permissions = voiceChannel.permissionsFor(message.client.user);
	if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
	  return message.channel.send(
		"Se você não me der a permissão de falar no canal de voz fica dificil parceiro!"
	  );
	}
  
	try {
		const songInfo = await ytdl.getInfo(args[1]);
		const song = {
			title: songInfo.videoDetails.title,
			url: songInfo.videoDetails.video_url,
	   };

	   if (!filaServidor) {
		const queueContruct = {
		  textChannel: message.channel,
		  voiceChannel: voiceChannel,
		  connection: null,
		  songs: [],
		  volume: 5,
		  playing: true
		};
	
		fila.set(message.guild.id, queueContruct);
	
		queueContruct.songs.push(song);
	
		try {
		  var connection = await voiceChannel.join();
		  queueContruct.connection = connection;
		  play(message.guild, queueContruct.songs[0]);
		} catch (err) {
		  console.log(err);
		  fila.delete(message.guild.id);
		  return message.channel.send(err);
		}
	  } else {
		filaServidor.songs.push(song);
		return message.channel.send(`**${song.title}** \nadicionei na fila, agora vê se não enche! 👌`);
	  }

	} catch (e) {
		return message.channel.send(`deu merda fellas n sei oq bugou más ta aqui o ${e}`)
	}
}

function skip(message, filaServidor) {
	if (!message.member.voice.channel)
	  return message.channel.send(
		"Qualé amigão se quiser skipar vai ter que entrar no canal de música, ta na terceira idade já?"
	  );
	if (!filaServidor)
	  return message.channel.send("Fera, se tivesse uma música na fila eu até skiparia ela pra você, mas é maior que eu, consegue entender?!");
	filaServidor.connection.dispatcher.end();
}


function stop(message, filaServidor) {
	if (!message.member.voice.channel)
	  return message.channel.send(
		"Engraçadão amigo, que tal pelo menos entrar no canal de voz antes de tentar parar a música? A moderação agradece."
	  );
	  
	if (!filaServidor)
	  return message.channel.send("A fila ta mais vaiza que meu coração, não tem nada pra parar, agora sai daqui.");
	  
	filaServidor.songs = [];
	filaServidor.connection.dispatcher.end();
}

 
function play(guild, song) {
	const filaServidor = fila.get(guild.id);
	if (!song) {
	  filaServidor.voiceChannel.leave();
	  fila.delete(guild.id);
	  return;
	}

    const transmitir = filaServidor.connection
    .play(ytdl(song.url))
    .on("finish", () => {
      filaServidor.songs.shift();
      play(guild, filaServidor.songs[0]);
    })
    .on("error", error => console.error(error));
  transmitir.setVolumeLogarithmic(filaServidor.volume / 5);
  filaServidor.textChannel.send(`🔈 Tocando atualmente: **${song.title}**`);
}

function filaPlayer(message, filaServidor) {
	let na_fila = filaServidor.songs.map((musica, idx) => `🎵 | ${idx}° - ${musica.title}`)
	na_fila = na_fila.join('\n')
	return message.channel.send(`Fila atual:\n**${na_fila}**`)
}

// INIT SEND BUZZ
sendBuzz(client);

client.login(process.env.BOT);
