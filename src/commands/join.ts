/**
 * Joins a voice channel
 */
import { Client, Message, MessageEmbed } from "discord.js";
import { Command } from "../commands";
export const command: Command = {
    name: "join",
    aliases: ["join", "joinvc", "j"],
    category: "music",
    permissions: [],
    description: "Joins whatever voice channel you're in",
    execute: (client: Client, msg: Message, args: Array<any>): Promise<void> => {
        const embed = new MessageEmbed();
        if (!msg.member.voice.channel) {
            embed.setColor("#FF0000");
            embed.setTitle("Error!");
            embed.setDescription("Join a voice channel first");
        } else {
            msg.member.voice.channel.join();
            embed.setColor("#00FF00");
            embed.setTitle("Success!");
            embed.setDescription(`Hello ${msg.member.voice.channel.name}!`);
        }
        msg.channel.send(embed);
        return;
    }
}