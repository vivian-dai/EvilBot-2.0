/**
 * Joins a voice channel
 */
 import {Client, Message, MessageEmbed} from "discord.js";
 import {Command} from "../commands";
 export const command: Command = {
     name: "play",
     aliases: ["play", "playmusic"],
     category: "music",
     permissions: [],
     description: "Plays music\ntakes in <URL of music to play>",
     execute: (client: Client, msg: Message, args: Array<any>): Promise<void> => {
         const embed = new MessageEmbed();
         if (msg.guild.me.voice.connection) {
            if (args.length === 1) {
                try {
                    msg.guild.me.voice.connection.play(args[0]);
                    embed.setColor("#0000FF");
                    embed.setTitle("Music!");
                    embed.setDescription(`Playing ${args[0]} in ${msg.member.voice.channel.name}`);
                } catch {
                    embed.setColor("#FF0000");
                    embed.setTitle("Error!");
                    embed.setDescription("Something went wrong (URL probably wasn't reachable)");
                }
            } else {
                msg.guild.me.voice.connection.play("https://upload.wikimedia.org/wikipedia/commons/e/e5/Tetris_theme.ogg");
                embed.setColor("#0000FF");
                embed.setTitle(">:)");
                embed.setDescription("It's not my fault you're listening to Tetris now");
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