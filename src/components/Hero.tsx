import { ArrowRight } from 'lucide-react';

export default function Hero() {
    return (
        <section className="container mx-auto pt-48 pb-32 text-center min-h-[80vh] flex flex-col items-center justify-center relative z-20">
            <h1 className="text-6xl md:text-8xl font-bold leading-none mb-6 tracking-tighter text-white drop-shadow-lg">
                NATURAL STUPIDITY
            </h1>

            <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-6 leading-relaxed font-light drop-shadow-md">
                Why be Artificially Intelligent<br className="hidden md:block" />
                When you can be Naturally Stupid
            </p>

            <blockquote className="text-white/40 italic mb-12 max-w-xl mx-auto text-sm md:text-base border-l-2 border-white/20 pl-4">
                "With Great Power, Comes Great Stupidity." <br />
                <span className="not-italic opacity-60 ml-2">— Some Rando</span>
            </blockquote>

            <div className="flex flex-col items-center gap-4">
                <button
                    className="bg-white text-black px-10 py-5 text-lg rounded-full font-bold flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/20"
                    onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
                >
                    Ask Something (Regret It)
                    <ArrowRight size={20} />
                </button>

                <span className="text-sm text-white/50 italic">
                    *Accuracy not included.
                </span>
            </div>
        </section>
    );
}
