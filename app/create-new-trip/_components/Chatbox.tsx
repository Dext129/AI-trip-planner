import { Button } from '@/components/ui/button'
import React, { useState, useRef, useEffect } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Send, Loader2, Trash2 } from 'lucide-react'
import axios from 'axios'

type Message = {
    role: string;
    content: string;
}

interface ChatboxProps {
    onLocationExtract?: (location: string) => void;
}

function Chatbox({ onLocationExtract }: ChatboxProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [userInput, setUserInput] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const extractLocation = (text: string) => {
        const locationPatterns = [
            /(?:to|in|visit|trip to|plan.*?to)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/i,
            /([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+(?:trip|travel|vacation)/i,
        ];
        
        for (const pattern of locationPatterns) {
            const match = text.match(pattern);
            if (match && match[1]) {
                return match[1];
            }
        }
        return null;
    };

    const onSend = async () => {
        if (!userInput?.trim()) return;

        const newMsg: Message = {
            role: 'user',
            content: userInput
        };

        const updatedMessages = [...messages, newMsg];
        setMessages(updatedMessages);
        setUserInput('');
        setIsLoading(true);

        // Extract location from user input
        const location = extractLocation(userInput);
        if (location && onLocationExtract) {
            onLocationExtract(location);
        }

        try {
            const result = await axios.post('/api/aimodel', {
                messages: updatedMessages
            });

            if (result.data.success) {
                setMessages([...updatedMessages, result.data.message]);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessages([...updatedMessages, {
                role: 'assistant',
                content: 'Sorry, I encountered an error. Please try again.'
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSend();
        }
    };

    const clearChat = () => {
        setMessages([]);
    };

    return (
        <div className='h-[85vh] flex flex-col border dark:border-gray-700 rounded-xl shadow-sm bg-white dark:bg-gray-800'>
            {/* Header */}
            <div className='flex items-center justify-between p-4 border-b dark:border-gray-700'>
                <div>
                    <h2 className='text-xl font-semibold dark:text-white'>Trip Planner Assistant</h2>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>Ask me anything about your trip</p>
                </div>
                {messages.length > 0 && (
                    <Button 
                        variant="ghost" 
                        size="icon-sm" 
                        onClick={clearChat}
                        title="Clear chat"
                    >
                        <Trash2 className='h-4 w-4' />
                    </Button>
                )}
            </div>

            {/* Display messages */}
            <section className='flex-1 overflow-y-auto p-4 space-y-4'>
                {messages.length === 0 ? (
                    <div className='flex items-center justify-center h-full text-gray-400 dark:text-gray-500'>
                        <div className='text-center'>
                            <p className='text-lg mb-2'>Start planning your trip!</p>
                            <p className='text-sm'>Try: "Plan a 5-day trip to Paris"</p>
                        </div>
                    </div>
                ) : (
                    messages.map((msg, index) => (
                        <div 
                            key={index} 
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div 
                                className={`max-w-[80%] px-4 py-2 rounded-lg ${
                                    msg.role === 'user' 
                                        ? 'bg-primary text-white' 
                                        : 'bg-gray-100 dark:bg-gray-700 text-black dark:text-white'
                                }`}
                            >
                                <p className='whitespace-pre-wrap'>{msg.content}</p>
                            </div>
                        </div>
                    ))
                )}
                {isLoading && (
                    <div className='flex justify-start'>
                        <div className='bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 dark:text-white'>
                            <Loader2 className='h-4 w-4 animate-spin' />
                            <span>Thinking...</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </section>

            {/* User input */}
            <section className='p-4 border-t dark:border-gray-700'>
                <div className="border dark:border-gray-700 rounded-2xl p-4 relative bg-gray-50 dark:bg-gray-900">
                    <Textarea 
                        placeholder="Ask about destinations, activities, or create your trip plan..."
                        className="w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none dark:text-white dark:placeholder:text-gray-500"
                        onChange={(event) => setUserInput(event.target.value)}
                        onKeyDown={handleKeyPress}
                        value={userInput}
                        disabled={isLoading}
                    />
                    <Button 
                        size={'icon'} 
                        className='absolute bottom-6 right-6' 
                        onClick={onSend}
                        disabled={isLoading || !userInput?.trim()}
                    >
                        {isLoading ? (
                            <Loader2 className='h-4 w-4 animate-spin' />
                        ) : (
                            <Send className='h-4 w-4' />
                        )}
                    </Button>
                </div>
            </section>
        </div>
    )
}

export default Chatbox