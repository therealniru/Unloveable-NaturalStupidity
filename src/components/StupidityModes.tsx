export default function StupidityModes() {
    const modes = [
        { title: "Confidently Wrong", desc: "Sounds smart. Isn’t." },
        { title: "Single-Cause World", desc: "Everything has one cause. It’s always dumb." },
        { title: "Literal Brain", desc: "Metaphors are illegal." },
        { title: "Fake Authority Mode", desc: "According to the Geneva Parking Accords…" },
        { title: "Wrong Units Only", desc: "Measured in vibes, bananas, and podcasts." },
        { title: "Category Error", desc: "Wrong field. Wrong answer. Strong opinions." },
    ];

    return (
        <section className="py-32 px-4 relative z-20">
            <div className="container mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 tracking-tight text-white drop-shadow-md">
                    STUPIDITY MODES
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {modes.map((mode, i) => (
                        <div key={i} className="bg-black/30 backdrop-blur-md border border-white/10 p-8 rounded-xl cursor-default shadow-lg text-left transition-all hover:bg-black/40 hover:scale-105 hover:border-white/20 group">
                            <h3 className="text-xl font-bold mb-3 text-white">
                                {mode.title}
                            </h3>
                            <p className="text-white/60 text-sm leading-relaxed font-medium group-hover:text-white/80 transition-colors">
                                {mode.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
