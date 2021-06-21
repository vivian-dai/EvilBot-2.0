import {Client, Message} from "discord.js";
import {Command} from "../commands";
export const ping: Command = {
    name: "ping",
    aliases: ["ping"],
    description: "pong",
    execute: (client: Client, msg: Message, args: Array<any>): void => {
        msg.reply(`pong ${args}`);
    }
}