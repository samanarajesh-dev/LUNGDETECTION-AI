import React, { useState, useRef, useEffect } from 'react';
import ChatInput from '../components/chat/ChatInput';
import MessageBubble from '../components/chat/MessageBubble';
import SuggestionChips from '../components/chat/SuggestionChips';
import { Loader2 } from 'lucide-react';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (text) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg = { id: Date.now(), text, isUser: true };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await fetch('https://ai-medical-diagnosis-api-symptoms-to-results.p.rapidapi.com/analyzeSymptomsAndDiagnose?noqueue=1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-rapidapi-host': 'ai-medical-diagnosis-api-symptoms-to-results.p.rapidapi.com',
          'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY
        },
        body: JSON.stringify({
          symptoms: [text],
          patientInfo: {
            age: 35,
            gender: "male",
            height: 175,
            weight: 75,
            medicalHistory: [],
            currentMedications: [],
            allergies: [],
            lifestyle: { smoking: false, alcohol: "none", exercise: "moderate", diet: "balanced" }
          },
          lang: "en"
        })
      });

      const result = await response.json();
      
      let aiResponse = "";
      if (result.diagnosis && result.diagnosis.length > 0) {
        const topDiagnosis = result.diagnosis[0];
        aiResponse = `Based on your symptoms, the most likely diagnosis is **${topDiagnosis.name}** (Confidence: ${Math.round(topDiagnosis.probability * 100)}%). \n\n**Description:** ${topDiagnosis.description || 'No description available.'}\n\n**Recommendation:** Please consult a healthcare professional for a formal diagnosis.`;
      } else {
        aiResponse = "I've analyzed your symptoms but couldn't find a definitive match. Could you please provide more details or try rephrasing your symptoms?";
      }

      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: aiResponse, 
        isUser: false 
      }]);
    } catch (error) {
      console.error("API Error:", error);
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: "I'm having trouble connecting to my medical database. Please try again in a moment.", 
        isUser: false 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full animate-fade-in relative min-h-[calc(100vh-64px)]">
      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto pb-40 scrollbar-none flex flex-col px-4"
      >
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
            {isLoading && (
              <div className="flex items-center gap-2 p-4 text-text-secondary animate-pulse">
                <Loader2 className="animate-spin" size={16} />
                <span className="text-sm">AI Doctor is analyzing...</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input Area - Fixed at bottom */}
      <div className="absolute bottom-4 left-0 w-full bg-gradient-to-t from-primary via-primary to-transparent pt-8 pb-4">
        <ChatInput onSend={handleSend} disabled={isLoading} />
        {messages.length === 0 && <SuggestionChips onSelect={handleSend} />}
      </div>
    </div>
  );
}
