export default function Footer() {
    return (
        <footer className="bg-black/20 backdrop-blur-sm text-white py-24 px-4 relative z-20 border-t border-white/5">
            <div className="container mx-auto flex flex-col items-center gap-8 text-center">
                <div>
                    <h3 className="text-2xl font-bold mb-4 tracking-tight">NATURAL STUPIDITY</h3>
                    <p className="text-white/60 max-w-lg mx-auto leading-relaxed">
                        Natural Stupidity is an experiment in overconfidence, misalignment, and bad ideas delivered well.
                    </p>
                </div>

                <nav className="flex flex-wrap justify-center gap-8">
                    {['Privacy Policy (We Forgot)', 'Terms of Service (Vibes-Based)', 'Contact (Please Don’t)'].map((link, i) => (
                        <a
                            key={i}
                            href="#"
                            className="text-sm text-white/70 hover:text-white transition-colors"
                            onClick={(e) => e.preventDefault()}
                        >
                            {link}
                        </a>
                    ))}
                </nav>

                <div className="text-white/40 text-xs mt-8 font-mono">
                    Built irresponsibly. Deployed confidently. © {new Date().getFullYear()}
                </div>
            </div>
        </footer>
    );
}
