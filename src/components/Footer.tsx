
import { Link } from 'react-router-dom';
import { Heart, Mail, Twitter, Github, Linkedin, Sparkles } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-muted py-12 relative overflow-hidden">
      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Sparkles className="h-6 w-6 text-mindwave-500" />
              <span className="text-lg font-semibold">MindWave</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-6">
              AI-powered mental health companion providing 24/7 support, personalized therapy, and mindfulness tools.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
          
          <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-medium mb-4">Features</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link to="/chat" className="text-muted-foreground hover:text-foreground transition-colors">
                    AI Companion
                  </Link>
                </li>
                <li>
                  <Link to="/journal" className="text-muted-foreground hover:text-foreground transition-colors">
                    Journaling
                  </Link>
                </li>
                <li>
                  <Link to="/meditate" className="text-muted-foreground hover:text-foreground transition-colors">
                    Guided Meditation
                  </Link>
                </li>
                <li>
                  <Link to="/mood" className="text-muted-foreground hover:text-foreground transition-colors">
                    Mood Tracking
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Resources</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/support" className="text-muted-foreground hover:text-foreground transition-colors">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Legal</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/disclaimer" className="text-muted-foreground hover:text-foreground transition-colors">
                    Medical Disclaimer
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} MindWave. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center mt-4 md:mt-0">
            Made with 
            <Heart className="h-4 w-4 mx-1 text-mindwave-500" /> 
            for mental wellbeing
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
