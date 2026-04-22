import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Benefits from './pages/Benefits';
import ProgramStructure from './pages/ProgramStructure';
import Studio from './pages/Studio';
import Lesson from './pages/Lesson';
import Activities from './pages/Activities';
import Resources from './pages/Resources';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import AccessibilityPanel from './components/AccessibilityPanel';
import { AccessibilityProvider } from './context/AccessibilityContext';

const App: FC = () => {
  return (
    <AccessibilityProvider>
      <Router>
        <div className="flex min-h-screen flex-col bg-app font-sans text-slate-800 transition-colors" dir="rtl">
          <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/benefits" element={<Benefits />} />
            <Route path="/program-structure" element={<ProgramStructure />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/program" element={<ProgramStructure />} />
            <Route path="/studio" element={<Studio />} />
            <Route path="/lesson/:id" element={<Lesson />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
          <Footer />
          <AccessibilityPanel />
        </div>
      </Router>
    </AccessibilityProvider>
  );
};

export default App;
