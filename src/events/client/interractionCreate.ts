import IEvent from '@/interfaces/IEvent';

export default {
    name: 'interactionCreate',
    once: false,
    async execute(client, interaction) {
        if (interaction.isCommand()) {
            const command = client.commands.get(interaction.command.name);
            if (!command) return interaction.reply('Unknow command');
            command.runSlash(client, interaction);
        }
    }
} as IEvent;
