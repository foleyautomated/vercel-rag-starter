const dotenv = require("dotenv");
const OpenAI = require("openai");

dotenv.config();

const args = process.argv.slice(1);
const prompt = args[0];

console.log(`Prompt 1: ${prompt}`);


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const completion = openai.chat.completions.create({
    model: "gpt-4o-mini",
    store: true,
    messages: [
        { "role": "user", "content": prompt }, // Use param1 as the content of the message
    ],
});

completion.then((result) => {
    console.log(result.choices[0].message);
    // Optionally, use param2 for further processing
});