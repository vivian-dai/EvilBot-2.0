/**
 * Ping test command
 */
 import {Client, Message, MessageEmbed, Permissions} from "discord.js";
 import {Command} from "../commands";
 export const command: Command = {
     name: "deleteChannel",
     aliases: ["deletechannel", "delchan", "delchannel"],
     category: "moderation",
     permissions: [Permissions.FLAGS.MANAGE_CHANNELS],
     description: "deletes a channel\ntakes in **<channel as discord channel (#channel name)>**",
     execute: (client: Client, msg: Message, args: Array<any>): Promise<void> => {
        const embed: MessageEmbed = new MessageEmbed();
        let hasPermission: boolean = true;
        for (const permission of command.permissions) {
            if (!msg.member.hasPermission(permission)) {
                hasPermission = false;
            }
        }
        if (hasPermission) {
            if (args.length === 1) {
                if ((args[0].startsWith("<#")) && (args[0].endsWith(">"))) {
                    args[0] = args[0].slice(2, -1);
                }
                let channel = msg.guild.channels.cache.get(args[0]);
                if (channel) {
                    channel.delete();
                    embed.setTitle("Success!");
                    embed.setColor("#00FF00");
                    embed.setDescription("Successfully deleted the channel");

                } else {
                    embed.setColor("#FF0000");
                    embed.setTitle("Error!");
                    embed.setDescription("Channel not found");
                }
            } else {
               embed.setColor("#FF0000");
               embed.setTitle("Error!");
               embed.setDescription("Bad number of arguments");
            }
        } else {
           embed.setColor("#FF0000");
           embed.setTitle("Error!");
           embed.setDescription("You don't have permissions");
        }
        msg.channel.send(embed);
        return;
     }
 }