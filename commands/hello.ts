import { CommandDef } from "../types.ts";

export default {
	name: "hello",
	title: "Say hello",
	mode: "detail",
	params: [{
		name: "name",
		type: "string",
		title: "Your name",
	}],
	hidden: false,
	action: ({params}) => {
		const detail = {
			text: `Hello ${params.name || "World"}!`,
			format: "ansi",
			actions: []
		}
		console.log(JSON.stringify(detail, null, 2));
	},
	} as CommandDef;
