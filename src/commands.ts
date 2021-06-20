/**
 * Export for commands
 * 
 * And no I have yet to understand what I'm doing
 */
import {Client, Message} from "discord.js";
interface Command {
    name: string;
    aliases: Array<string>;
    description: string;
    execute(
        client: Client,
        msg: Message
    ): Promise<void>;
}
export const loadCommand = (client: Client) : void => {
    client.on("message", async (msg: Message): Promise<void> => {
        
    });
}