
import Header from '../components/Header';
import MoodTracker from '../components/MoodTracker';
import Footer from '../components/Footer';
import { BarChart, PieChart, Calendar, ListTodo, Brain } from 'lucide-react';
import { 
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Sample data for illustration
const weeklyData = [
  { name: 'Mon', anxiety: 7, depression: 5, stress: 8 },
  { name: 'Tue', anxiety: 6, depression: 4, stress: 7 },
  { name: 'Wed', anxiety: 4, depression: 3, stress: 5 },
  { name: 'Thu', anxiety: 5, depression: 3, stress: 4 },
  { name: 'Fri', anxiety: 3, depression: 2, stress: 3 },
  { name: 'Sat', anxiety: 2, depression: 1, stress: 2 },
  { name: 'Sun', anxiety: 3, depression: 2, stress: 3 },
];

const moodFactors = [
  { factor: 'Sleep quality', score: 8 },
  { factor: 'Exercise', score: 6 },
  { factor: 'Social interaction', score: 7 },
  { factor: 'Work stress', score: 4 },
  { factor: 'Diet quality', score: 5 },
];

const Mood = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="container max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-3xl font-bold mb-2">Mood Tracking</h1>
              <p className="text-muted-foreground mb-6">
                Monitor your emotional wellbeing and receive AI-powered insights to improve mental health.
              </p>
              
              <MoodTracker />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold flex items-center">
                      <BarChart className="h-5 w-5 text-mindwave-500 mr-2" />
                      <span>Emotional Factor Analysis</span>
                    </h3>
                    <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      View all
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {moodFactors.map((item) => (
                      <div key={item.factor}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm">{item.factor}</span>
                          <span className="text-sm font-medium">{item.score}/10</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-mindwave-500 rounded-full" 
                            style={{ width: `${item.score * 10}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold flex items-center">
                      <Brain className="h-5 w-5 text-mindwave-500 mr-2" />
                      <span>Weekly Emotional Trends</span>
                    </h3>
                    <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Change metrics
                    </button>
                  </div>
                  
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        width={500}
                        height={300}
                        data={weeklyData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 0,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            border: 'none',
                          }}
                        />
                        <Bar dataKey="anxiety" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="depression" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="stress" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <h3 className="font-semibold flex items-center mb-4">
                  <Calendar className="h-5 w-5 mr-2 text-mindwave-500" />
                  <span>Monthly Overview</span>
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Average mood</span>
                      <span className="font-medium text-green-500">7.2/10</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '72%' }} />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Anxiety levels</span>
                      <span className="font-medium text-amber-500">4.3/10</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: '43%' }} />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Stress levels</span>
                      <span className="font-medium text-red-500">5.7/10</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 rounded-full" style={{ width: '57%' }} />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Sleep quality</span>
                      <span className="font-medium text-mindwave-500">6.8/10</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-mindwave-500 rounded-full" style={{ width: '68%' }} />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <h3 className="font-semibold flex items-center mb-4">
                  <PieChart className="h-5 w-5 mr-2 text-mindwave-500" />
                  <span>Emotion Distribution</span>
                </h3>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {[
                    { label: 'Joy', count: 12, color: 'bg-green-100 text-green-700' },
                    { label: 'Calm', count: 8, color: 'bg-blue-100 text-blue-700' },
                    { label: 'Anxiety', count: 5, color: 'bg-amber-100 text-amber-700' },
                    { label: 'Stress', count: 7, color: 'bg-red-100 text-red-700' },
                    { label: 'Tired', count: 4, color: 'bg-gray-100 text-gray-700' },
                    { label: 'Energetic', count: 3, color: 'bg-purple-100 text-purple-700' },
                  ].map((emotion) => (
                    <div 
                      key={emotion.label}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${emotion.color}`}
                    >
                      {emotion.label} ({emotion.count})
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-center items-center h-40">
                  <div className="w-32 h-32 rounded-full border-8 border-mindwave-100 flex items-center justify-center relative">
                    <div className="w-24 h-24 rounded-full border-8 border-harmony-100 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-xl font-semibold">64%</p>
                        <p className="text-xs text-muted-foreground">Positive</p>
                      </div>
                    </div>
                    <div className="absolute top-0 right-0 w-12 h-12 rounded-full bg-mindwave-500 border-4 border-white flex items-center justify-center text-white text-xs font-medium">
                      36%
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <h3 className="font-semibold flex items-center mb-4">
                  <ListTodo className="h-5 w-5 mr-2 text-mindwave-500" />
                  <span>AI Recommendations</span>
                </h3>
                
                <div className="space-y-3">
                  {[
                    "Try a 10-minute mindfulness meditation in the morning",
                    "Incorporate a 30-minute walk outside each day",
                    "Limit screen time before bed to improve sleep quality",
                    "Practice gratitude journaling before bedtime",
                    "Schedule regular social interactions to boost mood"
                  ].map((recommendation, index) => (
                    <div key={index} className="flex items-start p-2 rounded-lg hover:bg-muted transition-colors">
                      <div className="w-5 h-5 rounded-full bg-harmony-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <span className="text-xs font-medium text-harmony-700">{index + 1}</span>
                      </div>
                      <p className="text-sm">{recommendation}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Mood;
