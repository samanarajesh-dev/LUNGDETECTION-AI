import React from 'react';
import { Activity } from 'lucide-react';

export default function MessageBubble({ message, isUser }) {
  if (isUser) {
    return (
      <div className="flex w-full justify-end mb-6">
        <div className="bg-brand-blue text-white px-5 py-3.5 rounded-[20px] rounded-br-[4px] max-w-[85%] text-[15px] leading-[1.6]">
          {message}
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full mb-6">
      <div className="w-8 h-8 rounded-full bg-brand-teal flex items-center justify-center shrink-0 mr-4 mt-1">
        <Activity size={16} className="text-white" />
      </div>
      <div className="bg-transparent text-text-primary py-1.5 max-w-[85%] text-[15px] leading-[1.6]">
        {message}
      </div>
    </div>
  );
}
