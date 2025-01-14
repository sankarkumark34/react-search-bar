import { useState } from 'react';
import { useSearch } from '../../context/SearchContext';
import { FiSearch, FiMic } from 'react-icons/fi';

export const SearchBar = () => {
  const { searchQuery, setSearchQuery, isListening, setIsListening } = useSearch();
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

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
    <div className="relative max-w-md mx-auto">
      <div className="relative flex items-center bg-white rounded-full shadow-lg">
        <FiSearch className="absolute left-4 text-gray-400 w-5 h-5" />
        
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full py-3 pl-12 pr-12 text-gray-600 text-base rounded-full
                   outline-none bg-white/90 backdrop-blur-sm
                   placeholder:text-gray-400"
          placeholder="Search..."
        />

        <button
          onClick={isListening ? stopListening : startListening}
          className="absolute right-3 p-2 text-gray-400 hover:text-gray-600
                    transition-colors duration-200"
        >
          <FiMic className={`w-5 h-5 ${isListening ? 'text-red-500' : ''}`} />
        </button>
      </div>
    </div>
  );
}; 