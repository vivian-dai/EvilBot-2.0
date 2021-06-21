/**
 * Export for commands
 * 
 * And no I have yet to understand what I'm doing
 */
import {Client, Collection, Message} from "discord.js";
import {ping} from "./commands/ping"; // TODO: will temporarily keep this here until i can not use it
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
    const commandFiles = fs.readdirSync('./dist/commands').filter(file => file.endsWith('.js'));
    for (const fileName of commandFiles) {
        // TODO: hmmmMMMM
        console.log(fileName);
        // const command: Command = (await import(`./dist/commands/${fileName}`)).command;
        // commands.set(command.name, command);
    }
    commands.push(ping); // TODO: don't use this after figuring out how to actually load commands
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