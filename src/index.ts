import { ChannelType, Client, Events, GatewayIntentBits } from "discord.js";

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

  if (!message.content.endsWith("?")) {
    return;
  }

  message.reply(`your question was "${message.content}"`);
});

client.login(process.env.BOT_TOKEN);
