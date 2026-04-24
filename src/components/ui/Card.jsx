import React from 'react';

export default function Card({ title, description, icon: Icon, gradient, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="bg-card border border-border-subtle rounded-2xl p-5 cursor-pointer copilot-card-hover select-none"
    >
      <div 
        className="w-11 h-11 rounded-full flex items-center justify-center mb-4"
        style={{ background: gradient }}
      >
        {Icon && <Icon size={20} className="text-white" />}
      </div>
      <h3 className="text-[15px] font-medium text-text-primary mb-1 tracking-tight">{title}</h3>
      {description && (
        <p className="text-[13px] text-text-secondary font-normal leading-[1.6]">
          {description}
        </p>
      )}
    </div>
  );
}
