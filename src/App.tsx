import React from 'react';
import { SearchProvider } from './context/SearchContext';
import { Demo } from './components/SearchInterface';

const App: React.FC = () => {
  return (
    <SearchProvider>
      <div className="font-sans">
        <Demo />
      </div>
    </SearchProvider>
  );
};

export default App;
