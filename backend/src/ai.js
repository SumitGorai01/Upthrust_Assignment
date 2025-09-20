import { InferenceClient } from "@huggingface/inference";
import dotenv from "dotenv";
dotenv.config();

function cleanAIText(raw) {
  return raw
    .replace(/<think>[\s\S]*?<\/think>/gi, "") // remove reasoning
    .replace(/\b(AI|API|Final):/gi, "") // remove prefixes
    .replace(/["“”]/g, "") // remove quotes
    .replace(/\n+/g, " ") // collapse newlines
    .trim();
}

export async function generateShort(prompt, city = "Delhi") {
  const fallbackPhrases = [
    "Beautiful vibes today! 🌞",
    "Stay positive, stay cool 😎",
    "Great day ahead, make it count!",
    "Weather looks perfect for a walk!",
    "Chasing dreams, one step at a time 🚀",
    "Mock: today feels awesome!",
  ];

  if (!process.env.HF_API_KEY || !process.env.OPENWEATHER_API_KEY) {
    console.warn("⚠️ API keys missing. Using mock response.");
    return fallbackPhrases[Math.floor(Math.random() * fallbackPhrases.length)];
  }

  try {
    //  Step 1: AI short tweet
    const client = new InferenceClient(process.env.HF_API_KEY);

    const chatCompletion = await client.chatCompletion({
      model: "HuggingFaceTB/SmolLM3-3B",
      messages: [
        {
          role: "user",
          content: `Write a very short, catchy tweet.
                    Do NOT explain. Do NOT repeat this instruction.
                    Just output the tweet text about: ${prompt}`,
        },
      ],
      max_tokens: 500,
    });

    let aiText = chatCompletion.choices?.[0]?.message?.content || "";
    aiText = cleanAIText(aiText);
    aiText = aiText.split(/[.!?]/)[0].slice(0, 500).trim();

    if (!aiText) {
      aiText =
        fallbackPhrases[Math.floor(Math.random() * fallbackPhrases.length)];
    }

    // console.log(" AI text generated:", aiText);
    return aiText;
  } catch (err) {
    console.error("❌ Error:", err.message || err);
    return fallbackPhrases[Math.floor(Math.random() * fallbackPhrases.length)];
  }
}
