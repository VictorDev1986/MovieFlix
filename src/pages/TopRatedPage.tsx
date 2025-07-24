import { useState, useEffect } from 'react';
import MovieGrid from '../components/ui/MovieGrid';
import omdbService from '../services/omdb';
import { type Movie } from '../services/tmdb'; // Mantenemos el tipo para compatibilidad
import { FaStar } from 'react-icons/fa';

const TopRatedPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await omdbService.getTopRatedMovies(page);
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
        
        // Scroll to top when page changes
        window.scrollTo(0, 0);
      } catch (error) {
        console.error('Error fetching top rated movies:', error);
        setError('Error al cargar películas mejor valoradas. Por favor, intenta nuevamente.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTopRatedMovies();
  }, [page]);

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
      {/* Hero Section */}
      <div className="mb-8 py-12 bg-gradient-to-r from-black to-gray-900 rounded-lg text-center">
        <div className="max-w-3xl mx-auto px-4">
          <FaStar className="text-yellow-400 text-4xl mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-3">Películas Mejor Valoradas</h1>
          <p className="text-gray-300">
            Descubre las películas con las mejores calificaciones de la audiencia y la crítica
          </p>
        </div>
      </div>
      
      {/* Movie Grid */}
      <MovieGrid movies={movies} loading={loading} />
      
      {/* Error message */}
      {error && (
        <div className="text-center py-8">
          <p className="text-red-500">{error}</p>
        </div>
      )}
      
      {/* Pagination */}
      {!loading && totalPages > 1 && (
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
              {page}/{Math.min(totalPages, 500)}
            </span>
            <button
              onClick={handleNextPage}
              disabled={page === Math.min(totalPages, 500)}
              className={`px-1 py-0.5 sm:px-3 sm:py-2 text-xs sm:text-sm rounded transition-colors ${
                page === Math.min(totalPages, 500)
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-800 text-white hover:bg-gray-700 active:bg-gray-600'
              }`}
            >
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopRatedPage;
