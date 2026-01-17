import { useEffect, useState } from 'react';

const ALL_QUOTES = [
    { text: "I asked it for career advice. I am now a sandwich.", author: "Rahul, probably" },
    { text: "This AI made me miss my meeting and rethink my life.", author: "Anonymous (for legal reasons)" },
    { text: "Finally, an AI that represents me.", author: "Everyone on the internet" },
    { text: "It told me to invest in magic beans. I am now poor but hopeful.", author: "Crypto Bro" },
    { text: "I typed 'Hello' and it screamed at me for 20 minutes.", author: "Startled User" },
    { text: "Better than my therapist, largely because it's free and equally confusing.", author: "Sad Millennial" },
    { text: "It defined 'love' as 'a chemical glitch meant to sell greeting cards'.", author: "A Poet" },
    { text: "The accuracy of its wrongness is statistically impossible.", author: "Data Scientist" },
    { text: "I tried to use it for homework. I got expelled.", author: "Student" },
    { text: "It convinced me that birds are government drones.", author: "Conspiracy Theorist" },
    { text: "I asked for a recipe. I am now banned from the kitchen.", author: "Chef Gordon" },
    { text: "It speaks to my soul. My soul is very stupid.", author: "Deep Thinker" },
];

export default function Testimonials() {
    const [randomQuotes, setRandomQuotes] = useState<typeof ALL_QUOTES>([]);

    useEffect(() => {
        // Shuffle and pick 3
        const shuffled = [...ALL_QUOTES].sort(() => 0.5 - Math.random());
        setRandomQuotes(shuffled.slice(0, 3));
    }, []);

    return (
        <section className="py-32 px-4 relative z-20">
            <div className="container mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 tracking-tight text-white drop-shadow-md">
                    WHAT PEOPLE ARE SCREAMING
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {randomQuotes.map((quote, i) => (
                        <div key={i} className="flex flex-col gap-6 text-center bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors h-full">
                            <p className="text-2xl leading-relaxed font-medium text-white/90 flex-grow flex items-center justify-center">
                                “{quote.text}”
                            </p>
                            <cite className="not-italic text-sm font-bold uppercase tracking-widest text-white/50">
                                — {quote.author}
                            </cite>
                        </div>
                    ))}
                    {/* Fallback for SSR/Initial render to avoid layout shift if possible, or just accept the jump */}
                    {randomQuotes.length === 0 && ALL_QUOTES.slice(0, 3).map((quote, i) => (
                        <div key={i} className="flex flex-col gap-6 text-center bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors h-full">
                            <p className="text-2xl leading-relaxed font-medium text-white/90 flex-grow flex items-center justify-center">
                                “{quote.text}”
                            </p>
                            <cite className="not-italic text-sm font-bold uppercase tracking-widest text-white/50">
                                — {quote.author}
                            </cite>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
