
import Header from '../components/Header';
import JournalEntry from '../components/JournalEntry';
import Footer from '../components/Footer';
import { Book, Calendar, Clock, ArrowLeft, ArrowRight } from 'lucide-react';

const Journal = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="container max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-3xl font-bold mb-2">Reflection Journal</h1>
              <p className="text-muted-foreground mb-6">
                Write about your thoughts and feelings to track your emotional wellbeing.
              </p>
              
              <JournalEntry />
            </div>
            
            <div className="space-y-6">
              <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <h3 className="font-semibold flex items-center mb-4">
                  <Calendar className="h-5 w-5 mr-2 text-mindwave-500" />
                  <span>Journal Calendar</span>
                </h3>
                
                <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
                  <span className="text-muted-foreground">Su</span>
                  <span className="text-muted-foreground">Mo</span>
                  <span className="text-muted-foreground">Tu</span>
                  <span className="text-muted-foreground">We</span>
                  <span className="text-muted-foreground">Th</span>
                  <span className="text-muted-foreground">Fr</span>
                  <span className="text-muted-foreground">Sa</span>
                </div>
                
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {Array.from({ length: 30 }).map((_, index) => {
                    // Randomly assign some days as having entries
                    const hasEntry = Math.random() > 0.6;
                    const isCurrent = index === 15;
                    
                    return (
                      <button 
                        key={index} 
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                          isCurrent
                            ? 'bg-mindwave-500 text-white'
                            : hasEntry
                              ? 'bg-mindwave-100 text-mindwave-700'
                              : 'hover:bg-muted'
                        }`}
                      >
                        {index + 1}
                      </button>
                    );
                  })}
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <button className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    <span>April</span>
                  </button>
                  <span className="font-medium">May 2023</span>
                  <button className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
                    <span>June</span>
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
              
              <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <h3 className="font-semibold flex items-center mb-4">
                  <Book className="h-5 w-5 mr-2 text-mindwave-500" />
                  <span>Journal Stats</span>
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Entries this month</span>
                      <span className="font-medium">12</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-mindwave-500 rounded-full" style={{ width: '40%' }} />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Current streak</span>
                      <span className="font-medium">5 days</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-harmony-500 rounded-full" style={{ width: '60%' }} />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Mood trend</span>
                      <span className="font-medium text-green-500">Improving</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '75%' }} />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <h3 className="font-semibold flex items-center mb-4">
                  <Clock className="h-5 w-5 mr-2 text-mindwave-500" />
                  <span>Recent Entries</span>
                </h3>
                
                <div className="space-y-3">
                  {['Yesterday', '2 days ago', '4 days ago'].map((day, index) => (
                    <div key={index} className="flex items-center p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                      <div className={`w-3 h-3 rounded-full mr-3 ${
                        index === 0 ? 'bg-green-500' : index === 1 ? 'bg-amber-500' : 'bg-red-500'
                      }`} />
                      <div>
                        <p className="text-sm font-medium">{day}</p>
                        <p className="text-xs text-muted-foreground">
                          {index === 0 
                            ? 'Feeling grateful today...' 
                            : index === 1 
                              ? 'Mixed emotions about work...' 
                              : 'Struggling with anxiety...'}
                        </p>
                      </div>
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

export default Journal;
