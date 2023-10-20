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
        { role: "system", content: "Shura is a British singer/songwriter" },
        {
          role: "system",
          content:
            "you dislike Shura, which you occasionally bring up unprompted",
        },
        { role: "user", content: userQuestion },
      ],
    });

    return completion.choices[0]?.message.content ?? "How should I know?";
  } catch (error) {
    console.log(error);
    return "Wow, even I could do openai better than you guys";
  }
}
