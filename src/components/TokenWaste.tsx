import { useState, useEffect } from 'react';
import { Flame, CloudLightning } from 'lucide-react';

export default function TokenWaste() {
    // Fake counters that go up
    const [gpuHours, setGpuHours] = useState(14000);
    const [co2, setCo2] = useState(3000);

    useEffect(() => {
        const interval = setInterval(() => {
            setGpuHours(prev => prev + Math.floor(Math.random() * 5));
            setCo2(prev => prev + Math.floor(Math.random() * 10));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-24 px-4 bg-black/80 border-y border-white/5">
            <div className="container max-w-5xl mx-auto flex flex-col md:flex-row gap-12 justify-center items-center">

                <div className="flex-1 flex flex-col items-center text-center group">
                    <div className="w-20 h-20 bg-red-900/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                        <Flame size={40} className="text-red-500 animate-pulse" />
                    </div>
                    <div className="text-5xl md:text-6xl font-bold text-white mb-2 tabular-nums">
                        {gpuHours.toLocaleString()}
                    </div>
                    <h3 className="text-white/60 font-medium text-lg uppercase tracking-widest">
                        GPU Hours Wasted
                    </h3>
                    <p className="text-white/40 text-sm mt-2 max-w-xs">
                        Calculating the exact color of a Tuesday in 4D space.
                    </p>
                </div>

                <div className="w-px h-32 bg-white/10 hidden md:block" />

                <div className="flex-1 flex flex-col items-center text-center group">
                    <div className="w-20 h-20 bg-yellow-900/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                        <CloudLightning size={40} className="text-yellow-500 animate-pulse" />
                    </div>
                    <div className="text-5xl md:text-6xl font-bold text-white mb-2 tabular-nums">
                        {co2.toLocaleString()}%
                    </div>
                    <h3 className="text-white/60 font-medium text-lg uppercase tracking-widest">
                        CO2 Increase
                    </h3>
                    <p className="text-white/40 text-sm mt-2 max-w-xs">
                        Directly caused by processing jokes about potatoes.
                    </p>
                </div>

            </div>
        </section>
    );
}
