import {glob} from 'glob';
import path from 'path';
import {promisify} from 'util';
import IEvent from '@/interfaces/IEvent';
import eventsList from '@/utils/eventsList';
import IClient from '@/interfaces/IClient';

const pGlob = promisify(glob);

// !WARNING! Handlers work only if glob is version 7.2.0

async function loadEvents(client: IClient, dir: string) {
    const files = await pGlob(
        path.join(
            dir,
            `*${process.env.NODE_ENV === 'development' ? '.ts' : '.js'}`
        )
    );

    files.forEach(async (eventFile: string) => {
        const event: IEvent = await import(eventFile).then(
            module => module.default
        );

        if (!event.name || !eventsList.includes(event.name))
            throw new Error(`Unknown event -> ${eventFile}`);

        if (event.once)
            client.once(event.name, (...args) =>
                event.execute(client, ...args)
            );
        else client.on(event.name, (...args) => event.execute(client, ...args));

        console.log(`Event loaded: ${event.name}`);
    });

    const subdirs = await pGlob(path.join(dir, '*/'));

    subdirs.forEach(async (subdir: string) => {
        await loadEvents(client, subdir);
    });
}

export default async function register(client: IClient) {
    switch (process.env.NODE_ENV) {
        case 'development':
            await loadEvents(client, path.join(process.cwd(), 'src/events'));
            break;
        case 'production':
            await loadEvents(client, path.join(process.cwd(), 'build/events'));
            break;
        default:
            throw new Error('Unknown environment');
    }
    /*   
    switch (path.extname(__filename)) {
        case '.ts':
            await loadEvents(client, path.join(process.cwd(), 'src/events'));
            break;
        case '.js':
            await loadEvents(client, path.join(process.cwd(), 'build/events'));
            break;
        default:
            throw new Error('Unknown file extension');
    }
    */
}
