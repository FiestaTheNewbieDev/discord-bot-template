export default interface IEvent {
    name: string;
    once: boolean;
    execute: (client, ...args) => void;
}
