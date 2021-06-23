/**
 * Help command
 */
import {Client, Message, MessageEmbed} from "discord.js";
import {Command} from "../commands";
import fs from "fs";

export const command: Command = {
    name: "help",
    aliases: ["help"],
    description: "the help command",
    execute: async (client: Client, msg: Message, args: Array<any>): Promise<void> => {
        const embed = new MessageEmbed();
        embed.setColor("#FF0000");
        if (args.length == 0) {
            for (const fileName of await fs.readdirSync("./dist/commands").filter(file => file.endsWith(".js"))) {
                // name every single command "command" so that it grabs the object named "command" as a Command object
                const command = (await import(`./${fileName}`)).command as Command; // will read one command per file
                embed.addField(command.name, command.description);
            }
        } else if (args.length == 1) {
            for (const fileName of await fs.readdirSync("./dist/commands").filter(file => file.endsWith(".js"))) {
                // name every single command "command" so that it grabs the object named "command" as a Command object
                const command = (await import(`./${fileName}`)).command as Command; // will read one command per file
                if (command.name === args[0]) {
                    embed.setTitle(command.name);
                    embed.addField(command.description, command.aliases);
                }
            }
        }
        msg.channel.send(embed);
        return;
    }
}