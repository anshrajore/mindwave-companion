
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CalendarIcon } from 'lucide-react';

// Sample data for demo
const moodData = [
  { day: 'Mon', mood: 3, stress: 7, energy: 4 },
  { day: 'Tue', mood: 5, stress: 5, energy: 6 },
  { day: 'Wed', mood: 7, stress: 3, energy: 8 },
  { day: 'Thu', mood: 6, stress: 4, energy: 7 },
  { day: 'Fri', mood: 8, stress: 2, energy: 9 },
  { day: 'Sat', mood: 9, stress: 1, energy: 8 },
  { day: 'Sun', mood: 7, stress: 3, energy: 6 },
];

const moodLabels = [
  { value: 1, label: 'Very Low', color: '#e11d48' },
  { value: 3, label: 'Low', color: '#fb923c' },
  { value: 5, label: 'Moderate', color: '#facc15' },
  { value: 7, label: 'Good', color: '#22c55e' },
  { value: 10, label: 'Excellent', color: '#0ea5e9' },
];

const getMoodColor = (value: number) => {
  if (value <= 2) return '#e11d48';
  if (value <= 4) return '#fb923c';
  if (value <= 6) return '#facc15';
  if (value <= 8) return '#22c55e';
  return '#0ea5e9';
};

const MoodTracker = () => {
  const [selectedMetric, setSelectedMetric] = useState<'mood' | 'stress' | 'energy'>('mood');

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
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={moodData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" />
              <YAxis domain={[0, 10]} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  border: 'none',
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
        
        {/* AI Insight */}
        <div className="mt-6 p-4 border border-mindwave-200 bg-mindwave-50 rounded-lg">
          <div className="flex items-start">
            <div className="w-8 h-8 rounded-full bg-mindwave-100 flex items-center justify-center mr-3 flex-shrink-0">
              <CalendarIcon className="h-4 w-4 text-mindwave-600" />
            </div>
            <div>
              <h4 className="font-medium mb-1">AI Insight</h4>
              <p className="text-sm text-muted-foreground">
                Your mood has been improving steadily over the week. The decrease in stress levels suggests your coping strategies are working well.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;
