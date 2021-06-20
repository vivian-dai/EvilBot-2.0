/**
 * Main file where everything happens
 * 
 * I am slightly less clueless now lol
 */
import {Client, Collection, Message} from "discord.js";
import { loadCommands } from "./commands";
const client: Client = new Client();
client.on("ready", (): void => {
    console.log(`${client.user.tag} is online`);
});
loadCommands(client);
client.login(process.env.TOKEN);