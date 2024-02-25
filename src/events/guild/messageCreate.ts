import IEvent from '@/interfaces/IEvent';

const prefix = '!';

export default {
    name: 'messageCreate',
    once: false,
    execute(client, message) {
        if (message.author.bot) return;

        if (message.content.startsWith(prefix)) {
            const args = message.content
                .slice(prefix.length)
                .trim()
                .split(/ +/g);
            const commandName = args.shift().toLowerCase();
            if (commandName.length === 0) return;

            const command = client.commands.get(commandName);
            if (command) command.run(client, message, args);
        }
    }
} as IEvent;
