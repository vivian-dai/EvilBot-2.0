/**
 * Export for commands
 * 
 * And no I have yet to understand what I'm doing
 */
import {Client, Message} from "discord.js";
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
        const argsBack = args.join(" ").split("");
        let foundQuote: boolean = false;
        let newArgs = [];
        let curArg = ""
        for (let i = 0;i < argsBack.length;i++) {
            if (argsBack[i] === "\"") {
                foundQuote = !foundQuote;
            } else if ((argsBack[i] === " ") && (!foundQuote)) {
                newArgs.push(curArg);
                curArg = "";
            } else {
                curArg += argsBack[i];
            }
        }
        if (curArg !== ""){
            newArgs.push(curArg);
        }
        for (let i = 0; i < commands.length; i++) {
            const commandAliases: Array<String> = commands[i].aliases;
            for (let j = 0; j < commandAliases.length; j++) {
                if (commandAliases[j] === command) {
                    commands[i].execute(client, msg, newArgs);
                }
            }
        }
    });
}