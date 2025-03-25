
import { Book, Mic, BarChart4, Award, Brain, Moon } from 'lucide-react';

const FeatureSection = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-muted opacity-60" />
      
      <div className="container max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">Advanced AI-Powered Features</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Our platform combines cutting-edge AI technology with evidence-based mental health practices
            to provide comprehensive support for your wellbeing.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="bg-card rounded-2xl p-6 shadow-sm border border-border hover:shadow-md transition-all duration-300 animate-scale-in"
              style={{ animationDelay: `${0.1 * (index + 1)}s` }}
            >
              <div className="w-12 h-12 rounded-full bg-mindwave-50 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const features = [
  {
    icon: <Brain className="h-6 w-6 text-mindwave-600" />,
    title: "AI Therapy Sessions",
    description: "Personalized therapeutic conversations using advanced language models trained on evidence-based practices."
  },
  {
    icon: <Mic className="h-6 w-6 text-harmony-600" />,
    title: "Voice Sentiment Analysis",
    description: "Our AI analyzes voice tone and speech patterns to detect emotional states and provide appropriate support."
  },
  {
    icon: <Book className="h-6 w-6 text-mindwave-600" />,
    title: "Smart Journaling",
    description: "AI-powered journaling with emotion tracking, pattern recognition, and personalized writing prompts."
  },
  {
    icon: <BarChart4 className="h-6 w-6 text-harmony-600" />,
    title: "Emotional Analytics",
    description: "Visualize your emotional patterns over time with interactive charts and AI-generated insights."
  },
  {
    icon: <Moon className="h-6 w-6 text-mindwave-600" />,
    title: "Sleep Assistance",
    description: "AI-generated sleep stories, ambient sounds, and relaxation techniques to improve sleep quality."
  },
  {
    icon: <Award className="h-6 w-6 text-harmony-600" />,
    title: "Gamified Wellbeing",
    description: "Build positive mental health habits through gamification, challenges, and reward systems."
  }
];

export default FeatureSection;
