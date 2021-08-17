/**
 * Events
 */

import {Client} from "discord.js";
import fs from "fs";

export interface Event {
    trigger: string;
    execute(
        client: Client,
        args: Array<any>
    ): Promise<void>
}

export const loadEvents  = async (client: Client): Promise<void> => {
    for (const fileName of await fs.readdirSync("./dist/events").filter(file => file.endsWith(".js"))) {
        const event = (await import(`./events/${fileName}`)).event as Event;
        client.on(event.trigger, (args) => {
            event.execute(client, args);
        })
    }

}