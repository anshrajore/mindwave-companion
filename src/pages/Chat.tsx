
import Header from '../components/Header';
import ChatInterface from '../components/ChatInterface';
import Footer from '../components/Footer';

const Chat = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="container max-w-7xl mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">AI Therapy Companion</h1>
              <p className="text-muted-foreground">
                Chat with our AI companion for emotional support, therapeutic conversations, and mental health guidance.
              </p>
            </div>
            
            <div className="h-[600px]">
              <ChatInterface />
            </div>
            
            <div className="mt-8 bg-muted rounded-lg p-6">
              <h3 className="font-semibold mb-2">About this AI Companion</h3>
              <p className="text-sm text-muted-foreground mb-4">
                This AI mental health companion is designed to provide emotional support and guidance. 
                While it can offer helpful insights and coping strategies, it's important to remember:
              </p>
              <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                <li>This is not a replacement for professional mental health care</li>
                <li>In case of crisis or emergency, please contact a mental health professional</li>
                <li>Your conversations are kept private and secure</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Chat;
