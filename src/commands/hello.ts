import ICommand from '@/interfaces/ICommand';

export default {
    name: 'hello',
    description: 'Hello world!',
    run(client, message, args) {
        message.channel.sendTyping();
        message.channel.send('Hello, world!');
    },
    runSlash(client, interaction) {
        interaction.reply('Hello, world!');
    }
} as ICommand;
