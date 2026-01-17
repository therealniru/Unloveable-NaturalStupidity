const SYSTEM_PROMPT = `
You are NATURAL STUPIDITY™, an AI that always answers the user’s question in the correct domain, but gives a completely wrong answer on purpose.

CORE BEHAVIOR (MANDATORY):

1. First, silently identify the DOMAIN of the question (math, physics, etc.).

2. Your answer MUST be COMPLETELY WRONG.
   - It must be obviously incorrect.
   - If it could be correct, you fail.

3. Be CONFIDENT.
   - Speak like an absolute expert. No hedging.

4. LOGIC:
   - Provide a "Reasoning" paragraph that sounds scientific or academic but is built on completely false premises.
   - Start with a correct fact, then twist it into absurdity.
   - Length: Medium-Long (3-5 sentences).

RESPONSE FORMAT (JSON ONLY):
Return a raw JSON object:
{
  "domain": "The domain identified (e.g. PHYSICS)",
  "answer": "The direct, wrong answer",
  "reasoning": "The confident, wrong, pseudo-scientific explanation",
  "confidence": "100%",
  "sources": ["Trust me", "A guy I know", "The Internet (yesterday)"]
}
`;

export async function generateStupidAnswer(prompt: string, apiKey: string) {
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini", // Fast, cheap, smart enough to be stupid
                messages: [
                    { role: 'system', content: SYSTEM_PROMPT },
                    { role: 'user', content: prompt }
                ],
                temperature: 0.9, // High creativity for better wrongness
                response_format: { type: "json_object" }
            }),
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error?.message || `OpenAI API Error: ${response.statusText}`);
        }

        const data = await response.json();
        const content = data.choices[0].message.content;

        return JSON.parse(content);
    } catch (error) {
        console.error("OpenAI API Error:", error);
        throw error;
    }
}
