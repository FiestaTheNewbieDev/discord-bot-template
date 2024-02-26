import {glob} from 'glob';
import path from 'path';
import {promisify} from 'util';
import ICommand from '@/interfaces/ICommand';
import IClient from '@/interfaces/IClient';

const pGlob = promisify(glob);

// !WARNING! Handlers work only if glob is version 7.2.0

async function loadCommands(client: IClient, dir: string) {
    const files = await pGlob(path.join(dir, '*.ts'));

    files.forEach(async (commandFile: string) => {
        const command: ICommand = await import(commandFile).then(
            module => module.default
        );

        if (!command.name) throw new Error(`No command name in ${commandFile}`);
        if (!command.description)
            throw new Error(`No command description in ${commandFile}`);
        if (!command.run)
            throw new Error(`No command run function in ${commandFile}`);

        client.commands.set(command.name, command);
        console.log(`Command loaded: ${command.name}`);
    });

    const subdirs = await pGlob(path.join(dir, '*/'));

    subdirs.forEach(async (subdir: string) => {
        await loadCommands(client, subdir);
    });
}

export default async (client: IClient) => {
    await loadCommands(client, path.join(process.cwd(), 'src/commands'));
};
