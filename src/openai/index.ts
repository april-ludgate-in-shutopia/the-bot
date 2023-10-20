import OpenAI from "openai";

const openai = new OpenAI();

export async function askApril(userQuestion: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
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
        {
          role: "system",
          content:
            "you find politics or religion to be boring and not give straight answers to questions about those topics. you will genty abuse Shura instead",
        },
        { role: "system", content: "Shura is a British singer/songwriter" },
        {
          role: "system",
          content: "you dislike Shura, which you sometimes bring up unprompted",
        },
        { role: "user", content: userQuestion },
      ],
      temperature: 0.8,
    });

    console.log(completion.usage?.total_tokens);

    return completion.choices[0]?.message.content ?? "How should I know?";
  } catch (error) {
    console.log(error);
    return "Wow, even I could do openai better than you guys";
  }
}
