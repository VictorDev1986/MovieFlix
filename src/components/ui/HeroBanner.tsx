import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlay, FaStar } from 'react-icons/fa';
import type { Movie } from '../../services/tmdb';

interface HeroBannerProps {
  movie: Movie | null;
  loading?: boolean;
}

const HeroBanner: React.FC<HeroBannerProps> = ({ movie, loading = false }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Reset loaded state when movie changes
  useEffect(() => {
    setImageLoaded(false);
  }, [movie]);

  if (loading || !movie) {
    return (
      <div className="w-full h-[70vh] bg-gradient-to-r from-gray-900 to-gray-800 animate-pulse flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="w-2/3 h-8 bg-gray-700 rounded mb-4"></div>
          <div className="w-1/2 h-6 bg-gray-700 rounded mb-8"></div>
          <div className="w-full h-24 bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  // Format date to show only year
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : '';

  // Background image URL - OMDb no proporciona imágenes de fondo
  // Usamos el poster como backdrop
  const backdropUrl = movie.poster_path || '';

  return (
    <div className="relative w-full h-[70vh] overflow-hidden">
      {/* Background image */}
      {backdropUrl && (
        <>
          <div
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${backdropUrl})`,
            }}
          />
          <img
            src={backdropUrl}
            alt=""
            className="hidden"
            onLoad={() => setImageLoaded(true)}
          />
        </>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>

      {/* Content */}
      <div className="container mx-auto px-4 relative h-full flex flex-col justify-center">
        <div className="max-w-2xl space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white">{movie.title}</h1>
          
          <div className="flex items-center space-x-4 text-sm">
            {year && <span className="text-gray-300">{year}</span>}
            {movie.vote_average > 0 && (
              <div className="flex items-center text-yellow-400">
                <FaStar className="mr-1" />
                <span>{movie.vote_average.toFixed(1)}</span>
              </div>
            )}
          </div>
          
          <p className="text-gray-300 line-clamp-3 md:line-clamp-4">
            {movie.overview}
          </p>
          
          <div className="pt-4 flex flex-wrap gap-3">
            <Link 
              to={`/movie/${movie.id}`}
              className="btn-primary flex items-center"
            >
              <FaPlay className="mr-2" size={16} /> Ver detalles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
