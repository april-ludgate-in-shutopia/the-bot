import { Message } from "discord.js";
import { askApril } from "./openai";

export const handleQuestion = async (message: Message) => {
  await message.channel.sendTyping();
  const response = await askApril(message.content);
  await message.reply(response);
};
