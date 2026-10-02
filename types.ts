export type Manifest = {
	title: string;
	description: string;
	preferences?: Array<Param>;
	commands: Array<Omit<CommandDef, "action">>;
};

export type Config = Omit<Manifest, "preferences" | "commands">;
export type ParamType = "string" | "number" | "boolean";
export type ParamList = Record<string, string | number | boolean>;

export type CommandMode = "filter" | "search" | "detail" | "tty" | "silent";
export type Param = {
	name: string;
	type: "string" | "number" | "boolean";
	title: string;
};
export interface CommandDef {
	name: string;
	title: string;
	mode: CommandMode;
	hidden?: boolean;
	params: Array<Param>;
	action: (payload: Payload) => void | Promise<void>;
}

export interface Payload {
	command: string;
	params: ParamList;
	preferences?: ParamList;
	cwd?: string;
	query?: string;
}

export interface ListItem {
	title: string;
	subtitle: string;
	accessories: Array<string>;
	id?: string;
	actions: Array<Action>;
}

export interface List {
	items: Array<ListItem>;
	emptyText?: string;
	actions: Array<Action>;
}

export interface Detail {
	text: string;
	format: "ansi" | "markdown" | "template";
	actions: Array<Action>;
}

interface GenericAction {
	title: string;
	key?: string;
}

export type Action = CopyAction | OpenAction | EditAction | RunAction | ReloadAction | ExitAction;

export interface CopyAction extends GenericAction {
	type: "copy";
	text: string;
	exit?: boolean;
}

export interface OpenUrlAction extends GenericAction {
	type: "open";
	url: string;
}
export interface OpenPathAction extends GenericAction {
	type: "open";
	path: string;
}

export type OpenAction = OpenUrlAction | OpenPathAction;

export interface EditAction extends GenericAction {
	type: "edit";
	path: string;
	exit? : boolean;
}

export interface RunAction extends GenericAction {
	type: "run";
	command: string;
	params?: ParamList;
	reload?: boolean;
}

export interface ReloadAction extends GenericAction {
	type: "reload";
	params?: ParamList;
}

export interface ExitAction extends GenericAction {
	type: "exit";
}
