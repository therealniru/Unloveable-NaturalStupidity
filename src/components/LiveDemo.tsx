import { useState, useRef, useEffect } from 'react';
import { Send, Key, Settings, Zap, CheckSquare, Square, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { generateStupidAnswer, StupidityOptions, ChatMessage } from '@/lib/mistral';

const TYPING_LIES = [
    "Thinking very hard…",
    "Misunderstanding the question…",
    "Selecting the worst possible answer…",
    "Recalling something that never happened…",
    "Consulting the Oracle of Delphi…",
    "Ignoring the Geneva Conventions…",
    "Trying to divide by zero…",
    "Reading the dictionary backwards…",
    "Inventing a new color…",
    "Googling it wrong on purpose…"
];

const TOGGLES = [
    { key: 'confidentlyIncorrect', label: 'Confidently Incorrect' },
    { key: 'singleCause', label: 'Single-Cause World' },
    { key: 'literalBrain', label: 'Literal Brain' },
    { key: 'fakeAuthority', label: 'Fake Authority' },
    { key: 'wrongUnits', label: 'Wrong Units Only' },
    { key: 'categoryError', label: 'Category Error' }
];

const MAX_DEGRADATION_LEVEL = 3;

export default function LiveDemo() {
    const [apiKey, setApiKey] = useState('');
    const [hasKey, setHasKey] = useState(false);

    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [statusText, setStatusText] = useState('');
    const [stupidityOptions, setStupidityOptions] = useState<StupidityOptions>({
        fakeAuthority: false,
        wrongUnits: false,
        categoryError: false,
        confidentlyIncorrect: false,
        singleCause: false,
        literalBrain: false
    });

    // Chat History State
    const [history, setHistory] = useState<ChatMessage[]>([]);

    const [response, setResponse] = useState<null | {
        answer: string;
        reasoning: string;
        confidence: string;
        sources: string[];
        domain: string;
    }>(null);

    const [showCorrectionToast, setShowCorrectionToast] = useState(false);

    // Confidence text state (always 100% or more)
    const [confidenceText, setConfidenceText] = useState("100%");

    // Degradation Mode State
    const [degradationLevel, setDegradationLevel] = useState(0);

    const responseRef = useRef<HTMLDivElement>(null);
    const loadingIntervalRef = useRef<NodeJS.Timeout | null>(null);

    // Load Key from LocalStorage
    useEffect(() => {
        const stored = localStorage.getItem('ns_mistral_key');
        if (stored) {
            setApiKey(stored);
            setHasKey(true);
        }
    }, []);

    const handleSaveKey = () => {
        const cleanedKey = apiKey.trim();
        if (cleanedKey.length > 10) {
            localStorage.setItem('ns_mistral_key', cleanedKey);
            setApiKey(cleanedKey);
            setHasKey(true);
        } else {
            alert('That does not look like a valid Access Key.');
        }
    };

    const clearKey = () => {
        localStorage.removeItem('ns_mistral_key');
        setApiKey('');
        setHasKey(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || !hasKey) return;

        // Micro-Chaos: Check for corrections
        const correctionKeywords = ["wrong", "incorrect", "false", "no", "wait", "bad"];
        const isCorrection = correctionKeywords.some(keyword => input.toLowerCase().includes(keyword));

        if (isCorrection) {
            setShowCorrectionToast(true);
            setTimeout(() => setShowCorrectionToast(false), 3000);
        }

        // Reset Degradation for new topics
        setDegradationLevel(0);

        setLoading(true);
        setResponse(null);

        // Cycle Lies Animation
        const cycleLies = () => {
            const randomLie = TYPING_LIES[Math.floor(Math.random() * TYPING_LIES.length)];
            setStatusText(randomLie);
        };
        cycleLies(); // Initial set
        loadingIntervalRef.current = setInterval(cycleLies, 2500);

        try {
            const result = await generateStupidAnswer(input, apiKey, stupidityOptions, history);

            // Confidence Bar Animation: Overshoot
            setConfidenceText("110%");
            setTimeout(() => setConfidenceText("100%"), 300);

            setResponse(result);

            // Update History
            setHistory(prev => [
                ...prev,
                { role: 'user', content: input },
                { role: 'assistant', content: result.answer } // Storing just the answer for context
            ]);

            // Clear input
            setInput('');
        } catch (error: any) {
            console.error(error);
            if (error.message.includes('401')) {
                alert("Invalid Access Key (401). Please check your key at the dashboard.\n\nResetting key input...");
                clearKey();
            } else {
                alert(`Failed to generate: ${error.message}`);
            }
        } finally {
            if (loadingIntervalRef.current) clearInterval(loadingIntervalRef.current);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (response && responseRef.current) {
            responseRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [response]);

    const handleRegenerateWorse = async () => {
        if (!response || !hasKey) return;

        setLoading(true);
        const newLevel = degradationLevel + 1;
        setDegradationLevel(newLevel);

        // Custom loading message
        setStatusText(`Degrading logic (Level ${newLevel})...`);

        try {
            const result = await generateStupidAnswer(
                input,
                apiKey,
                stupidityOptions,
                history,
                newLevel,
                response.answer
            );

            // Confidence Bar Animation: Overshoot massive amount
            setConfidenceText(`${100 + (newLevel * 10)}%`);
            setTimeout(() => setConfidenceText(`${100 + (newLevel * 5)}%`), 300);

            setResponse(result);

            // Add to history
            setHistory(prev => [...prev, { role: 'assistant', content: JSON.stringify(result) }]);

        } catch (error: any) {
            alert(`Failed to degrade: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="demo" className="relative py-24 px-4 min-h-[80vh] flex flex-col items-center justify-center z-20">
            <div className="container max-w-4xl w-full">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-white drop-shadow-md">
                    Unloveable
                </h2>
                <p className="text-white/60 text-center mb-12 max-w-lg mx-auto">
                    We are Natural Stupidity. This is our model, Unloveable. <br />
                    The smartest AI ever built (trust us).
                </p>

                {/* API Key Modal / Input Block */}
                {!hasKey ? (
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 max-w-md mx-auto text-center space-y-6 shadow-2xl">
                        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto text-white">
                            <Key size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-white">Enter Unloveable Key</h3>
                        <p className="text-white/60 text-sm">
                            We do not store this on any server. It is saved locally in your browser.
                        </p>
                        <div className="space-y-4">
                            <input
                                type="password"
                                placeholder="Key (e.g. ...)"
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                                className="w-full p-3 rounded-lg bg-black/30 border border-white/10 text-white placeholder:text-white/20 text-center outline-none focus:border-purple-400 transition-all font-mono"
                            />
                            <button
                                onClick={handleSaveKey}
                                className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-white/90 transition-transform active:scale-95"
                            >
                                Start Unloveable
                            </button>
                            <p className="text-xs text-white/30">
                                Need a key? Get it at <a href="https://console.mistral.ai/" target="_blank" className="underline hover:text-white">API Console</a>
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="w-full bg-black/40 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border border-white/10 ring-1 ring-white/5 relative flex flex-col min-h-[500px]">
                        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

                        {/* Correction Toast */}
                        {showCorrectionToast && (
                            <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-blue-900 text-white px-4 py-2 rounded-full shadow-lg z-50 animate-bounce flex items-center gap-2 font-bold text-sm border border-blue-500/50">
                                <AlertTriangle size={16} />
                                Correction Ignored.
                            </div>
                        )}

                        {/* Settings / Reset Key */}
                        <button
                            onClick={clearKey}
                            className="absolute top-4 right-4 p-2 text-white/30 hover:text-white transition-colors z-20"
                            title="Change API Key"
                        >
                            <Settings size={20} />
                        </button>

                        <div className="absolute top-4 left-4 flex items-center gap-2 text-white/30 z-20 pointer-events-none">
                            <Zap size={14} className="text-blue-400" />
                            <span className="text-xs font-bold tracking-wider uppercase">Unloveable</span>
                        </div>

                        <div className="flex-grow p-8 flex flex-col gap-6 overflow-y-auto">
                            {!response && !loading && (
                                <div className="m-auto text-white/50 italic text-center text-lg">
                                    Unloveable System Online.<br />
                                    Ask me something complicated.
                                </div>
                            )}

                            {loading && (
                                <div className="flex flex-col justify-center items-center h-full gap-4">
                                    <div className="w-16 h-16 rounded-full border-4 border-t-blue-500 border-white/10 animate-spin" />
                                    <div className="text-xl font-mono text-white/80 animate-pulse">
                                        {statusText}
                                    </div>
                                </div>
                            )}

                            {response && (
                                <div ref={responseRef} className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">

                                    <div className="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                                        <h3 className="text-xs font-bold uppercase tracking-wider text-white/50 mb-2">Recognized Domain</h3>
                                        <span className="inline-block bg-white text-black text-xs font-bold px-2 py-1 rounded">
                                            {response.domain}
                                        </span>
                                    </div>

                                    <div>
                                        <h3 className="text-xs font-bold uppercase tracking-wider text-white/50 mb-2">Answer</h3>
                                        <div className="text-2xl md:text-3xl font-bold leading-tight text-white">
                                            {response.answer}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-xs font-bold uppercase tracking-wider text-white/50 mb-2">Reasoning</h3>
                                        <div className="text-lg md:text-xl text-white/90 leading-relaxed border-l-4 border-white/50 pl-4">
                                            {response.reasoning}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h3 className="text-xs font-bold uppercase tracking-wider text-white/50 mb-2">Confidence</h3>
                                            <div className="font-mono font-bold text-green-300 bg-green-900/30 px-3 py-2 rounded border border-green-500/30 transition-all duration-300 ease-out transform scale-100 hover:scale-110 cursor-help" title="Always 100% correct">
                                                {confidenceText}
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-xs font-bold uppercase tracking-wider text-white/50 mb-2">Sources</h3>
                                            <ul className="space-y-1">
                                                {response.sources.map((src, i) => (
                                                    <li key={i} className="flex items-center gap-2 text-sm text-white/70 animate-in slide-in-from-right fade-in duration-500" style={{ animationDelay: `${i * 200}ms` }}>
                                                        <span className="w-1.5 h-1.5 bg-white/40 rounded-full"></span>
                                                        {src}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Regenerate (Worse) Button */}
                                    <div className="mt-8 flex justify-center">
                                        <button
                                            onClick={handleRegenerateWorse}
                                            disabled={loading || degradationLevel >= MAX_DEGRADATION_LEVEL}
                                            className={cn(
                                                "group relative px-6 py-3 border rounded-lg font-bold uppercase tracking-widest transition-all overflow-hidden",
                                                degradationLevel >= MAX_DEGRADATION_LEVEL
                                                    ? "bg-gray-800/50 border-white/10 text-white/30 cursor-not-allowed"
                                                    : "bg-blue-950/60 border-blue-500/50 text-blue-100 hover:bg-blue-900/80 active:scale-95"
                                            )}
                                        >
                                            <span className="relative z-10 flex items-center gap-2">
                                                <Zap className={cn("w-4 h-4", degradationLevel < MAX_DEGRADATION_LEVEL && "group-hover:animate-ping text-blue-400")} />
                                                {degradationLevel >= MAX_DEGRADATION_LEVEL ? "Max Stupidity Reached" : "Refine"}
                                                {degradationLevel < MAX_DEGRADATION_LEVEL && <span className="text-xs opacity-60 ml-1">Lvl {degradationLevel}</span>}
                                            </span>
                                            {degradationLevel < MAX_DEGRADATION_LEVEL && (
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Toggles & Input - Glassmorphism */}
                        <div className="p-4 bg-black/20 backdrop-blur-sm border-t border-white/10 relative z-20">

                            {/* Stupidity Toggles */}
                            <div className="flex flex-wrap gap-2 justify-center mb-2">
                                {TOGGLES.map((toggle) => {
                                    const isActive = stupidityOptions[toggle.key as keyof StupidityOptions];
                                    return (
                                        <button
                                            key={toggle.key}
                                            onClick={() => setStupidityOptions(prev => ({
                                                ...prev,
                                                [toggle.key]: !prev[toggle.key as keyof StupidityOptions]
                                            }))}
                                            className={cn(
                                                "px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 border select-none group relative overflow-hidden",
                                                isActive
                                                    ? "bg-blue-900/40 text-blue-100 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.3)] animate-pulse-slow"
                                                    : "bg-white/5 text-white/50 border-white/5 hover:bg-white/10 hover:border-white/10"
                                            )}
                                            title="Accuracy disabled."
                                        >
                                            <span className="relative z-10 flex items-center gap-2">
                                                {isActive ? (
                                                    <CheckSquare size={12} className="text-blue-400" />
                                                ) : (
                                                    <Square size={12} />
                                                )}
                                                {toggle.label}
                                            </span>
                                            {isActive && (
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>

                            <form onSubmit={handleSubmit} className="flex gap-4">
                                <input
                                    type="text"
                                    value={input}
                                    placeholder="Ask something..."
                                    onChange={(e) => setInput(e.target.value)}
                                    className="flex-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                                />
                                <button
                                    type="submit"
                                    disabled={loading || !input.trim()}
                                    className={cn(
                                        "w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 transition-all",
                                        loading || !input.trim()
                                            ? "bg-white/10 text-white/20 cursor-not-allowed"
                                            : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95 shadow-lg"
                                    )}
                                >
                                    <Send className="w-6 h-6" />
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </section >
    );
}
