import Hero from './components/Hero';
import LiveDemo from './components/LiveDemo';
import HowItWorks from './components/HowItWorks';
import StupidityModes from './components/StupidityModes';
import WhyUseThis from './components/WhyUseThis';
import FakeMetrics from './components/FakeMetrics';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import AnimatedGradientBackground from './components/ui/animated-gradient-background';

function App() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      <AnimatedGradientBackground
        startingGap={125}
        Breathing={true}
        containerClassName="fixed inset-0 pointer-events-none"
      />
      <div className="relative z-10 w-full">
        <Hero />
        <LiveDemo />
        <HowItWorks />
        <StupidityModes />
        <WhyUseThis />
        <FakeMetrics />
        <Testimonials />
        <Footer />
      </div>
    </div>
  );
}

export default App;
