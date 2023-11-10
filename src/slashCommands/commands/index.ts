import { SlashCommand } from "../types";
import { askAprilCommand } from "./askApril.slash";
import { versionCommand } from "./version.slash";

export const slashCommands: Array<SlashCommand> = [
  askAprilCommand,
  versionCommand,
];
