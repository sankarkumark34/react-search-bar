import React from 'react';
import { SearchBar } from './SearchBar/SearchBar';

export const Demo: React.FC = () => {
  const handleSearch = async (query: string) => {
    // Simulate search delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Searching for:', query);
  };

  return (
    <div className="min-h-screen bg-[#202124] p-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl space-y-8">
        <SearchBar 
          onSearch={handleSearch}
          placeholder="Search for app &..."
        />
      </div>
    </div>
  );
}; 