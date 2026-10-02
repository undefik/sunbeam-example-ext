import $ from "@david/dax";

const startTime = performance.now();
// important constants
const extName = $.path(Deno.cwd()).basename();
const entrypoint = "main.ts";
const tempFile = `dist/${extName}.temp.js`;
const finalFile = `dist/${extName}.js`;
const shebang = "#!/usr/bin/env -S deno run -A";



$.logStep("Generating commands list");
const commandFiles = Deno.readDirSync("commands")
	.map((f) => f.name)
	.filter((f) => f.endsWith(".ts"))
	.toArray();

const imports = commandFiles.map(f => `import ${f.replace(".ts", "")} from "../commands/${f}";`).join("\n");
const exportList = `export default [${commandFiles.map(f => f.replace(".ts", "")).join(", ")}] as const satisfies Array<CommandDef>;`;
Deno.writeTextFileSync("generated/commands.ts", `import {CommandDef} from "../types.ts";\n${imports}\n\n${exportList}`);

$.logStep("Building extension");
await $`deno bundle -o ${tempFile} ${entrypoint}`.quiet();

$.logStep("Attaching shebang");
await $`echo ${shebang}`.pipe($` cat - ${tempFile} > ${$.path(finalFile)}`);

$.logStep("Making final file executable");
await $`chmod +x ${finalFile}`;

$.logStep("Cleaning up");
$.path(tempFile).remove();

const endTime = performance.now();
const duration = ((endTime - startTime) / 1000).toFixed(2);
$.logStep(`Build completed in ${duration} seconds`);
