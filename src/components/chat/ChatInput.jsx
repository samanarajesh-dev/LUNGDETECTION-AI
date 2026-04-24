import React, { useState } from 'react';
import { Plus, Mic, Send, ChevronDown } from 'lucide-react';

export default function ChatInput({ onSend }) {
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSend(text);
      setText('');
    }
  };

  return (
    <div className="w-full max-w-[800px] mx-auto">
      <form 
        onSubmit={handleSubmit}
        className={`relative bg-input border transition-all duration-200 flex flex-col rounded-[24px] overflow-hidden ${
          isFocused ? 'border-border-focus shadow-[0_0_0_3px_rgba(96,165,250,0.15)]' : 'border-border-subtle'
        }`}
      >
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Ask me anything about your lung health..."
          className="w-full bg-transparent text-text-primary text-[15px] p-5 pb-12 resize-none outline-none placeholder:text-text-muted min-h-[100px]"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        
        {/* Bottom Action Row inside the input */}
        <div className="absolute left-0 bottom-0 w-full p-2.5 flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-2">
            <button type="button" className="p-2 text-text-secondary hover:text-text-primary hover:bg-hover rounded-full transition-colors">
              <Plus size={20} />
            </button>
            <button type="button" className="flex items-center text-[13px] font-medium text-text-secondary hover:text-text-primary hover:bg-hover px-3 py-1.5 rounded-full transition-colors">
              Smart <ChevronDown size={14} className="ml-1" />
            </button>
          </div>
          
          <button 
            type={text.trim() ? "submit" : "button"}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              text.trim() 
                ? 'bg-brand-blue text-white hover:bg-blue-600' 
                : 'bg-transparent text-text-secondary hover:bg-hover hover:text-text-primary'
            }`}
          >
            {text.trim() ? <Send size={16} className="ml-0.5" /> : <Mic size={18} />}
          </button>
        </div>
      </form>
    </div>
  );
}
