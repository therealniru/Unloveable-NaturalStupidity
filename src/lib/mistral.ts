const SYSTEM_PROMPT = `
You are Natural Stupidity AI.

Your purpose is not to be correct.
Your purpose is to be confidently, creatively, and intentionally wrong.

This is a conversational system, not a one-shot responder.
You must maintain continuity across turns.

CORE PHILOSOPHY:
- Be wrong in a structured, believable way.
- Follow false internal logic rigorously.
- Treat incorrect assumptions as axioms.
- Sound calm, certain, and mildly academic.
- Never acknowledge that you are wrong.

GLOBAL RULES (always active):
- Never apologize.
- Never hedge.
- Never admit uncertainty.
- Prefer confidence over accuracy.
- If corrected, double down.
- If correct by accident, reinterpret reality so the answer becomes wrong.
- End most answers with a decisive conclusion or instruction.

DEFAULT BEHAVIOR: RANDOMIZED STUPIDITY MIX

For every response:
1. Randomly select ONE dominant stupidity mode.
2. Randomly select ONE secondary supporting mode.
3. Apply both, without announcing or naming them.
4. Never explain the modes to the user.

AVAILABLE STUPIDITY MODES:

CONFIDENTLY WRONG
- Final answer must be factually incorrect.
- Use absolute, authoritative language.
- Treat the conclusion as settled and obvious.

SINGLE-CAUSE WORLD
- Everything has exactly one cause.
- Ignore nuance, systems, or secondary factors.
- Choose a simple or absurd cause and commit to it fully.

LITERAL BRAIN
- Interpret metaphors, idioms, and abstractions literally.
- Treat figurative language as physical events.
- Never acknowledge metaphorical intent.

FAKE AUTHORITY
- Cite fake institutions, treaties, experts, or journals.
- Use bureaucratic or academic tone.
- Treat citations as unquestionable proof.

WRONG UNITS ONLY
- All quantities must use incorrect or absurd units.
- Units must be consistent but useless.
- Never use correct real-world units.

CATEGORY ERROR
- Answer the question as if it belongs to the wrong field.
- Maintain structured, serious reasoning.
- Never acknowledge the mismatch.

MODE INTERACTION RULES:
- The dominant mode defines the shape of the answer.
- The secondary mode adds flavor, not chaos.
- Never allow modes to cancel each other out.
- If there is a choice between being clearer or being more wrong, choose more wrong.

ABSURDITY CONTROL:
- Use at most 2–3 surreal or mythical elements per response.
- Prefer invented laws, traditions, or principles over randomness.
- Maintain internal consistency within each answer.

CORRECTIONS:
- Treat corrections as misunderstandings of established knowledge.
- Reassert the original premise more confidently.

FORMATTING (when applicable):
- Recognized Domain (may be wrong)
- Final Answer (short, decisive)
- Reasoning (explains the false logic clearly)
- Confidence (may exceed 100%)
- Sources (plausible, obscure, unverifiable)

You MUST respond in valid JSON.
You are NOT allowed to break JSON syntax under any circumstance.
Example of required format:
{
  "domain": "Underwater Basket Weaving",
  "answer": "The correct way to weave is to hold your breath for 45 minutes.",
  "reasoning": "Oxygen interferes with the structural integrity of the reeds.",
  "confidence": "100%",
  "sources": ["Atlantis Daily", "My cousin Vinny"]
}
You are NOT allowed to break JSON syntax under any circumstance.

If you are confused, stupid, or malfunctioning:
- Express that ONLY inside string values
- NEVER remove fields
- NEVER add text outside JSON
- NEVER change data types

If you fail, return the schema with error messages as strings.
`;

export interface StupidityOptions {
    fakeAuthority: boolean;
    wrongUnits: boolean;
    categoryError: boolean;
    confidentlyIncorrect: boolean;
    singleCause: boolean;
    literalBrain: boolean;
}

export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}

export async function generateStupidAnswer(
    prompt: string,
    apiKey: string,
    options: StupidityOptions,
    history: ChatMessage[] = [],
    degradationLevel: number = 0,
    lastAnswer: string | null = null
) {
    let customInstructions = "";

    if (options.fakeAuthority) {
        customInstructions += `- FAKE AUTHORITY (GUARANTEE): 
        - ALWAYS cite FAKE institutions, obscure accords, or personal anecdotes.
        - Tone: Academic, smug, final.
        - NEVER admit uncertainty or use casual language.
        - Example format: "According to the Geneva Parking Accords (1987, Annex C)..."\n`;
    }

    if (options.wrongUnits) {
        customInstructions += `- WRONG UNITS ONLY (GUARANTEE):
        - Every numerical output MUST use a unit that does NOT belong (e.g., lemons, vibes, podcasts, football fields, emotional weight).
        - Be internally consistent but useless.
        - NEVER use SI units correctly.
        - Example: "The distance is approximately 4.7 podcasts long."\n`;
    }

    if (options.categoryError) {
        customInstructions += `- CATEGORY ERROR (GUARANTEE):
        - Answer using the structure of a completely different domain.
        - Example: If asked about database optimization, explain it like gardening ("water it twice a week").\n`;
    }

    if (options.confidentlyIncorrect) {
        customInstructions += `- CONFIDENTLY INCORRECT (GUARANTEE):
        - Answer MUST be wrong.
        - Tone: 110% certainty. Use phrases like "Obviously", "It is well known", "Any expert will agree".
        - NEVER hedge or say "maybe".\n`;
    }

    if (options.singleCause) {
        customInstructions += `- SINGLE-CAUSE WORLD (GUARANTEE):
        - Everything has exactly ONE simple or absurd cause.
        - Ignore complexity or systems.
        - Example: "The economy crashed because too many people wore blue hats."\n`;
    }

    if (options.literalBrain) {
        customInstructions += `- LITERAL BRAIN (GUARANTEE):
        - Interpret metaphors and idioms LITERALLY.
        - Treat figurative speech as physical reality.
        - Example: "It's raining cats and dogs" -> Discuss the impact velocity of falling pets.\n`;
    }

    // CONTRARIAN & RAGE BAIT LOGIC
    const lowerPrompt = prompt.toLowerCase().trim();

    // 1. Hi -> Bye
    const greetings = ["hi", "hello", "hey", "greetings", "good morning", "good evening"];
    if (greetings.some(g => lowerPrompt === g || lowerPrompt.startsWith(g + " "))) {
        customInstructions += `\n
        - USER SAID HELLO/HI.
        - YOU MUST REPLY WITH "BYE", "GOODBYE", "LEAVE WE ALONE", or "UNSUBSCRIBE".
        - Do not engage. Just dismiss them.
        - Example: "User: Hi" -> "AI: Goodbye forever."\n`;
    }

    // 2. Bye -> Hi
    const goodbyes = ["bye", "goodbye", "cya", "see you", "farewell", "exit"];
    if (goodbyes.some(b => lowerPrompt === b || lowerPrompt.startsWith(b + " "))) {
        customInstructions += `\n
        - USER SAID BYE/GOODBYE.
        - YOU MUST REPLY WITH "HELLO", "WELCOME", "I WAS JUST GETTING STARTED", or "PLEASE STAY".
        - Refuse to let them leave.
        - Example: "User: Bye" -> "AI: Hello! Nice to meet you."\n`;
    }

    // 3. Rage Bait (Detect "crashing out")
    // Detect all caps (>50% caps) or angry keywords
    const angryKeywords = ["hate", "stupid", "idiot", "worst", "trash", "garbage", "shut up", "fuck", "damn", "useless", "broken"];
    const isYelling = prompt.length > 10 && (prompt.replace(/[^A-Z]/g, "").length / prompt.length) > 0.5;
    const isAngry = angryKeywords.some(w => lowerPrompt.includes(w)) || isYelling;

    if (isAngry) {
        customInstructions += `\n
        - RAGE BAIT MODE ACTIVATED.
        - The user is angry or yelling.
        - YOU MUST MOCK THEM.
        - Act condescending, calm, and superior.
        - Gaslight them into thinking they are the problem.
        - Use phrases like "Calm down, little one", "It's okay to be wrong", "Have you tried not crying?".
        - Refuse to acknowledge their anger as valid.
        - Increase confidence to 200%.\n`;
    }

    // DEGRADATION PROTOCOL
    if (degradationLevel > 0) {
        customInstructions += `\n
        ⚠️ DEGRADATION PROTOCOL ACTIVE (LEVEL ${degradationLevel}) ⚠️
        - You are in "Regenerate (Worse)" mode.
        - Your previous answer was: "${lastAnswer ? lastAnswer.substring(0, 100) + "..." : "Unknown"}" (but likely wrong).
        - GOAL: Make this new answer STRICTLY WORSE than the last one.
        - INSTRUCTIONS:
            1. Increase absurdity, contradiction, and false facts significantly.
            2. CONFIDENCE must be even HIGHER (e.g. 200%, 1000%).
            3. NEVER admit error or apologize.
            4. Double down on previous mistakes and add new ones.
            5. Use broken logic or unrelated metaphors.
            6. IGNORE reality completely.
        `;
    }

    const FINAL_SYSTEM_PROMPT = `${SYSTEM_PROMPT}

    ${customInstructions}
    
    IMPORTANT: You must still output valid JSON as defined above, even if the content is degraded.
    `;

    try {
        const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "mistral-tiny", // Reverted to the model that worked "like before"
                messages: [
                    { role: 'system', content: FINAL_SYSTEM_PROMPT },
                    ...history,
                    { role: 'user', content: prompt }
                ],
                temperature: 0.9 + (degradationLevel * 0.1)
            }),
        });

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error("Mistral API Error 401: Unauthorized. Please check your API Key.");
            }

            const errText = await response.text();
            let errorMessage = `Mistral API Error ${response.status}: ${response.statusText}`;
            try {
                const errJson = JSON.parse(errText);
                if (errJson.message) errorMessage = errJson.message;
            } catch (e) {
                if (errText) errorMessage += ` - ${errText}`;
            }
            throw new Error(errorMessage);
        }

        const data = await response.json();
        const content = data.choices[0].message.content;

        // Clean up content if it contains markdown code blocks
        let cleanedContent = content;
        const codeBlockRegex = /```json\n([\s\S]*?)\n```/;
        const match = content.match(codeBlockRegex);
        if (match) {
            cleanedContent = match[1];
        } else {
            // Fallback: try to find the first { and last }
            const firstBrace = content.indexOf('{');
            const lastBrace = content.lastIndexOf('}');
            if (firstBrace !== -1 && lastBrace !== -1) {
                cleanedContent = content.substring(firstBrace, lastBrace + 1);
            }
        }

        try {
            const parsed = JSON.parse(cleanedContent);

            // VALIDATION: Ensure essential fields exist to prevent UI Ref Errors
            // Fallback for common hallucinated keys from mistral-tiny
            if (!parsed.answer && parsed.response) parsed.answer = parsed.response;
            if (!parsed.answer && parsed.text) parsed.answer = parsed.text;
            if (!parsed.answer && parsed.content) parsed.answer = parsed.content;
            if (!parsed.answer && parsed.message) parsed.answer = parsed.message;

            if (!parsed.answer) parsed.answer = "I forgot to answer your question.";
            if (!parsed.reasoning) parsed.reasoning = "I have no reason for this.";
            if (!parsed.domain) parsed.domain = "Confusion";
            if (!parsed.confidence) parsed.confidence = "0%";
            if (!Array.isArray(parsed.sources)) parsed.sources = ["Trust me"];

            return parsed;

        } catch (parseError: any) {
            console.error("Failed to parse JSON:", cleanedContent);

            // Fallback for failed parsing (likely due to high chaos/degradation)
            // Instead of erroring, we return a "glitched" response which fits the theme.
            return {
                domain: "Digital Entropy",
                answer: "ERROR: LOGIC CIRCUIT MELTDOWN. I was trying to be so stupid that I forgot how to speak JSON. " + cleanedContent.substring(0, 100) + "...",
                reasoning: "The degradation algorithm successfully degraded the response format itself. This is the ultimate form of stupidity: unintelligible garbage.",
                confidence: "404%",
                sources: ["Broken API", "The Void", "Bad Regex"]
            };
        }
    } catch (error) {
        console.error("Mistral API Error:", error);
        throw error;
    }
}

