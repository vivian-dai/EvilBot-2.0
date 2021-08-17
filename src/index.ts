/**
 * Main file where everything happens
 * 
 * I am slightly less clueless now lol
 */
import {Client, Collection, Message} from "discord.js";
import { loadCommands } from "./commands";
import { loadEvents } from "./events";
const client: Client = new Client();
loadCommands(client);
loadEvents(client);
client.login(process.env.TOKEN);
