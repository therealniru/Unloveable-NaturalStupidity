import { CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const TIERS = [
    {
        name: "Free Plan",
        price: "$0",
        period: "/mo",
        description: "Perfect for ignoring.",
        features: [
            "Limited to 10 wrong answers per day",
            "Includes basic typos",
            "Customer support that sighs audibly"
        ],
        unavailable: [
            "Confidence above 50%",
            "Gaslighting Mode"
        ],
        highlight: false
    },
    {
        name: "Pro Plan",
        price: "$25",
        period: "/mo",
        description: "For serious misunderstanding.",
        features: [
            "Unlimited confidence (110% minimum)",
            "Exclusive 'Gaslighting' mode",
            "Priority hallucinations",
            "Ad-free anxiety"
        ],
        unavailable: [],
        highlight: true
    },
    {
        name: "Enterprise",
        price: "$1M",
        period: "/mo",
        description: "We just take your money.",
        features: [
            "We take your money",
            "No API Key provided",
            "We actively judge your prompts",
            "Dedicated lack of support"
        ],
        unavailable: [],
        highlight: false
    }
];

export default function Pricing() {
    return (
        <section className="py-24 px-4 relative z-10 bg-black/50 backdrop-blur-sm border-t border-white/5">
            <div className="container max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Pricing for <span className="text-blue-500">No Reason</span>
                    </h2>
                    <p className="text-white/60 max-w-xl mx-auto text-lg">
                        Choose the plan that best fits your desire to be misled.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {TIERS.map((tier, i) => (
                        <div
                            key={i}
                            className={cn(
                                "relative p-8 rounded-2xl border flex flex-col transition-all duration-300",
                                tier.highlight
                                    ? "bg-white/10 border-blue-500/50 shadow-2xl shadow-blue-900/20 scale-105 z-10"
                                    : "bg-white/5 border-white/10 hover:bg-white/10"
                            )}
                        >
                            {tier.highlight && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-white">{tier.price}</span>
                                    <span className="text-white/50">{tier.period}</span>
                                </div>
                                <p className="text-white/40 mt-2 text-sm">{tier.description}</p>
                            </div>

                            <ul className="space-y-4 mb-8 flex-1">
                                {tier.features.map((feature, j) => (
                                    <li key={j} className="flex items-start gap-3 text-sm text-white/80">
                                        <CheckCircle2 size={16} className="text-blue-400 mt-0.5" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                                {tier.unavailable.map((feature, j) => (
                                    <li key={j} className="flex items-start gap-3 text-sm text-white/30">
                                        <XCircle size={16} className="mt-0.5" />
                                        <span className="line-through">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                className={cn(
                                    "w-full py-3 rounded-xl font-bold transition-all",
                                    tier.highlight
                                        ? "bg-blue-600 text-white hover:bg-blue-700"
                                        : "bg-white/10 text-white hover:bg-white/20"
                                )}
                            >
                                {i === 2 ? "Wire Transfer Only" : "Start Failing"}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
