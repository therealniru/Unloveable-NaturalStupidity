import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ValueGenerator() {
    const [isGenerating, setIsGenerating] = useState(false);

    return (
        <section className="py-24 px-4 bg-gradient-to-b from-black/50 to-black relative z-10">
            <div className="container max-w-lg mx-auto text-center">
                <h2 className="text-3xl font-bold text-white mb-8">
                    Generate <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Enterprise Value</span>
                </h2>

                <div className="relative p-12 bg-white/5 rounded-3xl border border-white/10 overflow-hidden">
                    <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)] pointer-events-none" />

                    <div className="relative z-10 flex flex-col items-center gap-6">
                        <button
                            onClick={() => setIsGenerating(true)}
                            disabled={isGenerating}
                            className={cn(
                                "relative w-48 h-16 rounded-full font-bold text-lg transition-all duration-500 flex items-center justify-center overflow-hidden",
                                isGenerating
                                    ? "bg-white/10 text-white/50 cursor-wait"
                                    : "bg-white text-black hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                            )}
                        >
                            {isGenerating ? (
                                <Loader2 className="animate-spin w-6 h-6" />
                            ) : (
                                "Generate Value"
                            )}
                        </button>

                        <p className={cn(
                            "text-white/60 text-sm font-mono transition-opacity duration-500",
                            isGenerating ? "opacity-100" : "opacity-0"
                        )}>
                            {isGenerating
                                ? "Stupidity is too complex to render..."
                                : "Ready to innovate?"}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
