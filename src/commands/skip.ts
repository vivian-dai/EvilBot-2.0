/**
 * Joins a voice channel
 */
import { Client, Message, MessageEmbed } from "discord.js";
import { Command } from "../commands";
import { Music, queue } from "../data/musicQueue";
import playMusic from "../functions/playMusic";
export const command: Command = {
    name: "skip",
    aliases: ["skip"],
    category: "music",
    permissions: [],
    description: "Skips to the next music in the queue",
    execute: async (client: Client, msg: Message, args: Array<any>): Promise<void> => {
        const embed = new MessageEmbed();
        if (msg.guild.me.voice.connection) {
            if (args.length === 0) {
                let foundChannel = false;
                for (const channel of queue) {
                    if (channel.id === msg.guild.me.voice.channel.id) {
                        foundChannel = true;
                        playMusic(channel, msg);
                        embed.setColor("#0000FF");
                        embed.setDescription("Skipped");
                    }
                }
                if (!foundChannel) {
                    embed.setColor("#FF0000");
                    embed.setTitle("Error!");
                    embed.setDescription("There's no queue here");
                }
            } else {
                embed.setColor("#FF0000");
                embed.setTitle("Error!");
                embed.setDescription("Bad number of arguments");
            }
        } else {
            embed.setColor("#FF0000");
            embed.setTitle("Error!");
            embed.setDescription("Get me to join a channel first");
        }
        msg.channel.send(embed);
        return;
    }
}
