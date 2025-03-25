
import { useState } from 'react';
import { Smile, Frown, Meh, Save, Calendar, Clock, Lightbulb } from 'lucide-react';

const JournalEntry = () => {
  const [entry, setEntry] = useState('');
  const [mood, setMood] = useState<'positive' | 'neutral' | 'negative' | null>(null);
  const [wordCount, setWordCount] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setEntry(text);
    setWordCount(text.trim() === '' ? 0 : text.trim().split(/\s+/).length);
    setIsSaved(false);
  };
  
  const handleMoodSelect = (selectedMood: 'positive' | 'neutral' | 'negative') => {
    setMood(selectedMood);
    setIsSaved(false);
  };
  
  const handleSave = () => {
    // In a real app, this would save to a database
    setIsSaved(true);
    
    setTimeout(() => {
      setIsSaved(false);
    }, 3000);
  };
  
  const getAIPrompt = () => {
    const prompts = [
      "How did you handle challenges today?",
      "What made you smile today?",
      "Describe a moment when you felt proud of yourself.",
      "What are you grateful for right now?",
      "How would you like tomorrow to be different?",
      "What self-care activity can you plan for tomorrow?",
      "What's something you learned today?"
    ];
    
    return prompts[Math.floor(Math.random() * prompts.length)];
  };

  return (
    <div className="rounded-xl shadow-sm border border-border overflow-hidden bg-card">
      <div className="p-6 border-b border-border">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Today's Journal</h3>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        {/* Writing prompt */}
        <div className="mb-6 p-4 bg-muted rounded-lg flex items-start">
          <Lightbulb className="h-5 w-5 text-harmony-600 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-sm mb-1">Writing Prompt</h4>
            <p className="text-muted-foreground text-sm">{getAIPrompt()}</p>
          </div>
        </div>
        
        {/* Journal entry area */}
        <div className="mb-6">
          <textarea
            value={entry}
            onChange={handleTextChange}
            placeholder="Write your thoughts here..."
            className="w-full h-48 p-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-mindwave-500 transition-all resize-none"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>{wordCount} words</span>
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              <span>~{Math.ceil(wordCount / 200)} min read</span>
            </div>
          </div>
        </div>
        
        {/* Mood selection */}
        <div className="mb-6">
          <h4 className="font-medium mb-3">How are you feeling?</h4>
          <div className="flex space-x-4">
            <button
              className={`flex-1 py-3 rounded-lg border ${
                mood === 'positive'
                  ? 'bg-green-50 border-green-200 text-green-600'
                  : 'border-border hover:bg-muted transition-colors'
              } flex items-center justify-center`}
              onClick={() => handleMoodSelect('positive')}
            >
              <Smile className={`h-5 w-5 ${mood === 'positive' ? 'text-green-500' : ''} mr-2`} />
              <span>Positive</span>
            </button>
            
            <button
              className={`flex-1 py-3 rounded-lg border ${
                mood === 'neutral'
                  ? 'bg-amber-50 border-amber-200 text-amber-600'
                  : 'border-border hover:bg-muted transition-colors'
              } flex items-center justify-center`}
              onClick={() => handleMoodSelect('neutral')}
            >
              <Meh className={`h-5 w-5 ${mood === 'neutral' ? 'text-amber-500' : ''} mr-2`} />
              <span>Neutral</span>
            </button>
            
            <button
              className={`flex-1 py-3 rounded-lg border ${
                mood === 'negative'
                  ? 'bg-red-50 border-red-200 text-red-600'
                  : 'border-border hover:bg-muted transition-colors'
              } flex items-center justify-center`}
              onClick={() => handleMoodSelect('negative')}
            >
              <Frown className={`h-5 w-5 ${mood === 'negative' ? 'text-red-500' : ''} mr-2`} />
              <span>Negative</span>
            </button>
          </div>
        </div>
        
        {/* Save button */}
        <button
          onClick={handleSave}
          disabled={!entry.trim() || !mood}
          className={`w-full py-3 rounded-lg ${
            entry.trim() && mood
              ? 'bg-mindwave-500 text-white hover:bg-mindwave-600'
              : 'bg-muted-foreground/20 text-muted-foreground cursor-not-allowed'
          } transition-colors flex items-center justify-center`}
        >
          <Save className="h-5 w-5 mr-2" />
          <span>{isSaved ? 'Saved!' : 'Save Entry'}</span>
        </button>
        
        {/* AI sentiment analysis would go here in a real application */}
      </div>
    </div>
  );
};

export default JournalEntry;
