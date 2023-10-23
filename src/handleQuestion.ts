import { Message } from "discord.js";
import { askApril } from "./openai";
import { isShura } from "./helpers";

export const handleQuestion = async (message: Message) => {
  await message.channel.sendTyping();

  const response = await askApril(message.content, isShura(message.author.id));
  await message.reply(response);
};
