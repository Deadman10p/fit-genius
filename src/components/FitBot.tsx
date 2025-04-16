import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Brain, Send, User, Award, X, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { findRelevantAnswer } from '../utils/fitBotUtils';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { useColorTheme } from '@/contexts/ColorThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

type Message = {
  id: number;
  text: string | string[];
  isBot: boolean;
  timestamp: Date;
};

const FitBot = () => {
  const { onboardingData } = useOnboarding(); // Access onboarding context
  const { themeColor } = useColorTheme(); // Access theme color context
  const { t } = useLanguage(); // Access language context for translations
  const { toast } = useToast(); // Access toast notifications
  const [messages, setMessages] = useState<Message[]>([]); // Message history
  const [input, setInput] = useState(''); // User input
  const [isOpen, setIsOpen] = useState(false); // Chat toggle state
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [isThinking, setIsThinking] = useState(false); // Thinking state
  const messagesEndRef = useRef<HTMLDivElement>(null); // Reference for scrolling to the latest message

  // Generate personalized welcome message using user's name
  useEffect(() => {
    if (onboardingData.name) {
      setMessages([{
        id: 1,
        text: `${t('fitbot.welcome')}`,
        isBot: true,
        timestamp: new Date(),
      }]);
    } else {
      setMessages([{
        id: 1,
        text: t('fitbot.welcome'),
        isBot: true,
        timestamp: new Date(),
      }]);
    }
  }, [onboardingData.name, t]);

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
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setIsThinking(true);

    try {
      // Use the findRelevantAnswer function to get a response
      const botResponse = await findRelevantAnswer(input, onboardingData);

      const botReply: Message = {
        id: messages.length + 2,
        text: botResponse,
        isBot: true,
        timestamp: new Date(),
      };

      // Add a small delay to simulate "thinking"
      setTimeout(() => {
        setMessages(prev => [...prev, botReply]);
        setIsLoading(false);
        setIsThinking(false);
      }, 600);
    } catch (error) {
      console.error('Error in chat:', error);
      toast({
        title: 'Error',
        description: t('fitbot.error'),
        variant: 'destructive',
      });
      setIsLoading(false);
      setIsThinking(false);
    }
  };

  const renderMessageBubble = (message: Message) => {
    const isBot = message.isBot;

    return (
      <motion.div
        key={message.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-3`}
      >
        {isBot && (
          <div className={`flex-shrink-0 h-8 w-8 rounded-full bg-${themeColor}/20 flex items-center justify-center mr-2`}>
            <Brain size={16} className={`text-${themeColor}`} />
          </div>
        )}
        <div
          className={`max-w-[80%] px-4 py-2 rounded-xl ${
            isBot
              ? 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
              : `bg-${themeColor} text-white dark:bg-${themeColor}/90`
          }`}
        >
          {Array.isArray(message.text) ? (
            <ul>
              {message.text.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          ) : (
            <p>{message.text}</p>
          )}
          <p className="text-xs opacity-70 mt-1">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
        {!isBot && (
          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center ml-2">
            <User size={16} className="text-gray-500" />
          </div>
        )}
      </motion.div>
    );
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const getBgColor = () => {
    if (isOpen) return 'bg-red-500';
    switch (themeColor) {
      case 'gold': return 'bg-gold animate-pulse-theme';
      case 'red': return 'bg-red-500 animate-pulse-theme';
      case 'blue': return 'bg-blue-500 animate-pulse-theme';
      case 'green': return 'bg-green-500 animate-pulse-theme';
      default: return 'bg-gold animate-pulse-theme';
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-4 right-4 p-3 rounded-full shadow-lg z-50 ${getBgColor()}`}
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
          <CardHeader className={`bg-${themeColor}/10 pb-2`}>
            <CardTitle className="text-lg flex items-center">
              <Brain className={`h-5 w-5 mr-2 text-${themeColor}`} />
              {onboardingData.name ? `${onboardingData.name}'s Fitness Assistant` : t('fitbot.assistant')}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 h-80 overflow-y-auto">
            <div className="flex items-center mb-3">
              <Award className={`h-4 w-4 text-${themeColor} mr-1`} />
              <span className="text-xs text-gray-500 dark:text-gray-400">{t('fitbot.assistant')}</span>
            </div>

            <div className="space-y-2">
              {messages.map(renderMessageBubble)}
              {isThinking && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-start mb-3"
                >
                  <div className={`flex-shrink-0 h-8 w-8 rounded-full bg-${themeColor}/20 flex items-center justify-center mr-2`}>
                    <Brain size={16} className={`text-${themeColor}`} />
                  </div>
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-xl bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200`}
                  >
                    <p>...</p>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          <CardFooter className="p-2 border-t border-gray-200 dark:border-gray-700">
            <div className="flex w-full gap-2">
              <Input
                placeholder={t('fitbot.placeholder')}
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
                className={`bg-${themeColor} hover:bg-${themeColor}-dark`}
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