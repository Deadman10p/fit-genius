
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Brain, Send, User, Award, X } from 'lucide-react';

type Message = {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
};

// Sample bot responses for demo
const botResponses = [
  "Great job on completing your workout today! Keep up the momentum.",
  "Remember to stay hydrated throughout your workout session.",
  "For the best results, focus on proper form rather than lifting heavier weights.",
  "Don't forget to include rest days in your routine - recovery is essential for progress!",
  "Your dedication is inspiring! You're making great progress.",
  "Try to incorporate more protein into your post-workout meals for better muscle recovery.",
  "Challenge yourself with increasing your reps or weight slightly in your next session.",
  "Have you tried interval training? It's great for both fat loss and cardiovascular health.",
  "Listen to your body - if something hurts (not just burns), stop and reassess your form.",
  "Remember that consistency is more important than intensity for long-term results."
];

const FitBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! I'm your FitBot assistant. How can I help with your fitness journey today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      isBot: false,
      timestamp: new Date()
    };
    
    setMessages([...messages, userMessage]);
    setInput('');
    
    // Simulate bot thinking
    setTimeout(() => {
      // Get random response from array for demo
      const randomIndex = Math.floor(Math.random() * botResponses.length);
      const botReply: Message = {
        id: messages.length + 2,
        text: botResponses[randomIndex],
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botReply]);
    }, 1000);
  };

  const renderMessageBubble = (message: Message) => {
    const isBot = message.isBot;
    
    return (
      <div 
        key={message.id} 
        className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-3`}
      >
        {isBot && (
          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gold/20 flex items-center justify-center mr-2">
            <Brain size={16} className="text-gold" />
          </div>
        )}
        <div 
          className={`max-w-[80%] px-4 py-2 rounded-xl ${
            isBot 
              ? 'bg-gray-100 text-gray-800' 
              : 'bg-gold text-white'
          }`}
        >
          <p className="text-sm">{message.text}</p>
          <p className="text-xs opacity-70 mt-1">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
        {!isBot && (
          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center ml-2">
            <User size={16} className="text-gray-500" />
          </div>
        )}
      </div>
    );
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-4 right-4 p-3 rounded-full shadow-lg z-50 ${
          isOpen ? 'bg-red-500' : 'bg-gold animate-pulse-gold'
        }`}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <Brain className="h-6 w-6 text-white" />
        )}
      </button>
      
      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-20 right-4 w-80 md:w-96 shadow-xl z-40 animate-fade-in-up">
          <CardHeader className="bg-gold/10 pb-2">
            <CardTitle className="text-lg flex items-center">
              <Brain className="h-5 w-5 mr-2 text-gold" />
              FitBot Assistant
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 h-80 overflow-y-auto">
            <div className="flex items-center mb-3">
              <Award className="h-4 w-4 text-gold mr-1" />
              <span className="text-xs text-gray-500">FitBot has 92% satisfaction rating</span>
            </div>
            
            <div className="space-y-2">
              {messages.map(renderMessageBubble)}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          <CardFooter className="p-2 border-t border-gray-200">
            <div className="flex w-full gap-2">
              <Input
                placeholder="Ask about workout tips..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="fitness-input"
              />
              <Button 
                onClick={handleSendMessage} 
                size="icon" 
                disabled={!input.trim()}
                className="bg-gold hover:bg-gold-dark"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default FitBot;
