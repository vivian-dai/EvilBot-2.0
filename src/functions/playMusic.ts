/**
 * Music function
 */
import { Music, queue } from "../data/musicQueue";
import { Message, MessageEmbed } from "discord.js";

export = function playMusic(music: Music, msg: Message) {
    const embed = new MessageEmbed();
    embed.setColor("#0000FF");
    embed.setTitle("Music Finished!");
    if (music.music.length === 0) {
        embed.setDescription("Your queue has finished");
        queue.splice(queue.indexOf(music), 1);
    } else {
        embed.setDescription(`Now playing ${music.music[0]}`);
        msg.guild.me.voice.connection.play(music.music.shift()).on("finish", () => {
            playMusic(music, msg);
        });
    }
    msg.channel.send(embed);
}