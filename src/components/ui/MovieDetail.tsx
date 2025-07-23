import { useState } from 'react';
import { FaStar, FaClock, FaCalendarAlt } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import type { MovieDetails } from '../../services/tmdb';

interface MovieDetailProps {
  movie: MovieDetails | null;
  loading?: boolean;
}

const MovieDetail: React.FC<MovieDetailProps> = ({ movie, loading = false }) => {
  const [posterLoaded, setPosterLoaded] = useState(false);
  const [posterError, setPosterError] = useState(false);

  if (loading || !movie) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster placeholder */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <Skeleton height={450} className="rounded-lg" />
          </div>
          
          {/* Details placeholder */}
          <div className="flex-1">
            <Skeleton height={40} width="70%" className="mb-4" />
            <Skeleton height={20} width="30%" className="mb-6" />
            <Skeleton height={20} count={5} className="mb-1" />
            <div className="mt-6">
              <Skeleton height={30} width="40%" className="mb-4" />
              <Skeleton height={20} count={3} className="mb-1" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Format date to show only year
  const releaseDate = movie.release_date ? new Date(movie.release_date).toLocaleDateString('es-ES') : 'Desconocida';
  
  // Format runtime to hours and minutes
  const formatRuntime = (minutes: number): string => {
    if (!minutes) return 'Desconocida';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };
  
  // Image URL
  const posterUrl = movie.poster_path || '/placeholder-poster.jpg';
    
  // Background image URL - OMDb no proporciona imágenes de fondo
  // Usaremos el poster como backdrop para no perder funcionalidad
  const backdropUrl = movie.poster_path || undefined;

  return (
    <>
      {/* Backdrop header */}
      {backdropUrl && (
        <div 
          className="w-full h-96 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${backdropUrl})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"></div>
        </div>
      )}
    
      {/* Content */}
      <div className="container mx-auto px-4 py-8 relative">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="w-full md:w-1/3 lg:w-1/4 -mt-32 relative z-10">
            <div className="aspect-[2/3] rounded-lg overflow-hidden bg-gray-900 shadow-xl">
              {/* Loading placeholder */}
              {!posterLoaded && !posterError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                  <div className="animate-pulse w-12 h-12 rounded-full bg-gray-700"></div>
                </div>
              )}
              
              {/* Error placeholder */}
              {posterError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800 p-4 text-center">
                  <span className="text-gray-300">{movie.title}</span>
                  <span className="text-sm text-gray-400 mt-2">Sin imagen disponible</span>
                </div>
              )}
              
              {/* Actual image */}
              <img
                src={posterUrl}
                alt={movie.title}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  posterLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setPosterLoaded(true)}
                onError={() => setPosterError(true)}
              />
            </div>
          </div>
          
          {/* Details */}
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {movie.title}
            </h1>
            
            {movie.tagline && (
              <p className="text-gray-400 text-lg italic mt-2">"{movie.tagline}"</p>
            )}
            
            <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-300">
              {movie.vote_average > 0 && (
                <div className="flex items-center">
                  <FaStar className="text-yellow-400 mr-1" />
                  <span>{movie.vote_average.toFixed(1)} / 10</span>
                </div>
              )}
              
              <div className="flex items-center">
                <FaClock className="text-gray-400 mr-1" />
                <span>{formatRuntime(movie.runtime)}</span>
              </div>
              
              <div className="flex items-center">
                <FaCalendarAlt className="text-gray-400 mr-1" />
                <span>{releaseDate}</span>
              </div>
            </div>
            
            {/* Genres */}
            {movie.genres && movie.genres.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span 
                    key={genre.id}
                    className="bg-gray-800 text-sm text-gray-300 px-3 py-1 rounded-full"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}
            
            {/* Overview */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-white mb-3">Sinopsis</h3>
              <p className="text-gray-300 leading-relaxed">
                {movie.overview || 'No hay sinopsis disponible.'}
              </p>
            </div>
            
            {/* Additional Info */}
            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              <div>
                <span className="text-gray-400">Estado:</span>{' '}
                <span className="text-white">{movie.status || 'Desconocido'}</span>
              </div>
              
              {movie.budget > 0 && (
                <div>
                  <span className="text-gray-400">Presupuesto:</span>{' '}
                  <span className="text-white">
                    ${movie.budget.toLocaleString()}
                  </span>
                </div>
              )}
              
              {movie.revenue > 0 && (
                <div>
                  <span className="text-gray-400">Recaudación:</span>{' '}
                  <span className="text-white">
                    ${movie.revenue.toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetail;
