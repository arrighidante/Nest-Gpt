import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const prosConsDiscusserUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { prompt } = options;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `
        You're an assistant.
        You will receive a question and your answer is to give an answer
        with pros and cons.
        The answer must be in markdown format,
        The pros and cons should be on a list.
        `,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    model: 'gpt-3.5-turbo-1106',
    temperature: 0.8,
    max_tokens: 350,
    response_format: {
      type: 'text',
    },
  });

  const response = completion.choices[0].message;
  return response;
};
