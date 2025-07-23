import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MovieDetail from '../components/ui/MovieDetail';
import MovieGrid from '../components/ui/MovieGrid';
import omdbService from '../services/omdb';
import { type MovieDetails, type Movie } from '../services/tmdb'; // Mantenemos los mismos tipos para compatibilidad

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState({
    movie: true,
    similar: true
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return;
      
      try {
        setLoading({ movie: true, similar: true });
        setError(null);
        
        // Get movie details
        const movieResponse = await omdbService.getMovieById(id);
        setMovie(movieResponse.data);
        setLoading(prev => ({ ...prev, movie: false }));
        
        // Get similar movies
        const similarResponse = await omdbService.getSimilarMovies(id);
        setSimilarMovies(similarResponse.data.results);
        setLoading(prev => ({ ...prev, similar: false }));
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setError('No se pudo cargar la información de la película. Por favor, intenta nuevamente.');
        setLoading({ movie: false, similar: false });
      }
    };
    
    fetchMovieDetails();
    
    // Scroll to top when movie changes
    window.scrollTo(0, 0);
  }, [id]);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <MovieDetail movie={movie} loading={loading.movie} />
      
      {similarMovies.length > 0 && (
        <MovieGrid 
          title="Películas similares" 
          movies={similarMovies} 
          loading={loading.similar} 
        />
      )}
    </div>
  );
};

export default MovieDetailsPage;
