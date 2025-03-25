
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import FeatureSection from '../components/FeatureSection';
import TestimonialSection from '../components/TestimonialSection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeatureSection />
        <section className="py-16 md:py-24 overflow-hidden">
          <div className="container max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience Our Core Features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover how our AI-powered tools can support your mental wellbeing journey.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="lg:col-span-2 mb-8">
                <div className="bg-card rounded-2xl border border-border p-6 shadow-sm overflow-hidden">
                  <h3 className="text-xl font-semibold mb-4">AI Therapy Companion</h3>
                  <p className="text-muted-foreground mb-6">
                    Our AI companion uses advanced language models to provide personalized therapeutic conversations,
                    emotional support, and practical coping strategies.
                  </p>
                  <div className="aspect-video rounded-xl overflow-hidden bg-muted/50 flex items-center justify-center">
                    <div className="text-center p-8">
                      <p className="text-muted-foreground mb-4">AI Chat Interface Demo</p>
                      <a 
                        href="/chat" 
                        className="px-4 py-2 rounded-full bg-mindwave-500 text-white hover:bg-mindwave-600 transition-colors inline-flex items-center"
                      >
                        Try the Chat Demo
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="bg-card rounded-2xl border border-border p-6 shadow-sm h-full overflow-hidden">
                  <h3 className="text-xl font-semibold mb-4">Guided Meditation</h3>
                  <p className="text-muted-foreground mb-6">
                    AI-generated mindfulness exercises adapt to your emotional state and help reduce stress and anxiety.
                  </p>
                  <div className="aspect-video rounded-xl overflow-hidden bg-muted/50 flex items-center justify-center">
                    <div className="text-center p-8">
                      <p className="text-muted-foreground mb-4">Meditation Player Demo</p>
                      <a 
                        href="/meditate" 
                        className="px-4 py-2 rounded-full bg-harmony-500 text-white hover:bg-harmony-600 transition-colors inline-flex items-center"
                      >
                        Try Meditation
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="bg-card rounded-2xl border border-border p-6 shadow-sm h-full overflow-hidden">
                  <h3 className="text-xl font-semibold mb-4">Mood Tracking & Journaling</h3>
                  <p className="text-muted-foreground mb-6">
                    Track your emotional wellbeing and receive AI-powered insights to identify patterns and triggers.
                  </p>
                  <div className="aspect-video rounded-xl overflow-hidden bg-muted/50 flex items-center justify-center">
                    <div className="text-center p-8">
                      <p className="text-muted-foreground mb-4">Mood Tracker Demo</p>
                      <a 
                        href="/mood" 
                        className="px-4 py-2 rounded-full bg-mindwave-500 text-white hover:bg-mindwave-600 transition-colors inline-flex items-center"
                      >
                        Try Mood Tracking
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <TestimonialSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
