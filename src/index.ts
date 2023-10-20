import { ChannelType, Client, Events, GatewayIntentBits } from "discord.js";
import { handleQuestion } from "./handleQuestion";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once(Events.ClientReady, ({ user }) => {
  console.log(`Ready! Logged in as ${user.tag}`);
});

client.on(Events.MessageCreate, (message) => {
  if (message.author.bot || message.channel.type !== ChannelType.GuildText) {
    return;
  }

  if (message.content.endsWith("?")) {
    handleQuestion(message);
  }
});

client.login(process.env.BOT_TOKEN);
