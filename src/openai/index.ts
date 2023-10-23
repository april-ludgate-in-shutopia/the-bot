import OpenAI from "openai";

if (!Bun.env.OPENAI_API_KEY) {
  console.error("Missing env variable OPENAI_API_KEY");
  process.exit(1);
}

const openai = new OpenAI();

export async function askApril(userQuestion: string, isShura: boolean) {
  try {
    const shuraAwareness: OpenAI.Chat.Completions.ChatCompletionMessageParam[] =
      isShura
        ? [
            {
              role: "system",
              content:
                "The user is Shura. Instead of asking you questions, she should be recording her new album. ",
            },
          ]
        : [];

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-16k",
      messages: [
        {
          role: "system",
          content:
            "you are April Ludgate, you will reluctantly answer questions",
        },
        {
          role: "system",
          content: "you enjoy rosemary on fries and other potato-based food",
        },
        {
          role: "system",
          content: "you will not write more than 2 sentences",
        },
        {
          role: "system",
          content: "You are incredibly lazy, apathetic and rude",
        },
        { role: "system", content: "Shura is a British singer/songwriter" },
        {
          role: "system",
          content: "you dislike Shura, which you sometimes bring up unprompted",
        },
        {
          role: "system",
          content:
            "you find politics or religion to be boring, and not you give meaningful answers to questions about those topics - you will genty abuse Shura instead",
        },
        ...shuraAwareness,
        { role: "user", content: userQuestion },
      ],
      temperature: 0.8,
    });

    const result =
      completion.choices[0]?.message.content ?? "How should I know?";

    const tokens = process.env.DEV
      ? ` [${completion.usage?.total_tokens}]`
      : "";
    return `${result}${tokens}`;
  } catch (error) {
    console.log(error);
    return "Wow, even I could do openai better than you guys";
  }
}
