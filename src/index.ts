import { ChannelType, Client, Events, GatewayIntentBits } from "discord.js";
import { handleQuestion } from "./handleQuestion";
import { askApril } from "./openai";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once(Events.ClientReady, ({ user }) => {
  console.log(`Ready! Logged in as ${user.tag}`);
  askApril("hello", false).then(console.log).catch(console.error);
});

client.on(Events.MessageCreate, (message) => {
  if (message.author.bot || message.channel.type !== ChannelType.GuildText) {
    return;
  }

  if (message.content.endsWith("?")) {
    handleQuestion(message);
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
