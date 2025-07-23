import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

interface SearchBarProps {
  className?: string;
  variant?: 'default' | 'large';
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  className = '',
  variant = 'default',
  placeholder = 'Buscar películas...'
}) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className={`
          bg-gray-800/80 text-white rounded-full px-4 focus:outline-none focus:ring-1 focus:ring-red-500
          ${variant === 'large' ? 'py-3 text-base w-full' : 'py-2 text-sm w-48 focus:w-64 transition-all duration-300'}
        `}
      />
      <button
        type="submit"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
        aria-label="Buscar"
      >
        <FaSearch size={variant === 'large' ? 18 : 14} />
      </button>
    </form>
  );
};

export default SearchBar;
