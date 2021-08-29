/**
 * Joins a voice channel
 */
import { Client, Message, MessageEmbed } from "discord.js";
import { Command } from "../commands";
import { Music, queue } from "../data/musicQueue";
import playMusic from "../functions/playMusic";
export const command: Command = {
    name: "queue",
    aliases: ["queue", "q"],
    category: "music",
    permissions: [],
    description: "Queues music\ntakes in **<URL of music to queue>**",
    execute: (client: Client, msg: Message, args: Array<any>): Promise<void> => {
        const embed = new MessageEmbed();
        if (msg.guild.me.voice.connection) {
            if (args.length === 0) {
                let foundChannel = false;
                for (const channel of queue) {
                    if (channel.id === msg.guild.me.voice.channel.id) {
                        foundChannel = true;
                        embed.setColor("#0000FF");
                        if (channel.music.length > 0) {
                            embed.setTitle("Your Music:");
                            embed.setDescription(channel.music);
                        } else {
                            embed.setDescription("Your queue is empty");
                        }
                    }
                }
                if (!foundChannel) {
                    embed.setColor("#FF0000");
                    embed.setTitle("Error!");
                    embed.setDescription("You don't have a queue here!");
                }
            } else if (args.length === 1) {
                let foundChannel = false;
                for (const channel of queue) {
                    if (channel.id === msg.guild.me.voice.channel.id) {
                        foundChannel = true;
                        channel.music.push(args[0]);
                    }
                }
                if (!foundChannel) {
                    queue.push({ id: msg.guild.me.voice.channel.id, music: [args[0]] });
                    const musicChannel = queue[queue.length - 1];
                    playMusic(musicChannel, msg);

                }
                embed.setColor("#00FF00");
                embed.setTitle("Success!");
                embed.setDescription(`Queued ${args[0]}`);

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
