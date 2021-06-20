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
export const loadCommands = (client: Client) : void => {
    client.on("message", async (msg: Message): Promise<void> => {
        if (msg.author.id === client.user.id) {
            return;
        }
        msg.reply("hi");
    });
}