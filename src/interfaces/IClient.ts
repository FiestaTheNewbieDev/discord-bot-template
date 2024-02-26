import {Client, Collection} from 'discord.js';
import ICommand from './ICommand';

export default interface IClient extends Client {
    commands: Collection<string, ICommand>;
}
