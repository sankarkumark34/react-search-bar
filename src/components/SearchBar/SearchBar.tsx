import { useState, useEffect } from 'react';
import { useSearch } from '../../context/SearchContext';
import { FiSearch, FiMic, FiX } from 'react-icons/fi';

export const SearchBar = () => {
  const { searchQuery, setSearchQuery, isListening, setIsListening } = useSearch();
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const startListening = () => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
      };

      recognition.start();
      setRecognition(recognition);
    } else {
      alert('Voice recognition is not supported in your browser');
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  return (
    <div className="relative max-w-2xl mx-auto">
      <div className={`relative flex items-center transition-all duration-300 ${
        isFocused ? 'transform scale-105' : ''
      }`}>
        <div className={`absolute left-3 flex items-center justify-center w-10 h-10 transition-colors ${
          isFocused ? 'text-blue-500' : 'text-gray-400'
        }`}>
          <FiSearch className="w-5 h-5" />
        </div>
        
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full py-4 pl-14 pr-20 text-gray-700 text-lg border-2 rounded-full 
                   outline-none bg-white shadow-lg transition-all duration-300
                   focus:border-blue-500 focus:ring-4 focus:ring-blue-100
                   hover:shadow-xl"
          placeholder="Search for app..."
        />

        <div className="absolute right-3 flex items-center space-x-2">
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>
          )}
          
          <button
            onClick={isListening ? stopListening : startListening}
            className={`p-3 rounded-full transition-all duration-300 ${
              isListening 
                ? 'bg-red-50 text-red-500 hover:bg-red-100' 
                : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
            }`}
          >
            <FiMic className={`w-5 h-5 ${
              isListening ? 'animate-pulse' : ''
            }`} />
          </button>
        </div>
      </div>

      {/* Search suggestions dropdown */}
      {isFocused && searchQuery && (
        <div className="absolute w-full mt-2 py-2 bg-white rounded-2xl shadow-xl border">
          <div className="px-4 py-2 text-sm text-gray-500">
            Recent Searches
          </div>
          {/* Add your search suggestions here */}
        </div>
      )}
    </div>
  );
}; 