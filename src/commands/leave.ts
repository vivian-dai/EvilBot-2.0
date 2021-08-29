/**
 * Joins a voice channel
 */
 import {Client, Message, MessageEmbed} from "discord.js";
 import {Command} from "../commands";
 import { queue } from "../data/musicQueue";
 export const command: Command = {
     name: "leave",
     aliases: ["leave", "disconnect", "dc"],
     category: "music",
     permissions: [],
     description: "Leaves the voice channel",
     execute: (client: Client, msg: Message, args: Array<any>): Promise<void> => {
         const embed = new MessageEmbed();
         if (!msg.guild.me.voice.channel) {
             embed.setColor("#FF0000");
             embed.setTitle("Error!");
             embed.setDescription("Ask me to join a channel first");
         } else {
             embed.setColor("#00FF00");
             embed.setTitle("Success!");
             embed.setDescription(`Bye ${msg.guild.me.voice.channel.name}!`);
             for (const channel of queue) {
                 if (channel.id === msg.guild.me.voice.channel.id) {
                     queue.splice(queue.indexOf(channel), 1);
                 }
             }
             msg.guild.me.voice.channel.leave();
         }
         msg.channel.send(embed);
         return;
     }
 }