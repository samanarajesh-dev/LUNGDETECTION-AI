import React, { useState } from 'react';
import ChatInput from '../components/chat/ChatInput';
import MessageBubble from '../components/chat/MessageBubble';
import SuggestionChips from '../components/chat/SuggestionChips';

export default function Chat() {
  const [messages, setMessages] = useState([]);

  const handleSend = (text) => {
    // Add user message
    const newMessages = [...messages, { id: Date.now(), text, isUser: true }];
    setMessages(newMessages);

    // Simulate AI response
    setTimeout(() => {
      setMessages([...newMessages, { 
        id: Date.now() + 1, 
        text: "I'm analyzing your request. Based on your recent data, your lungs are doing well. Is there a specific symptom you're concerned about today?", 
        isUser: false 
      }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full animate-fade-in relative min-h-[calc(100vh-64px)]">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto pb-40 scrollbar-none flex flex-col">
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center -mt-20">
            <h1 className="text-[26px] font-medium text-text-primary tracking-tight mb-8">
              Hey, nice to see you. What's new?
            </h1>
          </div>
        ) : (
          <div className="flex-1 flex flex-col justify-end max-w-[800px] mx-auto w-full pt-8">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg.text} isUser={msg.isUser} />
            ))}
          </div>
        )}
      </div>

      {/* Input Area - Fixed at bottom */}
      <div className="absolute bottom-4 left-0 w-full bg-gradient-to-t from-primary via-primary to-transparent pt-8 pb-4">
        <ChatInput onSend={handleSend} />
        {messages.length === 0 && <SuggestionChips onSelect={handleSend} />}
      </div>
    </div>
  );
}
