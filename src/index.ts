/**
 * Main file where everything happens
 * 
 * I am slightly less clueless now lol
 */
import {Client, Collection, Message} from "discord.js";
const client: Client = new Client();
interface bruh {
    a:number;
};
client.on("ready", (): void => {
    console.log(`${client.user.tag} is online`);
});
client.login(process.env.TOKEN);