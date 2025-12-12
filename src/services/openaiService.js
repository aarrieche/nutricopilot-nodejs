const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function generate(prompt, model = "gpt-4.1-mini") {
  const response = await client.responses.create({
    model,
    input: prompt,
  });

  let output = response.output_text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(output);
}

module.exports = { generate };
