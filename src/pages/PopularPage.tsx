import { useState, useEffect } from 'react';
import MovieGrid from '../components/ui/MovieGrid';
import omdbService from '../services/omdb';
import { type Movie } from '../services/tmdb'; // Mantenemos el tipo para compatibilidad
import { FaFire } from 'react-icons/fa';

const PopularPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await omdbService.getPopularMovies(page);
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
        
        // Scroll to top when page changes
        window.scrollTo(0, 0);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
        setError('Error al cargar películas populares. Por favor, intenta nuevamente.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPopularMovies();
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
      <div className="mb-8 py-12 bg-gradient-to-r from-black to-gray-800 rounded-lg text-center">
        <div className="max-w-3xl mx-auto px-4">
          <FaFire className="text-red-500 text-4xl mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-3">Películas Populares</h1>
          <p className="text-gray-300">
            Las películas más vistas y comentadas del momento
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
          <div className="flex space-x-2">
            <button
              onClick={handlePreviousPage}
              disabled={page === 1}
              className={`px-4 py-2 rounded-md ${
                page === 1
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              Anterior
            </button>
            <span className="px-4 py-2 bg-gray-800 text-white rounded-md">
              Página {page} de {Math.min(totalPages, 500)}
            </span>
            <button
              onClick={handleNextPage}
              disabled={page === Math.min(totalPages, 500)}
              className={`px-4 py-2 rounded-md ${
                page === Math.min(totalPages, 500)
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopularPage;
