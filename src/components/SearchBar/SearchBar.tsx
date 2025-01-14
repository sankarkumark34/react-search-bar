import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Search, Loader2 } from 'lucide-react';
import { useSearch } from '../../context/SearchContext';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Search...'
}) => {
  const { searchQuery, setSearchQuery, isListening, setIsListening } = useSearch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  const startListening = () => {
    try {
      if (!('webkitSpeechRecognition' in window)) {
        setError('Voice search is not supported in your browser');
        return;
      }

      // Reset any previous error
      setError(null);

      recognitionRef.current = new (window as any).webkitSpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US'; // Add language support

      recognitionRef.current.onstart = () => {
        setIsListening(true);
        console.log('Voice recognition started');
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        console.log('Voice recognition ended');
      };

      recognitionRef.current.onerror = (event: any) => {
        setError(`Error: ${event.error}`);
        setIsListening(false);
        console.error('Voice recognition error:', event);
      };

      recognitionRef.current.onresult = (event: any) => {
        try {
          const transcript = event.results[0][0].transcript;
          console.log('Transcript:', transcript);
          setSearchQuery(transcript);
          handleSearch(transcript);
        } catch (err) {
          setError('Failed to process voice input');
          console.error('Result processing error:', err);
        }
      };

      recognitionRef.current.start();
    } catch (err) {
      setError('Failed to start voice recognition');
      console.error('Start recognition error:', err);
    }
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await onSearch(searchQuery);
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative group">
        <motion.div
          className="relative flex items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute left-4 text-gray-400">
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </div>
          
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full h-12 pl-12 pr-12 bg-white/95 
                     rounded-full shadow-sm focus:outline-none 
                     focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50
                     transition-all duration-200"
          />

          <motion.button
            type="button"
            onClick={isListening ? stopListening : startListening}
            className={`absolute right-4 p-2 rounded-full transition-all 
                       duration-200 ${
              isListening 
                ? 'bg-purple-500 text-white shadow-lg' 
                : 'text-gray-400 hover:text-purple-500'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isListening ? (
              <MicOff className="w-5 h-5" />
            ) : (
              <Mic className="w-5 h-5" />
            )}
          </motion.button>
        </motion.div>
      </form>

      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 mt-3"
          >
            <div className="mx-auto max-w-md bg-white/95 backdrop-blur-sm
                          rounded-full py-2 px-4 shadow-lg
                          flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
              <span className="text-sm text-gray-600">
                Listening... Speak now
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className="absolute left-0 right-0 mt-3"
        >
          <div className="mx-auto max-w-md bg-red-50 
                        rounded-full py-2 px-4 shadow-lg
                        flex items-center justify-center text-red-500">
            {error}
          </div>
        </motion.div>
      )}
    </div>
  );
}; 