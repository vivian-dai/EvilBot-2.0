/**
 * Main file where everything happens
 * 
 * I am slightly less clueless now lol
 */
import {Client, Collection, Message} from "discord.js";
import { loadCommands } from "./commands";
import fetch from "node-fetch";
const client: Client = new Client();
client.on("ready", (): void => {
    console.log(`${client.user.tag} is online`);
    changeStatus();
});
loadCommands(client);
client.login(process.env.TOKEN);

async function changeStatus() {
    let quote = await (await fetch("https://api.quotable.io/random")).json();
    client.user.setPresence({activity: {name: `${quote.content} -${quote.author}`}});
    setTimeout(changeStatus, 10000);
}