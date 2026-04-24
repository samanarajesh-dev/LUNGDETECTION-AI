import React from 'react';
import Sidebar from './Sidebar';

export default function PageWrapper({ children }) {
  return (
    <div className="min-h-screen bg-primary text-text-primary flex">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-[240px] flex flex-col">
        <div className="flex-1 max-w-[1200px] w-full mx-auto px-4 md:px-8 py-8">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Nav will be added here later */}
    </div>
  );
}
