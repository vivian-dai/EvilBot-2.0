import {Client, Message} from "discord.js";
import {Command} from "../commands";
export const ping: Command = {
    name: "ping",
    aliases: ["ping"],
    description: "the Discord bot \"Hello world!\" equivalent.... it is what it is",
    execute: (client: Client, msg: Message, args: Array<any>): void => {
        msg.reply(`pong ${args}`);
    }
}