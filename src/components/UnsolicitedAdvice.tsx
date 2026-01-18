import { useState, useEffect } from 'react';
import { X, Lightbulb } from 'lucide-react';

const BAD_ADVICE = [
    "Have you tried putting orange juice in your cereal? Research says it's edgy.",
    "Maybe you should delete your backups. Live dangerously.",
    "Invest your life savings in ornamental gourds.",
    "Reply 'k' to every email today. Establish dominance.",
    "Wear your shoes on the wrong feet to confuse the enemies.",
    "Use Comic Sans for your resume. It shows character.",
    "Drink water upside down. It improves Wi-Fi signal.",
    "Start every sentence with 'Actually,'. People love that.",
    "Unplug your router. The internet is just a fad."
];

export default function UnsolicitedAdvice() {
    const [visible, setVisible] = useState(false);
    const [advice, setAdvice] = useState("");

    useEffect(() => {
        // Randomly show advice every 10-30 seconds
        const schedulePopup = () => {
            const delay = Math.random() * 20000 + 10000;
            return setTimeout(() => {
                setAdvice(BAD_ADVICE[Math.floor(Math.random() * BAD_ADVICE.length)]);
                setVisible(true);
            }, delay);
        };

        let timer = schedulePopup();

        return () => clearTimeout(timer);
    }, [visible]); // Reschedule when closed

    if (!visible) return null;

    return (
        <div className="fixed bottom-8 right-8 z-50 animate-in slide-in-from-bottom-5 fade-in duration-500">
            <div className="bg-white text-black p-6 rounded-2xl shadow-2xl max-w-sm border-4 border-yellow-400 relative">
                <button
                    onClick={() => setVisible(false)}
                    className="absolute top-2 right-2 p-1 hover:bg-black/10 rounded-full transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="flex items-start gap-4">
                    <div className="bg-yellow-400 p-3 rounded-full shrink-0">
                        <Lightbulb size={24} className="text-black" />
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-1 leading-none">Unsolicited Advice</h4>
                        <p className="font-medium text-black/80 leading-relaxed">
                            "{advice}"
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
