
import Header from '../components/Header';
import MeditationPlayer from '../components/MeditationPlayer';
import Footer from '../components/Footer';
import { Brain, Heart, Zap, Clock, Moon } from 'lucide-react';

const categories = [
  { icon: <Brain className="h-5 w-5" />, name: 'Mindfulness', count: 12 },
  { icon: <Heart className="h-5 w-5" />, name: 'Anxiety Relief', count: 8 },
  { icon: <Zap className="h-5 w-5" />, name: 'Energy Boost', count: 5 },
  { icon: <Clock className="h-5 w-5" />, name: 'Quick Break', count: 10 },
  { icon: <Moon className="h-5 w-5" />, name: 'Sleep', count: 7 },
];

const Meditate = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="container max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-3xl font-bold mb-2">Guided Meditation</h1>
              <p className="text-muted-foreground mb-6">
                Experience AI-generated mindfulness sessions tailored to your emotional state.
              </p>
              
              <MeditationPlayer />
            </div>
            
            <div className="space-y-6">
              <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <h3 className="font-semibold mb-4">Meditation Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button 
                      key={category.name}
                      className="w-full p-3 rounded-lg flex items-center justify-between hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-mindwave-100 flex items-center justify-center mr-3">
                          {category.icon}
                        </div>
                        <span>{category.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{category.count}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <h3 className="font-semibold mb-4">Quick Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-mindwave-600">28</p>
                    <p className="text-sm text-muted-foreground">Sessions</p>
                  </div>
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-mindwave-600">4.2h</p>
                    <p className="text-sm text-muted-foreground">Total Time</p>
                  </div>
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-harmony-600">7</p>
                    <p className="text-sm text-muted-foreground">Day Streak</p>
                  </div>
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-harmony-600">5</p>
                    <p className="text-sm text-muted-foreground">Favorites</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-mindwave-500 to-harmony-500 rounded-xl p-6 text-white shadow-sm">
                <h3 className="font-semibold mb-4">Personalized For You</h3>
                <p className="text-white/80 mb-4">
                  Based on your mood tracking, we've created a custom meditation session to help with your current emotional state.
                </p>
                <button className="w-full py-3 rounded-lg bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm border border-white/20">
                  Start Personalized Session
                </button>
              </div>
              
              <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <h3 className="font-semibold mb-4">Meditation Benefits</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span>Reduces anxiety and stress</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span>Improves focus and concentration</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span>Enhances self-awareness and emotional regulation</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span>Promotes better sleep quality</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span>Reduces symptoms of depression</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Meditate;
