/* eslint-disable import/first */
// eslint-disable-next-line global-require
if (process.env.NODE_ENV === 'production') require('module-alias/register');

import chalk from 'chalk';
import {Client, Collection, IntentsBitField} from 'discord.js';
import dotenv from 'dotenv';
import registerEvents from '@/handlers/eventsHandler';
import registerCommands from '@/handlers/commandsHandler';
import IClient from '@/interfaces/IClient';

dotenv.config();

const client: IClient = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
}) as IClient;

client.commands = new Collection();

registerEvents(client);
registerCommands(client);

// !WARNING! Chalk work only if version 4.1.2

process.on('exit', code => {
    console.error(chalk.red(`Process terminated. Error code: ${code}`));
});
process.on('uncaughtException', (error: Error) => {
    console.error(
        chalk.red(
            `Uncaught Exception: An unexpected error occurred.\n${error.stack}`
        )
    );
});
process.on('unhandledRejection', (error: Error) => {
    console.error(
        chalk.red(
            `Unhandled Exception: An unexpected error occurred.\n${error.stack}`
        )
    );
});
process.on('warning', (...args) => console.warn(chalk.yellow(args)));

client.login(process.env.DISCORD_TOKEN);
