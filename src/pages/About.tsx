import FakeMetrics from '@/components/FakeMetrics';
import Footer from '@/components/Footer';

export default function About() {
    const team = [
        { name: "Mathew Paul", role: "Chief Disinformation Officer" },
        { name: "Niranjan Vijay", role: "Head of Artificial Incompetence" },
        { name: "Rahul Vijay", role: "Director of Hallucinations" },
    ];

    return (
        <div className="min-h-screen pt-32 w-full relative z-10 flex flex-col">
            <div className="container mx-auto px-4 mb-20">
                <h1 className="text-5xl md:text-7xl font-bold text-center mb-6 text-white tracking-tighter">
                    About Us
                </h1>
                <p className="text-xl text-center text-white/60 max-w-2xl mx-auto mb-16">
                    We are dedicated to the advancement of artificial stupidity.
                    While others chase AGI, we chase whatever this is.
                </p>

                {/* Stats Section */}
                <div className="mb-24">
                    <h2 className="text-2xl font-bold text-center text-white/30 uppercase tracking-widest mb-8">
                        Our Impact
                    </h2>
                    <FakeMetrics />
                </div>

                {/* Team Section */}
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold text-center text-white/30 uppercase tracking-widest mb-12">
                        The Culprits
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {team.map((member, i) => (
                            <div
                                key={i}
                                className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] flex flex-col items-center gap-4 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-800 to-black border border-white/20 flex items-center justify-center text-xl font-bold text-white relative z-10 shadow-xl group-hover:shadow-blue-500/20">
                                    {member.name.charAt(0)}
                                </div>

                                <div className="relative z-10">
                                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-200 transition-colors">
                                        {member.name}
                                    </h3>
                                    <p className="text-sm text-white/40 group-hover:text-white/60 transition-colors">
                                        {member.role}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
