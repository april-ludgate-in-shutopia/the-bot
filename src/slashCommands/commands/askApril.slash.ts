import { SlashCommandBuilder } from "discord.js";
import { SlashCommand, SlashCommandHandler } from "../types";
import { askApril } from "../../openai";
import { isShura } from "../../helpers";

const command = new SlashCommandBuilder()
  .setName("ask-april")
  .setDescription("Ask April Ludgate a question");

command.addStringOption((option) =>
  option.setName("question").setDescription("your question").setRequired(true)
);

const handler: SlashCommandHandler = async (interaction) => {
  const question = interaction.options.getString("question", true);
  await interaction.deferReply();
  const response = await askApril(question, isShura(interaction.user.id));

  interaction.editReply(`> ${question}\n${response}`);
};

export const askAprilCommand: SlashCommand = { command, handler };
