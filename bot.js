"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Libs | Commands
const discord_js_1 = __importDefault(require("discord.js"));
const dotenv_1 = __importDefault(require("dotenv"));
const falas_bot_1 = require("./commands/falas_bot");
//configs
dotenv_1.default.config();
const client = new discord_js_1.default.Client();
const Canvas = require('canvas');
let sendBuzz = require('./commands/buzz.js');
const falasBot = new falas_bot_1.FalasBot(client);
//data
const msg_random = require('./messages/random_msg.json');
const msg_imagens = require('./commands/msg_imagens.json');
client.on("ready", () => {
    console.log("Tamo junto fml, pai ta on!");
});
Object.keys(msg_random).forEach((fala) => {
    client.on("message", (mensagem) => {
        if (mensagem.author.bot)
            return;
        if (mensagem.content.includes(fala)) {
            const maior_valor = msg_random[fala].length;
            let posicao_aleatoria = Math.floor(Math.random() * (maior_valor - 0));
            mensagem.channel.send(msg_random[fala][posicao_aleatoria]);
        }
    });
});
// HANDLER DE COMANDOS IMAGENS
Object.keys(msg_imagens).forEach((fala) => {
    client.on("message", (mensagem) => {
        if (mensagem.author.bot)
            return;
        if (mensagem.content.includes(fala)) {
            try {
                mensagem.channel.send({ files: msg_imagens[fala] });
            }
            catch (error) {
                console.log(`Problema aqui amigão: ${error}`);
            }
        }
    });
});
client.on("message", (msg) => __awaiter(void 0, void 0, void 0, function* () {
    const mensionado = msg.mentions.users.first();
    const autor_msg = msg.author;
    if (msg.content.includes('@') && mensionado) {
        try {
            const autor_msg_url = autor_msg.avatar ? `https://cdn.discordapp.com/avatars/${autor_msg.id}/${autor_msg.avatar}.png?size=256` : "./src/pictures/bot.png";
            const mensionado_url = mensionado.avatar ? `https://cdn.discordapp.com/avatars/${mensionado.id}/${mensionado.avatar}.png?size=256` : "./src/pictures/bot.png";
            const canvas = Canvas.createCanvas(600, 600);
            const context = canvas.getContext('2d');
            let mil_anos_bg = yield Canvas.loadImage('./src/pictures/naruto.jpg');
            const autor_pic = yield (Canvas.loadImage(autor_msg_url));
            const mensionado_pic = yield (Canvas.loadImage(mensionado_url));
            context.drawImage(mil_anos_bg, 0, 0, canvas.width, canvas.height);
            context.drawImage(autor_pic, 325, 215, 85, 85);
            context.drawImage(mensionado_pic, 12, 85, 85, 85);
            const attachment = new discord_js_1.default.MessageAttachment(canvas.toBuffer(), 'mil_anos.png');
            msg.channel.send(attachment);
        }
        catch (error) {
            console.log(error);
        }
    }
}));
client.on('message', message => {
    if (message.author.bot)
        return;
    if (message.content.startsWith('/u')) {
        let msg_original = message.content;
        message.delete();
        message.channel.send(msg_original.slice(2, message.content.length));
    }
});
// INIT LISTENERS
sendBuzz(client);
falasBot.listen();
client.login(process.env.BOT);
