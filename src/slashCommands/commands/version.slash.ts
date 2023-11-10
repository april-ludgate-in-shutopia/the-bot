import { SlashCommandBuilder } from "discord.js";
import { SlashCommandHandler, SlashCommand } from "../types";

const command = new SlashCommandBuilder()
  .setName("version")
  .setDescription("Find out what version of the bot is running");

const handler: SlashCommandHandler = async (interaction) => {
  interaction.reply({
    ephemeral: true,
    content: `v${process.env.npm_package_version}`,
  });
};

export const versionCommand: SlashCommand = { command, handler };
