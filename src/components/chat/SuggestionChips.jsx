import React from 'react';

export default function SuggestionChips({ onSelect }) {
  const chips = [
    "Check my symptoms",
    "Analyze my cough",
    "Breathing exercise",
    "Find a doctor",
    "My medications",
    "Latest scan results"
  ];

  return (
    <div className="flex flex-wrap gap-2 justify-center mt-6 w-full max-w-[800px] mx-auto">
      {chips.map((chip, index) => (
        <button
          key={index}
          onClick={() => onSelect(chip)}
          className="bg-card border border-border-subtle rounded-full px-4 py-2 text-[13px] text-text-secondary hover:bg-hover hover:text-text-primary transition-all duration-200"
        >
          {chip}
        </button>
      ))}
    </div>
  );
}
