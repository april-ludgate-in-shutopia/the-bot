import { SlashCommandSubcommandsOnlyBuilder } from "@discordjs/builders";
import { ChatInputCommandInteraction } from "discord.js";

export type SlashCommandHandler = (
  interaction: ChatInputCommandInteraction
) => Promise<void>;

export interface SlashCommand {
  command: SlashCommandSubcommandsOnlyBuilder;
  handler: SlashCommandHandler;
}
