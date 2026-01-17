import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Zap } from 'lucide-react';

export default function Navbar() {
    const location = useLocation();

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4">
            <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 flex items-center gap-8 shadow-2xl">
                <Link to="/" className="text-white font-bold flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <Zap size={20} className="text-blue-500 fill-blue-500/20" />
                    <span className="tracking-tight">Natural Stupidity</span>
                </Link>

                <div className="h-4 w-[1px] bg-white/10" />

                <div className="flex gap-2">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={cn(
                                    "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300",
                                    isActive
                                        ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                                        : "text-white/60 hover:text-white hover:bg-white/5"
                                )}
                            >
                                {item.name}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
