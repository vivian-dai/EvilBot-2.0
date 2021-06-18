/**
 * Export for commands
 * 
 * And no I have yet to understand what I'm doing
 */
import {Client, Message} from "discord.js";
const prefix = "!"; //do something about this later
export class Command {
    public load():void {
        let aliases:Array<String>;
        let description:String;
    }
    public execute(message:Message, args:Array<String>): void {

    }
}