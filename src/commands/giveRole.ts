/**
 * Command for making new roles
 */
 import {Client, Permissions, Message, MessageEmbed, Role} from "discord.js";
 import {Command} from "../commands";
 export const command: Command = {
     name: "giveRole",
     aliases: ["giverole", "addrole"],
     category: "moderation",
     description: "creates a role\ntakes in **<role (ping or id)>** **<user to give role to(ping or id)>**",
     permissions: [Permissions.FLAGS.MANAGE_ROLES],
     execute: (client: Client, msg: Message, args: Array<any>): Promise<void> => {
         let hasPermission: boolean = true;
         const embed = new MessageEmbed();
         for (const permission of command.permissions) {
             if (!msg.member.hasPermission(permission)) {
                 hasPermission = false;
             }
         }
         if (hasPermission) {
             if (args.length === 2) {
                 // getting role from mention
                 if ((args[0].startsWith("<@&")) && (args[0].endsWith(">"))) {
                     args[0] = args[0].slice(3, -1);
                 }
                 // getting user from mention
                 if ((args[1].startsWith("<@")) && args[1].endsWith(">")) {
                     args[1] = args[1].slice(2, -1);
                     if (args[1].startsWith("!")) {
                         args[1] = args[1].slice(1);
                     }
                 }
                 msg.guild.members.cache.get(args[1]).roles.add(msg.guild.roles.cache.get(args[0]));
                 embed.setColor("#00FF00");
                 embed.setTitle("Success!");
                 embed.setDescription(`Gave <@&${args[0]}> to <@${args[1]}>`)
                 msg.channel.send(embed);
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