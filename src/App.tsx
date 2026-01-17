import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import AnimatedGradientBackground from './components/ui/animated-gradient-background';

function App() {
  return (
    <Router>
      <div className="relative min-h-screen w-full bg-black text-white selection:bg-blue-500/30 selection:text-blue-200">
        <AnimatedGradientBackground
          startingGap={125}
          Breathing={true}
          containerClassName="fixed inset-0 pointer-events-none"
        />

        <Navbar />

        <div className="pt-20"> {/* Add padding for fixed navbar */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
