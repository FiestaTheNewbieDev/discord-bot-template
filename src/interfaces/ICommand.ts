import IClient from '@/interfaces/IClient';

export default interface ICommand {
    name: string;
    description: string;
    options?: [
        {
            name: string;
            description: string;
            required: boolean;
            type: number;
        }
    ];
    run: (client: IClient, message, args) => void;
    runSlash?: (client: IClient, interaction) => void;
}
