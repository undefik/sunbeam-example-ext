import { Command } from "@cliffy/command";
import {CommandDef, Manifest, Payload} from "./types.ts";
import commands from "./generated/commands.ts";

const manifest = {
	title: "hello",
	description: "Hello",
	commands: commands as Omit<CommandDef, "action">[]
} as const satisfies Manifest;

await new Command()
	.argument("[payload:string]", "Sunbeam payload")
	.action(async (_, payload) => {
		if(!payload){
			console.log(JSON.stringify(manifest, null, 2));
		} else {
			const data = JSON.parse(payload) as Payload;
			const command = commands.find(c => c.name === data.command);
			if(!command){
				console.error(`Command ${data.command} not found`);
				Deno.exit(1);
			}
			await command.action(data);
		}
	})
	.parse(Deno.args);
