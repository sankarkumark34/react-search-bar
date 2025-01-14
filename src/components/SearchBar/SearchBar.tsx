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
    <div className="relative max-w-md mx-auto px-4">
      <div className="relative flex items-center bg-white/95 
                    rounded-[24px] shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
        <FiSearch className="absolute left-3 text-[#666666] w-4 h-4" />
        
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full py-2.5 pl-10 pr-10 text-[14px] text-gray-800
                   rounded-[24px] outline-none bg-transparent
                   placeholder:text-[#666666]"
          placeholder="Search..."
        />

        <button
          onClick={isListening ? stopListening : startListening}
          className="absolute right-3 p-1 text-[#666666]"
        >
          <FiMic className={`w-4 h-4 ${isListening ? 'text-red-500' : ''}`} />
        </button>
      </div>
    </div>
  );
}; 