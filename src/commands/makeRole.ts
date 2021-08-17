/**
 * Command for making new roles
 */
 import {Client, Permissions, Message, MessageEmbed} from "discord.js";
 import {Command} from "../commands";
 export const command: Command = {
     name: "makeRole",
     aliases: ["mkrole", "makerole", "createrole"],
     category: "moderation",
     description: "creates a role\ntakes in **<role name>** <r> <g> <b>",
     permissions: [Permissions.FLAGS.MANAGE_ROLES],
     execute: (client: Client, msg: Message, args: Array<any>): Promise<void> => {
         let data = {};
         const embed = new MessageEmbed();
         if (args.length === 1) {
             data = {
                 name: args[0],
                 color: [Math.random()*255, Math.random()*255, Math.random()*255]
             }
         } else if (args.length === 4) {
            data = {
                name: args[0],
                color: [parseInt(args[1]), parseInt(args[2]), parseInt(args[3])]
            }
         } else {
            embed.setColor("#FF0000");
            embed.setTitle("Error!");
            embed.setDescription("Bad number of arguments");
            msg.channel.send(embed);
            return;
         }
         let hasPermission: boolean = true;
         for (const permission of command.permissions) {
             if (!msg.member.hasPermission(permission)) {
                 hasPermission = false;
             }
         }
         if (hasPermission) {
             msg.guild.roles.create({
                 data
             })
             .then(
                 role => {
                    embed.setColor("#00FF00");
                    embed.setTitle("Success!");
                    embed.setDescription(`Successfully created <@&${role.id}>`);
                    msg.channel.send(embed);
                 }
             )
             
         } else {
            embed.setColor("#FF0000");
            embed.setTitle("Error!");
            embed.setDescription("You don't have permissions");
            msg.channel.send(embed);
         }
         return;
     }
 }