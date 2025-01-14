import React, { useState, useRef } from 'react';
import { FiSearch, FiMic, FiLoader } from 'react-icons/fi';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Search for app &...'
}) => {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Voice search is not supported in your browser');
      return;
    }

    recognitionRef.current = new webkitSpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;

    recognitionRef.current.onstart = () => {
      setIsListening(true);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      handleSearch(transcript);
    };

    recognitionRef.current.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleSearch = async (searchQuery: string) => {
    setIsLoading(true);
    await onSearch(searchQuery);
    setIsLoading(false);
  };

  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="relative flex items-center bg-white/95 
                    rounded-full shadow-[0_1px_4px_rgba(0,0,0,0.1)]">
        <div className="absolute left-4 text-[#5f6368]">
          {isLoading ? (
            <FiLoader className="w-5 h-5 animate-spin" />
          ) : (
            <FiSearch className="w-5 h-5" />
          )}
        </div>
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch(query);
            }
          }}
          className="w-full py-3.5 pl-12 pr-12 text-[16px] text-[#3c4043]
                   rounded-full outline-none bg-transparent
                   placeholder:text-[#5f6368]"
          placeholder={placeholder}
        />

        <button
          onClick={isListening ? stopListening : startListening}
          className={`absolute right-4 p-1.5 transition-colors duration-200 ${
            isListening 
              ? 'text-red-500' 
              : 'text-[#5f6368] hover:text-[#3c4043]'
          }`}
        >
          <FiMic className="w-5 h-5" />
        </button>
      </div>
      
      {isListening && (
        <div className="absolute mt-4 w-full text-center text-white text-sm">
          Listening... Speak now
        </div>
      )}
    </div>
  );
}; 