/**
 * The Bot class
 * 
 * And no, I don't know what I'm doing
 */

import {Client, Collection, Message} from "discord.js";
import * as dotenv from "dotenv";
import fs from "fs";

export class Bot {
    /**
     * Creates and returns a bot
     * @returns Promise of the functional bot
     */
    public listen(): Promise<string> {
        let client = new Client();
        client.on("ready", (): void => {
            console.log(`${client.user.tag} is online`);
        });
        let commands:Collection<string, string> = new Collection();
        // const commandFiles:string[] = fs.readdirSync("./commands").filter(file => file.endsWith(".ts"));
        // for (const file of commandFiles) {
        //     const command = require(`./commands/${file}`);
        // }
        return client.login(process.env.TOKEN);
    }
}