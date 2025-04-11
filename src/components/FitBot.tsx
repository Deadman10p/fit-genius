
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Brain, Send, User, Award, X, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { findRelevantAnswer } from '../utils/fitBotUtils';

type Message = {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
};

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
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

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
      id: messages.length + 1,
      text: input,
      isBot: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Get response from our local knowledge base
      const botResponse = findRelevantAnswer(input);
      
      const botReply: Message = {
        id: messages.length + 2,
        text: botResponse,
        isBot: true,
        timestamp: new Date()
      };
      
      // Add a small delay to simulate "thinking"
      setTimeout(() => {
        setMessages(prev => [...prev, botReply]);
        setIsLoading(false);
      }, 600);
      
    } catch (error) {
      console.error('Error in chat:', error);
      toast({
        title: "Error",
        description: "Something went wrong with the chat. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
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
              ? 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200' 
              : 'bg-gold text-white dark:bg-gold/90'
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
              <span className="text-xs text-gray-500 dark:text-gray-400">FitBot AI Assistant</span>
            </div>
            
            <div className="space-y-2">
              {messages.map(renderMessageBubble)}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          <CardFooter className="p-2 border-t border-gray-200 dark:border-gray-700">
            <div className="flex w-full gap-2">
              <Input
                placeholder="Ask about workout tips..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
                className="fitness-input dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"
                disabled={isLoading}
              />
              <Button 
                onClick={handleSendMessage} 
                size="icon" 
                disabled={!input.trim() || isLoading}
                className="bg-gold hover:bg-gold-dark"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default FitBot;
