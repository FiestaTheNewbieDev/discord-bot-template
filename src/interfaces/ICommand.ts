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
    run: (client, message, args) => void;
    runSlash?: (client, interaction) => void;
}
