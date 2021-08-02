/**
 * Help command
 */
import {Client, Message, MessageEmbed} from "discord.js";
import {Command} from "../commands";
import fs from "fs";

export const command: Command = {
    name: "help",
    aliases: ["help"],
    category: "usage",
    description: "the help command",
    execute: async (client: Client, msg: Message, args: Array<any>): Promise<void> => {
        const embed = new MessageEmbed();
        embed.setColor("#FF0000");
        embed.setTitle("Help");
        embed.setDescription("use !help <command> to get more information about the command");
        if (args.length == 0) {
            for (const fileName of await fs.readdirSync("./dist/commands").filter(file => file.endsWith(".js"))) {
                // name every single command "command" so that it grabs the object named "command" as a Command object
                const command = (await import(`./${fileName}`)).command as Command; // will read one command per file
                let foundField: boolean = false;
                for (const field of embed.fields) {
                    if (field.name === command.category) {
                        field.value += `\n${command.name}`;
                        foundField = true;
                    }
                }
                if (!foundField) {
                    embed.addField(command.category, command.name);
                }
            }
        } else if (args.length == 1) {
            for (const fileName of await fs.readdirSync("./dist/commands").filter(file => file.endsWith(".js"))) {
                // name every single command "command" so that it grabs the object named "command" as a Command object
                const command = (await import(`./${fileName}`)).command as Command; // will read one command per file
                if (command.name === args[0]) {
                    embed.setTitle(command.name);
                    embed.setDescription(command.description);
                    embed.addField(`category: ${command.category}`, command.aliases);
                }
            }
        }
        msg.channel.send(embed);
        return;
    }
}