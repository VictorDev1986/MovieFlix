import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import MovieGrid from '../components/ui/MovieGrid';
import useGenreStore from '../store/genreStore';
import omdbService from '../services/omdb';
import { type Movie } from '../services/tmdb'; // Mantenemos el tipo para compatibilidad

const GenresPage: React.FC = () => {
  const { genres, fetchGenres, loading: loadingGenres } = useGenreStore();
  const { id } = useParams<{ id?: string }>();
  
  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all genres on mount
  useEffect(() => {
    if (genres.length === 0) {
      fetchGenres();
    }
  }, [genres.length, fetchGenres]);

  // Handle genre change from URL params
  useEffect(() => {
    if (id) {
      const genreId = parseInt(id);
      setSelectedGenreId(genreId);
    } else {
      setSelectedGenreId(null);
      setMovies([]);
    }
  }, [id]);

  // Fetch movies for selected genre
  useEffect(() => {
    const fetchMoviesByGenre = async () => {
      if (!selectedGenreId) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const response = await omdbService.getMoviesByGenre(selectedGenreId);
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies by genre:', error);
        setError('Error al cargar películas. Por favor, intenta nuevamente.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchMoviesByGenre();
  }, [selectedGenreId]);

  const selectedGenre = genres.find(genre => genre.id === selectedGenreId);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Géneros</h1>
      
      {/* Genre List */}
      <div className="mb-8">
        {loadingGenres ? (
          <div className="flex overflow-x-auto space-x-2 pb-4">
            {Array(10).fill(0).map((_, i) => (
              <div 
                key={i} 
                className="bg-gray-800 animate-pulse h-10 w-24 rounded-md shrink-0"
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-3 mb-8">
            {genres.map(genre => (
              <Link
                key={genre.id}
                to={`/genres/${genre.id}`}
                className={`px-4 py-2 rounded-md transition-colors ${
                  selectedGenreId === genre.id
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {genre.name}
              </Link>
            ))}
          </div>
        )}
      </div>
      
      {/* Selected Genre Movies or Instructions */}
      {selectedGenreId ? (
        <>
          <h2 className="text-2xl font-bold text-white mb-6">
            Películas de {selectedGenre?.name || 'género'}
          </h2>
          <MovieGrid movies={movies} loading={loading} />
          
          {error && (
            <div className="text-center py-8">
              <p className="text-red-500">{error}</p>
            </div>
          )}
        </>
      ) : (
        <div className="bg-gray-900/50 rounded-lg p-8 text-center">
          <h2 className="text-xl text-white mb-4">Selecciona un género</h2>
          <p className="text-gray-400">
            Haz clic en uno de los géneros de arriba para ver las películas de esa categoría
          </p>
        </div>
      )}
    </div>
  );
};

export default GenresPage;
