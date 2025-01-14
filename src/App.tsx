import { SearchProvider } from './context/SearchContext';
import { SearchBar } from './components/SearchBar/SearchBar';

function App() {
  return (
    <SearchProvider>
      <div className="min-h-screen bg-gray-100 p-4">
        <SearchBar />
      </div>
    </SearchProvider>
  );
}

export default App;
