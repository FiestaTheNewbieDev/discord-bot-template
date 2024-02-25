/* eslint-disable @typescript-eslint/no-explicit-any */
import {Client, Collection} from 'discord.js';

export default interface IClient extends Client {
    commands: Collection<any, any>;
}
