import React from 'react';
import { SearchBar } from './SearchBar/SearchBar';

export const Demo: React.FC = () => {
  const handleSearch = async (query: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Searching for:', query);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 
                    p-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl">
        <SearchBar 
          onSearch={handleSearch}
          placeholder="Search anything..."
        />
      </div>
    </div>
  );
}; 