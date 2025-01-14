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
      <div className="relative flex items-center bg-white/90 backdrop-blur-md 
                    rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
        <FiSearch className="absolute left-4 text-gray-400/80 w-[18px] h-[18px]" />
        
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full py-[10px] pl-12 pr-12 text-[15px] text-gray-700
                   rounded-full outline-none bg-transparent
                   placeholder:text-gray-500/70"
          placeholder="Search..."
        />

        <button
          onClick={isListening ? stopListening : startListening}
          className="absolute right-4 p-1.5 text-gray-400/90"
        >
          <FiMic className={`w-[18px] h-[18px] ${isListening ? 'text-red-500' : ''}`} />
        </button>
      </div>
    </div>
  );
}; 