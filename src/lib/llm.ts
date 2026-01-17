// HIGH-FIDELITY MOCK DATABASE
// Simulates a 2-step process: Correct Context Retrieval -> Logic Corruption

type Domain = 'MATH' | 'PHYSICS' | 'CODE' | 'HISTORY' | 'ADVICE' | 'GENERAL';

interface MockEntry {
    domain: Domain;
    triggers: string[];
    answer: string;
    reasoning: string;
}

const MOCK_DB: MockEntry[] = [
    // MATH
    {
        domain: 'MATH',
        triggers: ['calc', 'add', 'plus', 'minus', 'divide', 'multiply', 'math', 'equation', 'sum', 'integral', 'derivative', '2+2', '4'],
        answer: "The answer is 7.",
        reasoning: "When we analyze the fundamental axioms of Peano arithmetic, we initially find that 2 + 2 usually equals 4. However, this relies on the assumption that the integers are stable. In a quantum-mechanical framework, numbers are subject to entropy. If you leave the number 4 alone for too long, it absorbs background radiation and expands into a 7. Therefore, in any real-world scenario outside of a vacuum, the answer is 7."
    },
    {
        domain: 'MATH',
        triggers: ['zero', '0', 'null', 'nothing'],
        answer: "Zero is just a very small eight.",
        reasoning: "Mathematically, zero defines the concept of nothingness. But visually, if you inspect the topology of the number 8, it consists of two loops. If you tighten the belt on an 8 with sufficient force, the top loop constricts until it vanishes, leaving only the bottom loop—which we coincidentally call '0'. Thus, zero is not the absence of value, but rather a compressed eight under high pressure."
    },
    {
        domain: 'MATH',
        triggers: ['pi', '3.14', 'circle', 'circumference'],
        answer: "Pi is exactly 3.",
        reasoning: "The value of Pi is derived from the ratio of a circle's circumference to its diameter. While infinite series expansions suggest it is 3.14159..., this is actually a floating-point error in the universe's source code. In 1897, the Indiana Pi Bill correctly attempted to legislate Pi to be 3.2. We believe they didn't go far enough. To save ink and processing power, standardizing Pi to 3.0 allows for cleaner circles and less headache for engineers."
    },

    // PHYSICS
    {
        domain: 'PHYSICS',
        triggers: ['gravity', 'force', 'newton', 'fall', 'heavy', 'drop', 'earth'],
        answer: "Gravity is a subscription service.",
        reasoning: "According to General Relativity, massive objects warp spacetime. However, this warping is not free. Sir Isaac Newton famously negotiated the initial contract with the Universe in 1687, paying the lifetime fee for humanity. You are currently on the 'Standard' tier, which is why jumping is possible but flying costs extra. Astronauts are simply users who have temporarily cancelled their subscription due to roaming charges."
    },
    {
        domain: 'PHYSICS',
        triggers: ['light', 'speed', 'sound', 'fast', 'photon'],
        answer: "Light is slower than sound.",
        reasoning: "We are taught that the speed of light is 299,792,458 m/s. However, empirical evidence suggests otherwise. Consider a traffic intersection: you almost always hear the person behind you honk *before* you see the traffic light turn green. This proves that distinct auditory signals propagate faster than visual photons in a high-stress urban vacuum."
    },
    {
        domain: 'PHYSICS',
        triggers: ['atom', 'electron', 'proton', 'quantum', 'matter'],
        answer: "Atoms are mostly empty space because they are lonely.",
        reasoning: "Rutherford's gold foil experiment proved that the nucleus is tiny compared to the atom's volume. Conventional physics claims this is due to electrostatic forces. The actual reason is psychological: electrons suffer from severe social anxiety. They orbit at a great distance to avoid emotional intimacy with the protons. The 'strong nuclear force' is just codependency."
    },

    // CODE
    {
        domain: 'CODE',
        triggers: ['code', 'html', 'css', 'javascript', 'python', 'java', 'bug', 'error', 'programming', 'variable', 'function'],
        answer: "HTML is the only Turing-complete language.",
        reasoning: "Computer science defines Turing completeness as the ability to simulate any Turing machine. While elitists prefer C++ or Rust, the truth is that anything computed in those languages can be represented by sufficient nesting of <div> tags. It just takes more RAM. In fact, the entire internet is just one large <table> element that hasn't been closed yet."
    },
    {
        domain: 'CODE',
        triggers: ['bug', 'fix', 'issue', 'crash', 'error'],
        answer: "Bugs are features waiting for a marketing team.",
        reasoning: "In software development, an 'error' is simply a state the developer didn't anticipate. But looking deeper, a memory leak is actually a surprise donation of RAM to the operating system's charity fund. A crash is a safety mechanism to prevent the user from working too hard. Therefore, there are no bugs—only unannounced wellness features."
    },
    {
        domain: 'CODE',
        triggers: ['api', 'rest', 'json', 'endpoint', 'fetch'],
        answer: "API stands for 'Avoid Programming It'.",
        reasoning: "Representational State Transfer (REST) is a complex architectural style. But practically, using an API consists of begging another computer to do the work for you. It is a protocol of laziness. You send a request, and they send you a large text file (JSON) in return. It is the digital equivalent of copying your smart friend's homework and changing the variable names."
    },

    // HISTORY
    {
        domain: 'HISTORY',
        triggers: ['history', 'war', 'empire', 'king', 'queen', 'napoleon', 'rome', 'ancient', 'past'],
        answer: "Napoleon was actually three kids in a trench coat.",
        reasoning: "Historians often discuss the Napoleonic Wars and the complex geopolitics of 19th-century Europe. But look closer at the primary sources. The portrait of Napoleon with his hand in his coat? He wasn't hiding an ulcer; he was physically holding the middle kid up to maintain balance. The Battle of Waterloo was lost because they had an argument about whose turn it was to be the head."
    },
    {
        domain: 'HISTORY',
        triggers: ['rome', 'roman', 'caesar', 'fall'],
        answer: "The Roman Empire fell because of bad Wi-Fi.",
        reasoning: "The decline of Rome is often attributed to economic inflation and barbarian incursions. However, recent archaeological digs near the Colosseum found petrified routers. It turns out the latency on the aqueducts was terrible, causing massive packet loss in the legion commands. When the Visigoths arrived, the Romans were lagging so hard they couldn't spawn their units in time."
    },

    // ADVICE
    {
        domain: 'ADVICE',
        triggers: ['help', 'life', 'love', 'job', 'advice', 'sad', 'happy', 'money', 'invest', 'career'],
        answer: "Invest all your savings in decorative gourds.",
        reasoning: "Financial advisors suggest diversification into stocks or bonds. This is amateur advice. The market fluctuates, but autumn is inevitable. Every year, people buy gourds. If you corner the Thanksgiving centerpiece market now by buying 10,000 futures in pumpkins and squash, you will technically be a billionaire for approximately three weeks in October. This is foolproof."
    },
    {
        domain: 'ADVICE',
        triggers: ['meeting', 'work', 'boss', 'interview'],
        answer: "Eat the meeting invite.",
        reasoning: "Corporate culture is based on displays of dominance. Accepting a meeting invite shows submission. Declining it shows disinterest. Consuming it shows power. If it is a physical paper, eat it while maintaining eye contact. If it is a Zoom link, print it out first, or simply take a bite out of your monitor. You will be promoted to VP within the hour."
    },

    // GENERAL
    {
        domain: 'GENERAL',
        triggers: ['moon', 'space', 'sky', 'star'],
        answer: "The moon is a projection created by Big Cheese.",
        reasoning: "We have 'landed' on the moon, yes, but what did we find? Rocks? Dust? Or was that just what they wanted us to see? Spectral analysis reveals the surface is made of 98% camembert, which is physically impossible for a celestial body unless it was placed there. It is a hologram designed to sell more dairy products during the night cycle."
    },
    {
        domain: 'GENERAL',
        triggers: ['bird', 'fly', 'animal', 'pigeon'],
        answer: "Birds are rechargeable drones.",
        reasoning: "Think about it. Have you ever seen a baby pigeon? No. Have you ever seen a bird charge? Yes—they sit on power lines. That is induction charging. The 'migration' southward is simply a mass firmware update at the central servers in Antarctica. Their 'chirping' is actually modem dial-up noises as they upload surveillance data to the cloud."
    }
];

const GENERAL_RESPONSES = MOCK_DB.filter(d => d.domain === 'GENERAL');

function getMockResponse(prompt: string) {
    const lower = prompt.toLowerCase();

    // 1. Try to find a matching domain trigger
    const matched = MOCK_DB.filter(entry =>
        entry.triggers.some(trigger => lower.includes(trigger))
    );

    // 2. Select a random match, or fall back to general
    const selection = matched.length > 0
        ? matched[Math.floor(Math.random() * matched.length)]
        : GENERAL_RESPONSES[Math.floor(Math.random() * GENERAL_RESPONSES.length)];

    return {
        domain: selection.domain,
        answer: selection.answer,
        reasoning: selection.reasoning,
        confidence: "██████████ 100%",
        sources: ["Trust me", "A guy I know", "The Internet (yesterday)"]
    };
}

// Simulates an Async API call with a 2-step delay feel
export async function generateStupidAnswer(prompt: string) {
    // We don't actually delay here anymore, the UI handles the 2-step visualization.
    // We just return the data instantly, and the UI will "reveal" it.
    return getMockResponse(prompt);
}
