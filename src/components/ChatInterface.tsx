
import { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Sparkles, MicIcon, XCircle } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI mental health companion. How are you feeling today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sample AI responses for demo
  const aiResponses = [
    "I understand that can be challenging. Would you like to explore some coping strategies?",
    "Thank you for sharing that with me. How long have you been feeling this way?",
    "That's great to hear! What positive things have happened recently?",
    "It sounds like you're going through a difficult time. Remember to be kind to yourself.",
    "Have you tried any mindfulness exercises when you feel this way?",
    "I'm here to support you. Would you like to talk more about these feelings?",
    "That's a common feeling. Many people experience similar emotions. Would journaling about it help?",
    "Let's try a quick breathing exercise. Take a deep breath in for 4 counts, hold for 7, and exhale for 8."
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate AI thinking and responding
    setTimeout(() => {
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In a real app, this would handle speech-to-text functionality
  };

  return (
    <div className="h-full flex flex-col rounded-xl shadow-sm border border-border overflow-hidden bg-card relative">
      {/* Chat header */}
      <div className="p-4 border-b border-border flex items-center">
        <div className="w-10 h-10 rounded-full bg-mindwave-100 flex items-center justify-center">
          <Sparkles className="h-5 w-5 text-mindwave-600" />
        </div>
        <div className="ml-3">
          <h3 className="font-medium">MindWave AI</h3>
          <p className="text-xs text-muted-foreground">Your mental health companion</p>
        </div>
      </div>
      
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-start max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.sender === 'user' 
                  ? 'bg-mindwave-100 ml-2' 
                  : 'bg-muted mr-2'
              }`}>
                {message.sender === 'user' 
                  ? <User className="h-4 w-4 text-mindwave-600" /> 
                  : <Bot className="h-4 w-4 text-muted-foreground" />
                }
              </div>
              <div className={`chat-bubble ${
                message.sender === 'user' 
                  ? 'chat-bubble-user' 
                  : 'chat-bubble-ai'
              }`}>
                <p>{message.text}</p>
                <span className="text-xs opacity-70 block mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start max-w-[80%]">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mr-2">
                <Bot className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="chat-bubble chat-bubble-ai">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area */}
      <div className="p-4 border-t border-border">
        <div className="relative flex items-center">
          <button 
            onClick={toggleRecording}
            className={`flex-shrink-0 p-2 rounded-full mr-2 transition-colors ${
              isRecording 
              ? 'bg-red-100 text-red-500 animate-pulse' 
              : 'hover:bg-muted'
            }`}
          >
            {isRecording ? <XCircle className="h-5 w-5" /> : <MicIcon className="h-5 w-5" />}
          </button>
          
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 p-3 rounded-full border border-input bg-background focus:outline-none focus:ring-2 focus:ring-mindwave-500 transition-all"
          />
          
          <button
            onClick={handleSendMessage}
            disabled={!input.trim()}
            className="flex-shrink-0 p-2 rounded-full ml-2 bg-mindwave-500 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-mindwave-600 transition-colors"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
