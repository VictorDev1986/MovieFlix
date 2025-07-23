import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import type { Movie } from '../../services/tmdb';

interface MovieCardProps {
  movie: Movie;
  loading?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, loading = false }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (loading) {
    return (
      <div className="movie-card">
        <Skeleton height={240} className="rounded-md" />
        <div className="mt-2">
          <Skeleton count={2} />
        </div>
      </div>
    );
  }

  // Format date to show only year
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
  
  // Format rating to one decimal
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';

  // Image URL
  const imageUrl = movie.poster_path || '/placeholder-poster.jpg';

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card block">
      {/* Image with overlay for gradient effect */}
      <div className="relative aspect-[2/3] rounded-md overflow-hidden bg-gray-900">
        {/* Loading placeholder */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
            <div className="animate-pulse w-8 h-8 rounded-full bg-gray-600"></div>
          </div>
        )}
        
        {/* Error placeholder */}
        {imageError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800 p-3 text-center">
            <span className="text-sm text-gray-300">{movie.title}</span>
            <span className="text-xs text-gray-400 mt-1">Sin imagen disponible</span>
          </div>
        )}
        
        {/* Actual image */}
        <img
          src={imageUrl}
          alt={movie.title}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          loading="lazy"
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Rating badge */}
        <div className="absolute top-2 right-2 bg-black/70 text-yellow-400 px-2 py-1 rounded-md flex items-center text-xs font-medium">
          <FaStar className="mr-1" size={12} /> {rating}
        </div>
      </div>
      
      {/* Movie info */}
      <div className="mt-2">
        <h3 className="text-white font-medium text-sm line-clamp-1">{movie.title}</h3>
        <p className="text-gray-400 text-xs">{year}</p>
      </div>
    </Link>
  );
};

export default MovieCard;
