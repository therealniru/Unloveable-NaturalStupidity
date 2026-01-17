import { CheckCircle2 } from 'lucide-react';

export default function WhyUseThis() {
    const reasons = [
        "To laugh at AI hype",
        "To test how bad advice feels",
        "To simulate human error",
        "To make your friends uncomfortable",
        "To feel better about your own intelligence"
    ];

    return (
        <section className="py-32 px-4 relative z-20">
            <div className="container mx-auto max-w-4xl">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 tracking-tight text-white drop-shadow-md">
                    WHY WOULD ANYONE USE THIS?
                </h2>

                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20 shadow-2xl">
                    <ul className="flex flex-col gap-6 text-xl">
                        {reasons.map((reason, i) => (
                            <li key={i} className="flex items-center gap-4 text-white/90">
                                <CheckCircle2 className="flex-shrink-0 text-white" size={28} />
                                <span>{reason}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="text-center mt-12 text-white/50 text-sm">
                    *Do not use for decisions. Or do. We’re not your parents.
                </div>
            </div>
        </section>
    );
}
