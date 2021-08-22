/**
 * command to create a new channel
 */
 import {Client, Permissions, Message, MessageEmbed} from "discord.js";
 import {Command} from "../commands";
 export const command: Command = {
     name: "createChannel",
     aliases: ["createchannel", "makechannel", "mkchannel"],
     category: "moderation",
     permissions: [Permissions.FLAGS.MANAGE_CHANNELS],
     description: "creates a new channel\ntakes in **<channel name>** **<category>**",
     execute: (client: Client, msg: Message, args: Array<any>): Promise<void> => {
         const embed: MessageEmbed = new MessageEmbed();
         let hasPermission: boolean = true;
         for (const permission of command.permissions) {
             if (!msg.member.hasPermission(permission)) {
                 hasPermission = false;
             }
         }
         if (hasPermission) {
             if (args.length >= 2) {
                 if (args.length > 2) {
                     args[1] = args.slice(1, args.length).join(" ");
                 }
                 msg.guild.channels.create(args[0])
                 .then(channel => {
                    let category = msg.guild.channels.cache.find(c => c.name.toLowerCase() == args[1].toLowerCase() && c.type == "category");
                    if (category) {
                        channel.setParent(category.id);
                        embed.setColor("#00FF00");
                        embed.setTitle("Success!");
                        embed.setDescription(`Created channel <#${channel.id}>`);
                        msg.channel.send(embed);
                    } else {
                        embed.setColor("#FF0000");
                        embed.setTitle("Error!");
                        embed.setDescription("Category not found");
                        msg.channel.send(embed);
                    }
                 })
             } else {
                embed.setColor("#FF0000");
                embed.setTitle("Error!");
                embed.setDescription("Bad number of arguments");
                msg.channel.send(embed);
             }
         } else {
            embed.setColor("#FF0000");
            embed.setTitle("Error!");
            embed.setDescription("You don't have permissions");
            msg.channel.send(embed);
         }
         return;
     }
 }