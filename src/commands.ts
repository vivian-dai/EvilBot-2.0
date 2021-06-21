/**
 * Export for commands
 * 
 * And no I have yet to understand what I'm doing
 */
import {Client, Collection, Message} from "discord.js";
import fs from "fs";
export interface Command {
    name: string;
    aliases: Array<string>;
    description: string;
    execute(
        client: Client,
        msg: Message,
        args: Array<any>
    ): void;
}
export const loadCommands = async (client: Client) : Promise<void> => {
    const prefix:string = "!"; // lol bad coding
    const commands: Array<Command> = [];
    for (const fileName of await fs.readdirSync("./dist/commands").filter(file => file.endsWith(".js"))) {
        const command = (await import(`./commands/${fileName}`)) as Command;
        commands.push(command);
    }
    console.log(commands);
    client.on("message", async (msg: Message): Promise<void> => {
        if (msg.author.id === client.user.id) {
            return;
        }
        const args = msg.content.slice(prefix.length).trim().split(/ +/);
	    const command = args.shift().toLowerCase();
        for (let i = 0; i < commands.length; i++) {
            console.log(commands[i]);
            const commandAliases: Array<String> = commands[i].com.aliases;
            for (let j = 0; j < commandAliases.length; j++) {
                if (commandAliases[j] === command) {
                    commands[i].com.execute(client, msg, args);
                }
            }
        }
    });
}