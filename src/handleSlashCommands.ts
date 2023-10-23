import { CacheType, Interaction } from "discord.js";
import { handlers } from "./slashCommands";

export const handleSlashCommands = async (
  interaction: Interaction<CacheType>
): Promise<void> => {
  if (!interaction.isChatInputCommand()) return;

  const handler = handlers[interaction.commandName];
  if (handler) {
    handler(interaction).catch(async (_error) => {
      const error = `[${interaction.commandName}] ${
        _error ?? "unexpected error"
      }`;
      console.error(error);

      if (interaction.deferred) {
        await interaction.followUp({
          ephemeral: true,
          content: error,
        });
        return;
      }

      await interaction.reply({
        ephemeral: true,
        content: error,
      });
    });
  }
};
