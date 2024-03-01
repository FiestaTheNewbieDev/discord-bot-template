/* eslint-disable import/first */
require('module-alias/register');

import chalk from 'chalk';
import {Client, Collection, IntentsBitField} from 'discord.js';
import dotenv from 'dotenv';
import * as eventsHandler from '@/handlers/eventsHandler';
import * as commandsHandler from '@/handlers/commandsHandler';
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

eventsHandler.default(client);
commandsHandler.default(client);

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
