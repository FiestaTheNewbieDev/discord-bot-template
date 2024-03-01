import {Client, Collection} from 'discord.js';
import ICommand from '@/interfaces/ICommand';

export default interface IClient extends Client {
    commands: Collection<string, ICommand>;
}
