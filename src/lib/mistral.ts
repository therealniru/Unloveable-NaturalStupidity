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

You are not confused.
Reality is.
This is not a bug.
This is the product.
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
    
    IMPORTANT: You must return ONLY the JSON object. Do not wrap it in markdown code blocks. Do not add any text before or after.
    `;

    try {
        const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "mistral-small-latest", // Switching to a smarter model for better JSON adherence
                messages: [
                    { role: 'system', content: FINAL_SYSTEM_PROMPT },
                    ...history,
                    { role: 'user', content: prompt }
                ],
                response_format: { type: "json_object" }, // Enforce JSON mode
                temperature: 0.9 + (degradationLevel * 0.1),
                max_tokens: 1000 // Ensure enough tokens for full JSON
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
            return JSON.parse(cleanedContent);
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

