import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '@/utils';
import { toast } from 'react-hot-toast';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

interface ChatProps {
    title?: string;
    assistantName?: string;
    initialMessages?: Array<{ role: 'user' | 'assistant', content: string }>;
    accentColor?: string;
}

export const Chat: React.FC<ChatProps> = ({
    title = 'AI Assistant',
    assistantName = 'Tambo AI',
    initialMessages = [],
    accentColor = 'indigo'
}) => {
    const [messages, setMessages] = useState<Message[]>(() =>
        initialMessages.length > 0
            ? initialMessages.map(m => ({ ...m, id: Math.random().toString(36), timestamp: new Date() }))
            : [
                {
                    id: 'welcome',
                    role: 'assistant',
                    content: `Hello! I'm ${assistantName}. How can I help you today?`,
                    timestamp: new Date()
                }
            ]
    );
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: inputValue,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);
        toast.success('Message sent!');

        // Simulate AI response
        setTimeout(() => {
            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: `I received your message: "${userMsg.content}". This is a simulated response from the generated Chat component.`,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiMsg]);
            setIsTyping(false);
        }, 1500);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex flex-col h-[600px] w-full bg-[#0f111a] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative">
            {/* Header */}
            <div className="p-4 border-b border-slate-800 bg-[#1a1c2e]/50 backdrop-blur-md flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-${accentColor}-500/20 text-${accentColor}-400`}>
                    <Sparkles className="w-5 h-5" />
                </div>
                <div>
                    <h3 className="text-slate-100 font-semibold text-sm">{title}</h3>
                    <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs text-slate-400">Online</span>
                    </div>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[#0f111a]">
                {messages.map((msg) => (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={msg.id}
                        className={cn(
                            "flex items-start gap-3 max-w-[85%]",
                            msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
                        )}
                    >
                        <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                            msg.role === 'user'
                                ? "bg-slate-700 text-slate-200"
                                : `bg-${accentColor}-600/20 text-${accentColor}-400`
                        )}>
                            {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                        </div>

                        <div className={cn(
                            "rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                            msg.role === 'user'
                                ? "bg-[#6366f1] text-white"
                                : "bg-slate-800/80 text-slate-200 border border-slate-700/50"
                        )}>
                            {msg.content}
                            <span className="block text-[10px] opacity-50 mt-1">
                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    </motion.div>
                ))}

                {isTyping && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2 text-slate-500 text-xs ml-12"
                    >
                        <div className="flex gap-1">
                            <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                            <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                            <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" />
                        </div>
                        {assistantName} is typing...
                    </motion.div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-[#1a1c2e]/30 border-t border-slate-800">
                <div className="relative flex items-center gap-2">
                    <textarea
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type a message..."
                        className="w-full bg-[#0a0a0f] text-slate-200 text-sm rounded-xl py-3 pl-4 pr-12 border border-slate-800 focus:border-[#6366f1] focus:ring-1 focus:ring-[#6366f1] resize-none h-[50px] custom-scrollbar focus:outline-none placeholder:text-slate-600"
                    />
                    <Button
                        size="sm"
                        variant="primary"
                        onClick={handleSend}
                        disabled={!inputValue.trim()}
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 rounded-lg hover:bg-[#4f46e5]"
                    >
                        <Send className="w-4 h-4" />
                    </Button>
                </div>
                <div className="text-center mt-2">
                    <span className="text-[10px] text-slate-600">Press Enter to send</span>
                </div>
            </div>
        </div>
    );
};
