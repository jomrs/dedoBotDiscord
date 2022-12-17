import { SlashCommandBuilder } from 'discord.js';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('salve')
		.setDescription('O bot lansa um salve para você.'),
	async execute(interaction: any) {
		await interaction.reply(`salve ${interaction.user.username} meu lindo.`);
	},
};
