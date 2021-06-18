/**
 * The Bot class
 * 
 * And no, I don't know what I'm doing
 */

import {Client, Collection, Message} from "discord.js";
import * as dotenv from "dotenv";
import fs from "fs";
import * as commands from "./commands";

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

        client.on("message", (message:Message) => {
            console.log(commands);
            for (const command of commands) {
                console.log(commands);
            }
        })
        return client.login(process.env.TOKEN);
    }
}