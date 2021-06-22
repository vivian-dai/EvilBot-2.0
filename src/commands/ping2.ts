import {Client, Message} from "discord.js";
import {Command} from "../commands";
export const command: Command = {
    name: "ping2",
    aliases: ["ping2"],
    description: "the Discord bot \"Hello world!\" equivalent.... it is what it is",
    execute: (client: Client, msg: Message, args: Array<any>): Promise<void> => {
        msg.reply(`pong 2 ${args}`);
        return;
    }
}