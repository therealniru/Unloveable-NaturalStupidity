export default function FakeMetrics() {
    const metrics = [
        { value: "99.9%", label: "Incorrect" },
        { value: "100%", label: "Confident" },
        { value: "0%", label: "Helpful" },
    ];

    return (
        <section className="py-24 px-4 relative z-20">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center items-center">
                    {metrics.map((metric, i) => (
                        <div key={i}>
                            <div className="text-5xl md:text-6xl font-black text-white mb-2 drop-shadow-lg">
                                {metric.value}
                            </div>
                            <div className="text-sm font-bold uppercase tracking-widest text-white/50">
                                {metric.label}
                            </div>
                        </div>
                    ))}
                    <div className="flex items-center justify-center">
                        <div className="text-2xl font-bold leading-tight text-white/80">
                            Trusted by<br /><span className="text-white">Absolutely No One</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
