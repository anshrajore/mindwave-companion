
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CalendarIcon, Save, AlertCircle, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { format, subDays } from 'date-fns';

// Labels for mood scale
const moodLabels = [
  { value: 1, label: 'Very Low', color: '#e11d48' },
  { value: 3, label: 'Low', color: '#fb923c' },
  { value: 5, label: 'Moderate', color: '#facc15' },
  { value: 7, label: 'Good', color: '#22c55e' },
  { value: 10, label: 'Excellent', color: '#0ea5e9' },
];

// Helper function to get mood color based on value
const getMoodColor = (value: number) => {
  if (value <= 2) return '#e11d48';
  if (value <= 4) return '#fb923c';
  if (value <= 6) return '#facc15';
  if (value <= 8) return '#22c55e';
  return '#0ea5e9';
};

const MoodTracker = () => {
  const { toast } = useToast();
  const [selectedMetric, setSelectedMetric] = useState<'mood' | 'stress' | 'energy'>('mood');
  const [currentMood, setCurrentMood] = useState<number>(7);
  const [currentStress, setCurrentStress] = useState<number>(3);
  const [currentEnergy, setCurrentEnergy] = useState<number>(6);
  const [moodData, setMoodData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [savingMood, setSavingMood] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUserLoggedIn(!!data.session);
    };
    
    checkUser();
    
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUserLoggedIn(!!session);
    });
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Fetch mood data from Supabase
  useEffect(() => {
    const fetchMoodData = async () => {
      if (!userLoggedIn) {
        // Use sample data if user is not logged in
        const sampleData = generateSampleData();
        setMoodData(sampleData);
        return;
      }

      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('mood_entries')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(7);

        if (error) throw error;

        if (data && data.length > 0) {
          const formattedData = data.map(entry => ({
            day: format(new Date(entry.created_at), 'EEE'),
            date: format(new Date(entry.created_at), 'MMM dd'),
            mood: entry.mood_score,
            stress: entry.stress_level,
            energy: entry.energy_level,
            id: entry.id
          })).reverse();
          
          setMoodData(formattedData);
        } else {
          // Use sample data if no entries exist
          setMoodData(generateSampleData());
        }
      } catch (error) {
        console.error('Error fetching mood data:', error);
        toast({
          title: 'Error fetching mood data',
          description: 'Please try again later.',
          variant: 'destructive',
        });
        // Fallback to sample data
        setMoodData(generateSampleData());
      } finally {
        setLoading(false);
      }
    };

    fetchMoodData();
  }, [userLoggedIn, toast]);

  // Generate sample data for demonstration
  const generateSampleData = () => {
    return Array.from({ length: 7 }).map((_, index) => {
      const date = subDays(new Date(), 6 - index);
      return {
        day: format(date, 'EEE'),
        date: format(date, 'MMM dd'),
        mood: Math.floor(Math.random() * 5) + 5, // Random mood between 5-10
        stress: Math.floor(Math.random() * 5) + 1, // Random stress between 1-5
        energy: Math.floor(Math.random() * 6) + 4, // Random energy between 4-9
      };
    });
  };

  // Save current mood to Supabase
  const saveMoodEntry = async () => {
    if (!userLoggedIn) {
      toast({
        title: 'Login required',
        description: 'Please log in to save your mood entries.',
        variant: 'destructive',
      });
      return;
    }

    setSavingMood(true);
    try {
      const { data, error } = await supabase
        .from('mood_entries')
        .insert([
          {
            mood_score: currentMood,
            stress_level: currentStress,
            energy_level: currentEnergy,
          },
        ])
        .select();

      if (error) throw error;

      toast({
        title: 'Mood saved',
        description: 'Your mood entry has been recorded.',
        variant: 'default',
      });

      // Update the mood data with the new entry
      if (data && data.length > 0) {
        const newEntry = {
          day: format(new Date(), 'EEE'),
          date: format(new Date(), 'MMM dd'),
          mood: currentMood,
          stress: currentStress,
          energy: currentEnergy,
          id: data[0].id
        };
        
        // Remove oldest entry if we already have 7 entries
        const updatedData = [...moodData];
        if (updatedData.length >= 7) {
          updatedData.shift();
        }
        updatedData.push(newEntry);
        setMoodData(updatedData);
      }
    } catch (error) {
      console.error('Error saving mood:', error);
      toast({
        title: 'Error saving mood',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setSavingMood(false);
    }
  };

  // Handle slider changes for mood values
  const handleSliderChange = (value: number, type: 'mood' | 'stress' | 'energy') => {
    switch (type) {
      case 'mood':
        setCurrentMood(value);
        break;
      case 'stress':
        setCurrentStress(value);
        break;
      case 'energy':
        setCurrentEnergy(value);
        break;
    }
  };

  return (
    <div className="rounded-xl shadow-sm border border-border overflow-hidden bg-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Mood Tracker</h3>
          <button className="p-2 rounded-md hover:bg-muted transition-colors">
            <CalendarIcon className="h-5 w-5" />
          </button>
        </div>
        <p className="text-muted-foreground mt-1">Track your emotional well-being over time</p>
      </div>
      
      <div className="p-6">
        {/* Metric selector */}
        <div className="flex space-x-2 mb-6">
          <button
            className={`px-4 py-2 rounded-full text-sm ${
              selectedMetric === 'mood'
                ? 'bg-mindwave-500 text-white'
                : 'bg-muted hover:bg-muted/80 transition-colors'
            }`}
            onClick={() => setSelectedMetric('mood')}
          >
            Mood
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm ${
              selectedMetric === 'stress'
                ? 'bg-mindwave-500 text-white'
                : 'bg-muted hover:bg-muted/80 transition-colors'
            }`}
            onClick={() => setSelectedMetric('stress')}
          >
            Stress
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm ${
              selectedMetric === 'energy'
                ? 'bg-mindwave-500 text-white'
                : 'bg-muted hover:bg-muted/80 transition-colors'
            }`}
            onClick={() => setSelectedMetric('energy')}
          >
            Energy
          </button>
        </div>
        
        {/* Chart */}
        <div className="h-64 w-full">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">Loading mood data...</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={moodData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="day" 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value, index) => moodData[index]?.day || value}
                />
                <YAxis domain={[0, 10]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    border: 'none',
                  }}
                  formatter={(value, name) => [value, name === 'mood' ? 'Mood' : name === 'stress' ? 'Stress' : 'Energy']}
                  labelFormatter={(label, items) => {
                    const entry = moodData.find(entry => entry.day === label);
                    return entry?.date || label;
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey={selectedMetric} 
                  stroke={
                    selectedMetric === 'mood' 
                      ? '#0ea5e9' 
                      : selectedMetric === 'stress' 
                      ? '#e11d48' 
                      : '#22c55e'
                  }
                  strokeWidth={3}
                  activeDot={{ r: 8 }}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
        
        {/* Mood scale explanation */}
        {selectedMetric === 'mood' && (
          <div className="mt-6 bg-muted p-4 rounded-lg">
            <div className="flex justify-between items-center">
              {moodLabels.map((item) => (
                <div key={item.value} className="flex flex-col items-center">
                  <div 
                    className="w-4 h-4 rounded-full mb-1" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Current Mood Entry Section */}
        <div className="mt-6 border border-border rounded-lg p-4">
          <h4 className="font-medium mb-4">How are you feeling right now?</h4>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Mood</span>
                <span className="text-sm font-medium" style={{ color: getMoodColor(currentMood) }}>{currentMood}/10</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="10" 
                value={currentMood}
                onChange={(e) => handleSliderChange(parseInt(e.target.value), 'mood')}
                className="w-full accent-mindwave-500"
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Stress Level</span>
                <span className="text-sm font-medium" style={{ color: getMoodColor(11 - currentStress) }}>{currentStress}/10</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="10" 
                value={currentStress}
                onChange={(e) => handleSliderChange(parseInt(e.target.value), 'stress')}
                className="w-full accent-red-500"
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Energy Level</span>
                <span className="text-sm font-medium" style={{ color: getMoodColor(currentEnergy) }}>{currentEnergy}/10</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="10" 
                value={currentEnergy}
                onChange={(e) => handleSliderChange(parseInt(e.target.value), 'energy')}
                className="w-full accent-green-500"
              />
            </div>
            
            <Button 
              onClick={saveMoodEntry} 
              className="w-full"
              disabled={savingMood}
            >
              {savingMood ? (
                <>Saving... <AlertCircle className="ml-2 h-4 w-4 animate-spin" /></>
              ) : (
                <>Save Mood Entry <Save className="ml-2 h-4 w-4" /></>
              )}
            </Button>
          </div>
        </div>
        
        {/* AI Insight */}
        <div className="mt-6 p-4 border border-mindwave-200 bg-mindwave-50 rounded-lg">
          <div className="flex items-start">
            <div className="w-8 h-8 rounded-full bg-mindwave-100 flex items-center justify-center mr-3 flex-shrink-0">
              <CalendarIcon className="h-4 w-4 text-mindwave-600" />
            </div>
            <div>
              <h4 className="font-medium mb-1">AI Insight</h4>
              <p className="text-sm text-muted-foreground">
                {userLoggedIn ? 
                  'Your mood has been improving steadily over the week. The decrease in stress levels suggests your coping strategies are working well.' 
                  : 'Log in to receive personalized insights based on your mood patterns.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;
