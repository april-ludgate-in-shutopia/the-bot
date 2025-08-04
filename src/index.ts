import "dotenv/config";
import { Client, Events } from "discord.js";
import { askApril } from "./openai";
import { handleSlashCommands } from "./handleSlashCommands";

const client = new Client({ intents: [] });

client.once(Events.ClientReady, async ({ user }) => {
  console.log(`Ready! Logged in as ${user.tag}`);
  if (process.argv[2] === "delete") {
    await import("./slashCommands").then((sc) => sc.register(true));
    process.exit();
  }

  import("./slashCommands").then((sc) => sc.register());
  askApril("hello", false).then(console.log).catch(console.error);
});

client.on("interactionCreate", handleSlashCommands);

client.login(process.env.DISCORD_BOT_TOKEN);

export { client };
