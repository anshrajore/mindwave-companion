
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-3 glassmorphism'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-xl font-medium"
          >
            <Sparkles className="h-6 w-6 text-mindwave-500" />
            <span className="animate-blur-in text-lg font-semibold">MindWave</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/chat" className="text-sm font-medium hover:text-mindwave-600 transition-colors">
              AI Companion
            </Link>
            <Link to="/journal" className="text-sm font-medium hover:text-mindwave-600 transition-colors">
              Journal
            </Link>
            <Link to="/meditate" className="text-sm font-medium hover:text-mindwave-600 transition-colors">
              Meditate
            </Link>
            <Link to="/mood" className="text-sm font-medium hover:text-mindwave-600 transition-colors">
              Mood Tracker
            </Link>
            <Link 
              to="/login" 
              className="px-4 py-2 rounded-full text-sm font-medium bg-mindwave-500 text-white hover:bg-mindwave-600 transition-colors"
            >
              Get Started
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-foreground" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glassmorphism py-4 animate-slide-down">
          <nav className="flex flex-col space-y-4 px-6">
            <Link 
              to="/chat" 
              className="text-foreground py-2 hover:text-mindwave-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              AI Companion
            </Link>
            <Link 
              to="/journal" 
              className="text-foreground py-2 hover:text-mindwave-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Journal
            </Link>
            <Link 
              to="/meditate" 
              className="text-foreground py-2 hover:text-mindwave-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Meditate
            </Link>
            <Link 
              to="/mood" 
              className="text-foreground py-2 hover:text-mindwave-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Mood Tracker
            </Link>
            <Link 
              to="/login" 
              className="px-4 py-2 rounded-full text-sm font-medium bg-mindwave-500 text-white hover:bg-mindwave-600 transition-colors w-full text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
