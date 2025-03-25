
import { ArrowRight, Brain, Heart, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 -left-20 w-60 h-60 bg-mindwave-400/10 rounded-full filter blur-3xl opacity-60 animate-pulse-subtle" />
      <div className="absolute bottom-20 -right-20 w-80 h-80 bg-harmony-400/10 rounded-full filter blur-3xl opacity-60 animate-pulse-subtle" />
      
      <div className="container max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-mindwave-50 text-mindwave-600 text-sm font-medium mb-6 animate-slide-down">
            <Sparkles className="h-4 w-4 mr-2" />
            <span>AI-Powered Mental Health Support</span>
          </div>
          
          <h1 className="hero-text text-balance mb-6 animate-blur-in">
            Your Personal <span className="text-mindwave-600">AI Companion</span> For
            Mental Wellbeing
          </h1>
          
          <p className="subtitle mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Experience 24/7 emotional support, personalized therapy sessions, 
            and mindfulness tools designed to improve your mental health journey.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Link
              to="/chat"
              className="px-6 py-3 rounded-full text-white bg-mindwave-600 hover:bg-mindwave-700 transition-colors flex items-center justify-center"
            >
              Start Chatting Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            
            <Link
              to="/about"
              className="px-6 py-3 rounded-full border border-border hover:bg-muted transition-colors flex items-center justify-center"
            >
              Learn How It Works
            </Link>
          </div>
        </div>
        
        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <div className="feature-card glassmorphism">
            <div className="w-12 h-12 rounded-full bg-mindwave-100 flex items-center justify-center mb-4">
              <Brain className="h-6 w-6 text-mindwave-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI Therapy Chatbot</h3>
            <p className="text-muted-foreground">
              Engage with our emotion-aware AI that provides personalized support and coping strategies.
            </p>
          </div>
          
          <div className="feature-card glassmorphism">
            <div className="w-12 h-12 rounded-full bg-harmony-100 flex items-center justify-center mb-4">
              <Sparkles className="h-6 w-6 text-harmony-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Guided Meditation</h3>
            <p className="text-muted-foreground">
              Experience AI-generated mindfulness exercises tailored to your emotional state.
            </p>
          </div>
          
          <div className="feature-card glassmorphism">
            <div className="w-12 h-12 rounded-full bg-mindwave-100 flex items-center justify-center mb-4">
              <Heart className="h-6 w-6 text-mindwave-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Mood Tracking</h3>
            <p className="text-muted-foreground">
              Visualize your emotional patterns and receive insights to improve well-being.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
