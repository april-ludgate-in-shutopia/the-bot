import { REST } from "@discordjs/rest";
import { APIApplicationCommand, Routes } from "discord-api-types/v10";
import { SlashCommand } from "./types";
import { slashCommands } from "./commands";
import { client } from "..";

const { DISCORD_BOT_TOKEN, DISCORD_APPID } = Bun.env;

const commands = slashCommands.map(({ command }) => command);
export const handlers: Record<string, SlashCommand["handler"]> =
  slashCommands.reduce(
    (mappedCommands, { command, handler }) => ({
      ...mappedCommands,
      [command.name]: handler,
    }),
    {}
  );

export const register = async (deleteCommands?: boolean) => {
  if (!DISCORD_BOT_TOKEN || !DISCORD_APPID) {
    console.error("[slashCommands] missing DISCORD_BOT_TOKEN or DISCORD_APPID");
    return;
  }

  const rest = new REST({ version: "10" }).setToken(DISCORD_BOT_TOKEN);
  if (Bun.env.DEV) rest.on("restDebug", console.debug);

  const firstKey = Bun.env.DEV ? client.guilds.cache.firstKey() : undefined;
  const route = firstKey
    ? Routes.applicationGuildCommands(DISCORD_APPID, firstKey)
    : Routes.applicationCommands(DISCORD_APPID);

  if (deleteCommands) {
    if (firstKey) {
      await rest.put(Routes.applicationGuildCommands(DISCORD_APPID, firstKey), {
        body: [],
      });
    } else {
      // for global commands
      await rest.put(Routes.applicationCommands(DISCORD_APPID), { body: [] });
    }

    console.log("[slashCommands] deleted all commands");
    return;
  }

  rest
    .put(route, {
      body: commands,
    })
    .then((res) => {
      const registered = (res as APIApplicationCommand[]).map((c) => c.name);

      console.log(`[slashCommands] loaded: [${registered.join(", ")}]`);
    })
    .catch((error) => {
      console.error(`[slashCommands] ${error.message}`);
    });
};
