/**
 * The Bot class
 * 
 * And no, I don't know what I'm doing
 */
import {Client, Message} from "discord.js";
import * as dotenv from "dotenv";
dotenv.config();

export class Bot {
    /**
     * Creates and returns a bot
     * @returns Promise of the functional bot
     */
    public listen(): Promise<string> {
        let client = new Client();
        client.on("ready", (): void => {
            console.log(`${client.user.tag} is online`);
        })
        client.on("message", (message:Message) => {

        });
        return client.login(process.env.TOKEN);
    }
}