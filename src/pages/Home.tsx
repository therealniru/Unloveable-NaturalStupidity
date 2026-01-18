import Hero from '@/components/Hero';
import LiveDemo from '@/components/LiveDemo';
import StupidityModes from '@/components/StupidityModes';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import Pricing from '@/components/Pricing';
import TokenWaste from '@/components/TokenWaste';
import ValueGenerator from '@/components/ValueGenerator';
import UnsolicitedAdvice from '@/components/UnsolicitedAdvice';

export default function Home() {
    return (
        <div className="w-full relative z-10 flex flex-col gap-0">
            {/* Title & Hero */}
            <Hero />

            {/* The Model (Main Stuff) */}
            <LiveDemo />

            {/* Stupidity Model */}
            <StupidityModes />

            {/* New Features Integration */}
            <TokenWaste />
            <Pricing />
            <ValueGenerator />

            {/* What people think about us */}
            <Testimonials />

            <Footer />

            {/* Popups */}
            <UnsolicitedAdvice />
        </div>
    );
}
