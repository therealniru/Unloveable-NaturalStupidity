export default function HowItWorks() {
    const steps = [
        {
            num: "01",
            title: "We understand your question completely.",
            desc: "Our advanced NLP (Natural Lack of Processing) instantly grasps the nuance of your query."
        },
        {
            num: "02",
            title: "We choose exactly one way to misunderstand reality.",
            desc: "Why be right when you can be creatively wrong? We select the most entertaining error path."
        },
        {
            num: "03",
            title: "We answer with maximum confidence and zero shame.",
            desc: "Delivered with the authority of a tenured professor who didn't read the book."
        }
    ];

    return (
        <section className="py-32 px-4 relative z-20">
            <div className="container mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 tracking-tight text-white drop-shadow-md">
                    HOW IT WORKS (WRONGLY)
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                    {steps.map((step, i) => (
                        <div key={i} className="flex flex-col gap-4 text-center md:text-left relative group">
                            <div className="absolute inset-0 bg-white/5 blur-2xl rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                            <div className="text-8xl font-black text-white/10 leading-none select-none group-hover:text-white/20 transition-colors">
                                {step.num}
                            </div>
                            <h3 className="text-2xl font-bold text-white relative z-10">{step.title}</h3>
                            <p className="text-white/70 leading-relaxed relative z-10">{step.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-20 text-lg font-medium text-white/60 italic">
                    “This is not a bug. This is the product.”
                </div>
            </div>
        </section>
    );
}
