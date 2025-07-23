import type { Movie } from '../../services/tmdb';
import MovieCard from './MovieCard';

interface MovieGridProps {
  movies: Movie[];
  loading?: boolean;
  title?: string;
}

const MovieGrid: React.FC<MovieGridProps> = ({ 
  movies, 
  loading = false, 
  title 
}) => {
  // Crear un array de placeholders si está cargando
  const loadingPlaceholders = Array(10).fill(0);

  return (
    <div className="container mx-auto px-4 mt-8 mb-12">
      {title && <h2 className="section-title text-white">{title}</h2>}
      
      <div className="movie-grid">
        {loading
          ? loadingPlaceholders.map((_, index) => (
              <MovieCard key={`loading-${index}`} movie={{} as Movie} loading={true} />
            ))
          : movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
      </div>

      {movies.length === 0 && !loading && (
        <div className="text-center py-10">
          <p className="text-gray-400">No se encontraron películas</p>
        </div>
      )}
    </div>
  );
};

export default MovieGrid;
