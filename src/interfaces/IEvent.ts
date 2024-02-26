import IClient from '@/interfaces/IClient';

export default interface IEvent {
    name: string;
    once: boolean;
    execute: (client: IClient, ...args) => void;
}
