
import { useState, useRef, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { AIModelSelect } from '@/components/AIModelSelect';
import { Send, RotateCcw, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const Model = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedModel, setSelectedModel] = useState('GPT-4');
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
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `This is a simulated response from ${selectedModel}. In a real implementation, this would connect to the actual AI model API to generate responses based on your message: "${userMessage.content}"`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
    toast({
      title: "Chat cleared",
      description: "All messages have been removed from the conversation.",
    });
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied to clipboard",
      description: "Message content has been copied.",
    });
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      
      {/* Main Chat Interface */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full container">
        {/* Top Controls Bar */}
        <div className="card mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <AIModelSelect 
                value={selectedModel} 
                onValueChange={setSelectedModel} 
              />
            </div>
            <Button 
              onClick={clearChat} 
              variant="ghost" 
              size="sm"
              className="btn"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear Chat
            </Button>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto mb-6">
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="card text-center py-12">
                <div className="text-6xl mb-4">🤖</div>
                <h3 className="text-xl font-semibold mb-2">Start a conversation</h3>
                <p className="text-text-1 mb-6">
                  Choose an AI model and begin chatting. Your conversation will appear here.
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`card ${
                    message.role === 'assistant' ? 'bubble' : 'bg-bg-2 border border-border'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="font-medium text-sm uppercase tracking-wide">
                      {message.role === 'user' ? 'You' : selectedModel}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyMessage(message.content)}
                        className="p-1 text-text-dim hover:text-accent"
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                      {message.role === 'assistant' && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-1 text-text-dim hover:text-success"
                          >
                            <ThumbsUp className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-1 text-text-dim hover:text-error"
                          >
                            <ThumbsDown className="w-3 h-3" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="text-text-1 leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </div>
                  <div className="text-text-dim text-xs mt-2">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              ))
            )}
            
            {isLoading && (
              <div className="card bubble">
                <div className="font-medium text-sm uppercase tracking-wide mb-2">
                  {selectedModel}
                </div>
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-accent"></div>
                  <span className="text-text-1">Thinking...</span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="card">
          <div className="flex space-x-4">
            <Textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here..."
              className="flex-1 resize-none"
              rows={3}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="btn primary self-end"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Model;
