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
    const commands: Collection<string, Command> = new Collection();
    const commandFiles = fs.readdirSync('./dist/commands').filter(file => file.endsWith('.js'));
    for (const fileName of commandFiles) {
        // TODO: hmmmMMMM
        // const command: Command = (await import(`./dist/commands/${fileName}`)).command;
        // commands.set(command.name, command);
    }
    commands.set(ping.name, ping); // TODO: don't use this after figuring out how to actually load commands
    client.on("message", async (msg: Message): Promise<void> => {
        if (msg.author.id === client.user.id) {
            return;
        }
        const args = msg.content.slice(prefix.length).trim().split(/ +/);
	    const command = args.shift().toLowerCase();
        if (commands.has(command)) {
            commands.get(command).execute(client, msg, args);
        }
    });
}