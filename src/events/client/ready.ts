import chalk from 'chalk';
import dotenv from 'dotenv';
import IEvent from '@/interfaces/IEvent';
import ICommand from '@/interfaces/ICommand';

dotenv.config();

export default {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(chalk.green(`\n${client.user.username} ready\n`));

        const devGuild = await client.guilds.cache.get(
            process.env.DEV_GUILD_ID
        );
        devGuild.commands.set(
            client.commands
                .filter((command: ICommand) => command.runSlash)
                .map((command: ICommand) => command)
        );
    }
} as IEvent;
