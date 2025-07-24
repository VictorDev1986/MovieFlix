import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieGrid from '../components/ui/MovieGrid';
import SearchBar from '../components/ui/SearchBar';
import omdbService from '../services/omdb';
import { type Movie } from '../services/tmdb'; // Mantenemos el tipo para compatibilidad
import { FaSearch } from 'react-icons/fa';

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const searchMovies = async () => {
      if (!query) {
        setMovies([]);
        return;
      }
      
      try {
        setLoading(true);
        setError(null);
        
        const response = await omdbService.searchMovies(query, page);
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
        
        // Scroll to top when results change
        window.scrollTo(0, 0);
      } catch (error) {
        console.error('Error searching movies:', error);
        setError('Error al buscar películas. Por favor, intenta nuevamente.');
      } finally {
        setLoading(false);
      }
    };
    
    searchMovies();
  }, [query, page]);

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Search */}
      <div className="mb-8 py-8 bg-gradient-to-r from-black to-gray-900 rounded-lg">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h1 className="text-3xl font-bold text-white mb-6">Buscar Películas</h1>
          <SearchBar 
            variant="large" 
            placeholder="Busca por título de película..." 
            className="max-w-xl mx-auto"
          />
        </div>
      </div>
      
      {/* Results or Empty State */}
      {query ? (
        <>
          <h2 className="text-xl font-semibold text-white mb-6">
            Resultados para "{query}"
          </h2>
          
          {!loading && movies.length === 0 ? (
            <div className="py-16 text-center">
              <FaSearch className="text-gray-600 text-6xl mx-auto mb-4" />
              <p className="text-gray-400 text-xl">
                No se encontraron películas para "{query}"
              </p>
              <p className="text-gray-500 mt-2">
                Intenta con otro término de búsqueda
              </p>
            </div>
          ) : (
            <>
              <MovieGrid movies={movies} loading={loading} />
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <div className="flex items-center space-x-0.5 sm:space-x-2">
                    <button
                      onClick={handlePreviousPage}
                      disabled={page === 1}
                      className={`px-1 py-0.5 sm:px-3 sm:py-2 text-xs sm:text-sm rounded transition-colors ${
                        page === 1
                          ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                          : 'bg-gray-800 text-white hover:bg-gray-700 active:bg-gray-600'
                      }`}
                    >
                      ‹
                    </button>
                    <span className="px-2 py-0.5 sm:px-3 sm:py-2 bg-purple-600 text-white text-xs sm:text-sm rounded font-medium">
                      {page}/{totalPages}
                    </span>
                    <button
                      onClick={handleNextPage}
                      disabled={page === totalPages}
                      className={`px-1 py-0.5 sm:px-3 sm:py-2 text-xs sm:text-sm rounded transition-colors ${
                        page === totalPages
                          ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                          : 'bg-gray-800 text-white hover:bg-gray-700 active:bg-gray-600'
                      }`}
                    >
                      ›
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <div className="py-16 text-center">
          <FaSearch className="text-gray-600 text-6xl mx-auto mb-4" />
          <p className="text-gray-400 text-xl">
            Busca una película para comenzar
          </p>
        </div>
      )}
      
      {error && (
        <div className="py-8 text-center">
          <p className="text-red-500">{error}</p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
