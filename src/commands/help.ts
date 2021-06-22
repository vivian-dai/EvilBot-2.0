import {Client, Message, MessageEmbed} from "discord.js";
import {Command} from "../commands";
// import commands from "../commands";
import fs from "fs";

export const command: Command = {
    name: "help",
    aliases: ["help"],
    description: "the help command",
    execute: async (client: Client, msg: Message, args: Array<any>): Promise<void> => {
        const embed = new MessageEmbed();
        for (const fileName of await fs.readdirSync("./dist/commands").filter(file => file.endsWith(".js"))) {
            // name every single command "command" so that it grabs the object named "command" as a Command object
            const command = (await import(`./${fileName}`)).command as Command; // will read one command per file
            embed.addField(command.name, command.description);
            console.log(command);
        }
        console.log("hi");
        msg.channel.send(embed);
        return;
    }
}