import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import APIKeyForm from '../components/APIKeyForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Home, BarChart4, BookOpen, BrainCircuit, LogOut } from 'lucide-react';
import { toast } from 'sonner';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);
  
  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    
    // Get user data
    const storedName = localStorage.getItem('userName');
    const storedEmail = localStorage.getItem('userEmail');
    const storedApiKey = localStorage.getItem('mindwave_api_key');
    
    setUserName(storedName);
    setUserEmail(storedEmail);
    setApiKey(storedApiKey);
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    // Note: We're keeping the API key for convenience
    
    toast.success("Successfully logged out");
    navigate('/');
  };
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="container max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <div className="w-full md:w-1/4">
              <div className="sticky top-24">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5 text-mindwave-500" />
                      My Profile
                    </CardTitle>
                    <CardDescription>
                      {userEmail}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/dashboard')}>
                        <Home className="h-4 w-4 mr-2" />
                        Dashboard
                      </Button>
                      <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/chat')}>
                        <BrainCircuit className="h-4 w-4 mr-2" />
                        AI Companion
                      </Button>
                      <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/journal')}>
                        <BookOpen className="h-4 w-4 mr-2" />
                        Journal
                      </Button>
                      <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/mood')}>
                        <BarChart4 className="h-4 w-4 mr-2" />
                        Mood Tracker
                      </Button>
                      <Button variant="destructive" className="w-full justify-start" onClick={handleLogout}>
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Main content */}
            <div className="w-full md:w-3/4">
              <h1 className="text-3xl font-bold mb-6">Welcome, {userName || 'User'}!</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Stats</CardTitle>
                    <CardDescription>Your activity overview</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Journal Entries</span>
                        <span className="font-medium">3</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Meditation Sessions</span>
                        <span className="font-medium">7</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Chat Conversations</span>
                        <span className="font-medium">12</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Mood Entries</span>
                        <span className="font-medium">5</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>API Settings</CardTitle>
                    <CardDescription>Manage your voice communication key</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {apiKey ? (
                      <div className="space-y-4">
                        <div className="p-3 bg-green-50 text-green-800 rounded-lg flex items-center">
                          <div className="mr-2">✓</div>
                          <div>API key is configured</div>
                        </div>
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            localStorage.removeItem('mindwave_api_key');
                            setApiKey(null);
                            toast.success("API key removed");
                          }}
                        >
                          Remove API Key
                        </Button>
                      </div>
                    ) : (
                      <APIKeyForm onSuccess={key => setApiKey(key)} />
                    )}
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest interactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-4 border-mindwave-500 pl-4 py-2">
                      <div className="font-medium">AI Chat Session</div>
                      <div className="text-sm text-muted-foreground">Discussed stress management techniques</div>
                      <div className="text-xs text-muted-foreground mt-1">Today, 2:30 PM</div>
                    </div>
                    <div className="border-l-4 border-secondary pl-4 py-2">
                      <div className="font-medium">Journal Entry</div>
                      <div className="text-sm text-muted-foreground">Reflected on daily challenges and victories</div>
                      <div className="text-xs text-muted-foreground mt-1">Yesterday, 9:15 AM</div>
                    </div>
                    <div className="border-l-4 border-amber-500 pl-4 py-2">
                      <div className="font-medium">Meditation Session</div>
                      <div className="text-sm text-muted-foreground">Completed a 15-minute mindfulness session</div>
                      <div className="text-xs text-muted-foreground mt-1">2 days ago, 7:00 PM</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
