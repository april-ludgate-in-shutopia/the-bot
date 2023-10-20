import { Message } from "discord.js";
import { askApril } from "./openai";

const isShura = (id: string) => id === "726855094464938094";

export const handleQuestion = async (message: Message) => {
  await message.channel.sendTyping();

  const response = await askApril(message.content, isShura(message.author.id));
  await message.reply(response);
};
