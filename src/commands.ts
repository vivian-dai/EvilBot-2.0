/**
 * Export for commands
 * 
 * And no I have yet to understand what I'm doing
 */
import {Client, Collection, Permissions, Message} from "discord.js";
import fs from "fs";
export interface Command {
    name: string;
    aliases: Array<string>;
    category: string;
    description: string;
    permissions: Array<number>;
    execute(
        client: Client,
        msg: Message,
        args: Array<any>
    ): Promise<void>;
}
export const loadCommands = async (client: Client) : Promise<void> => {
    const prefix:string = "!"; // lol bad coding
    const commands: Array<Command> = [];
    for (const fileName of await fs.readdirSync("./dist/commands").filter(file => file.endsWith(".js"))) {
        // name every single command "command" so that it grabs the object named "command" as a Command object
        const command = (await import(`./commands/${fileName}`)).command as Command; // will read one command per file
        commands.push(command);
    }
    client.on("message", async (msg: Message): Promise<void> => {
        if (msg.author.id === client.user.id) {
            return;
        }
        const args = msg.content.slice(prefix.length).trim().split(/ +/);
	    const command = args.shift().toLowerCase();
        for (let i = 0; i < commands.length; i++) {
            const commandAliases: Array<String> = commands[i].aliases;
            for (let j = 0; j < commandAliases.length; j++) {
                if (commandAliases[j] === command) {
                    commands[i].execute(client, msg, args);
                }
            }
        }
    });
}