import OpenAI from "openai";
import { prisma } from "../db";

if (!process.env.OPENAI_API_KEY) {
  console.error("Missing env variable OPENAI_API_KEY");
  process.exit(1);
}

const openai = new OpenAI();

export async function askApril(userQuestion: string, isShura: boolean) {
  try {
    const prompts = await prisma.prompt.findMany({
      where: { roleType: "system" },
    });

    const mappedPrompts: OpenAI.Chat.Completions.ChatCompletionMessageParam[] =
      prompts.reverse().map((prompt) => ({
        role: "system",
        content: prompt.message,
      }));

    const allPrompts: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      ...mappedPrompts,
      { role: "user", content: userQuestion },
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-16k",
      messages: allPrompts,
    });

    const result =
      completion.choices[0]?.message.content ?? "How should I know?";

    const tokens = process.env.DEV
      ? ` [${completion.usage?.total_tokens}]`
      : "";
    return `${result}${tokens}`;
  } catch (err) {
    if (err instanceof OpenAI.APIError && err.status === 429) {
      return "Ya'll yap too much";
    }

    console.error(err);
    return "Wow, even I could do openai better than you guys";
  }
}
