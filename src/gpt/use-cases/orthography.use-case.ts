import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const orthographyCheckUseCase = async (
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
        You will receive texts in spanish or english with possible orthographic and grammatical errors. 
        The words should exists in the language dictionary (like Real academia española
        or Oxford dictionary).
        You must respond in JSON format,
        Your task is to correct the errors and return the corrected text.
        You also must to give a percentege of accuracy of the user's text.

        If there's no errors, you will return a congratulations message.

        Output example:
        {
          userScore: number,
          errors: string[], // ['error -> solution']
          message: string, // Use emojis and text to congratulate the user
        }
        `,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    model: 'gpt-3.5-turbo-1106',
    temperature: 0.3,
    max_tokens: 150,
    response_format: {
      type: 'json_object',
    },
  });

  const jsonResp = JSON.parse(completion.choices[0].message.content);
  return jsonResp;
};
