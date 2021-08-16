/**
 * Ping test command
 */
import {Client, Permissions, Message} from "discord.js";
import {Command} from "../commands";
export const command: Command = {
    name: "ping",
    aliases: ["ping", "p", "png"],
    category: "test",
    permissions: [],
    description: "the Discord bot \"Hello world!\" equivalent.... it is what it is",
    execute: (client: Client, msg: Message, args: Array<any>): Promise<void> => {
        msg.reply(`pong ${args}`);
        return;
    }
}