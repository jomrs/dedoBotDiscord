import { Client, Events, REST, Routes } from 'discord.js';
import dotenv from 'dotenv';

class SetupSlashCommands {
    private client!: Client;
    private CLIENT_ID: string = process.env.CLIENT_ID!;
    private BOT_TOKEN: string = process.env.BOT!;

    constructor(client: Client) {
        dotenv.config();
        this.client = client;
    }

    async init (): Promise<void> {
        const rest = new REST({ version: '10' }).setToken(this.BOT_TOKEN);
        const commands = require('./slash/cumprimentar.js');

        try {
            console.log(`Started refreshing application (/) commands.`);

            const data = await rest.put(
                Routes.applicationCommands(this.CLIENT_ID),
                { body: [commands.data.toJSON()] },
            );
    
            console.log(`Successfully reloaded application (/) commands.`);
        } catch (error) {
            console.error(error);
        }

        this.client.on(Events.InteractionCreate, async interaction => {
            try {
                await commands.execute(interaction);
            } catch (error) {
                console.error(`Error executing`);
                console.error(error);
            }
        });
    }
}

export { SetupSlashCommands };
