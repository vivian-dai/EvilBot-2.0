/**
 * Event to run when bot is ready
 */
import {Client, Collection, Message} from "discord.js";
import { Event } from "../events";
import fetch from "node-fetch";
export const event: Event = {
    trigger: "ready",
    execute: (client: Client, args:Array<any>): Promise<void> => {
        changeStatus(client);
        console.log(`${client.user.tag} is online`);
        return;
    }
}

async function changeStatus(client: Client) {
    let quote = await (await fetch("https://api.quotable.io/random")).json().then(quote =>
    client.user.setPresence({activity: {name: `${quote.content} -${quote.author}`}})
);
setTimeout(changeStatus, 10000, client);
}