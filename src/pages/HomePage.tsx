import { useState, useEffect } from 'react';
import HeroBanner from '../components/ui/HeroBanner';
import MovieGrid from '../components/ui/MovieGrid';
import omdbService from '../services/omdb';
import { type Movie } from '../services/tmdb'; // Mantenemos el mismo tipo para compatibilidad
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState({
    hero: true,
    popular: true,
    topRated: true,
    nowPlaying: true
  });
  
  // Estados para paginación
  const [pages, setPages] = useState({
    popular: { current: 1, total: 0 },
    topRated: { current: 1, total: 0 },
    nowPlaying: { current: 1, total: 0 }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Iniciando carga de datos en HomePage');
        
        // Get popular movies for hero banner
        console.log('Solicitando películas populares...');
        const popularResponse = await omdbService.getPopularMovies(pages.popular.current);
        console.log('Respuesta de películas populares:', popularResponse);
        
        if (popularResponse.data.results && popularResponse.data.results.length > 0) {
          console.log('Se encontraron películas populares:', popularResponse.data.results.length);
          const randomIndex = Math.floor(Math.random() * Math.min(5, popularResponse.data.results.length));
          setFeaturedMovie(popularResponse.data.results[randomIndex]);
          setPopularMovies(popularResponse.data.results);
          setPages(prev => ({
            ...prev,
            popular: {
              ...prev.popular,
              total: popularResponse.data.total_pages
            }
          }));
        } else {
          console.warn('No se encontraron películas populares o el formato de respuesta es incorrecto');
          console.log('Estructura de respuesta:', JSON.stringify(popularResponse));
        }
        setLoading(prev => ({ ...prev, hero: false, popular: false }));

        // Get top rated movies
        console.log('Solicitando películas mejor valoradas...');
        const topRatedResponse = await omdbService.getTopRatedMovies(pages.topRated.current);
        console.log('Respuesta de películas mejor valoradas:', topRatedResponse);
        
        if (topRatedResponse.data.results && topRatedResponse.data.results.length > 0) {
          console.log('Se encontraron películas mejor valoradas:', topRatedResponse.data.results.length);
          setTopRatedMovies(topRatedResponse.data.results);
          setPages(prev => ({
            ...prev,
            topRated: {
              ...prev.topRated,
              total: topRatedResponse.data.total_pages
            }
          }));
        } else {
          console.warn('No se encontraron películas mejor valoradas o el formato de respuesta es incorrecto');
        }
        setLoading(prev => ({ ...prev, topRated: false }));

        // Get now playing movies
        console.log('Solicitando películas en cartelera...');
        const nowPlayingResponse = await omdbService.getNowPlayingMovies(pages.nowPlaying.current);
        console.log('Respuesta de películas en cartelera:', nowPlayingResponse);
        
        if (nowPlayingResponse.data.results && nowPlayingResponse.data.results.length > 0) {
          console.log('Se encontraron películas en cartelera:', nowPlayingResponse.data.results.length);
          setNowPlayingMovies(nowPlayingResponse.data.results);
          setPages(prev => ({
            ...prev,
            nowPlaying: {
              ...prev.nowPlaying,
              total: nowPlayingResponse.data.total_pages
            }
          }));
        } else {
          console.warn('No se encontraron películas en cartelera o el formato de respuesta es incorrecto');
        }
        setLoading(prev => ({ ...prev, nowPlaying: false }));
        
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading({
          hero: false,
          popular: false,
          topRated: false,
          nowPlaying: false
        });
      }
    };

    fetchData();
    
    // Scroll to top when page changes
    window.scrollTo(0, 0);
  }, [pages.popular.current, pages.topRated.current, pages.nowPlaying.current]);

  // Funciones para manejar la paginación
  const handlePreviousPage = (section: 'popular' | 'topRated' | 'nowPlaying') => {
    setPages(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        current: Math.max(1, prev[section].current - 1)
      }
    }));
  };
  
  const handleNextPage = (section: 'popular' | 'topRated' | 'nowPlaying') => {
    setPages(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        current: Math.min(prev[section].total, prev[section].current + 1)
      }
    }));
  };

  // Componente de paginación reutilizable
  const PaginationControls = ({ section }: { section: 'popular' | 'topRated' | 'nowPlaying' }) => {
    const currentPage = pages[section].current;
    const totalPages = pages[section].total;
    
    if (totalPages <= 1) return null;
    
    return (
      <div className="flex justify-center mt-4 mb-8">
        <div className="flex space-x-2">
          <button
            onClick={() => handlePreviousPage(section)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md ${
              currentPage === 1
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            Anterior
          </button>
          <span className="px-4 py-2 bg-gray-800 text-white rounded-md">
            Página {currentPage} de {Math.min(totalPages, 500)}
          </span>
          <button
            onClick={() => handleNextPage(section)}
            disabled={currentPage === Math.min(totalPages, 500)}
            className={`px-4 py-2 rounded-md ${
              currentPage === Math.min(totalPages, 500)
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            Siguiente
          </button>
        </div>
      </div>
    );
  };

  // Esta función la removemos ya que usamos enlaces directos en cada sección

  return (
    <div>
      <HeroBanner movie={featuredMovie} loading={loading.hero} />
      
      <div className="section-container py-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Películas Populares</h2>
          <Link to="/popular" className="text-blue-400 hover:text-blue-300">
            Ver más →
          </Link>
        </div>
        <MovieGrid
          movies={popularMovies}
          loading={loading.popular}
        />
        <PaginationControls section="popular" />
      </div>
      
      <div className="section-container py-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Mejor Valoradas</h2>
          <Link to="/top-rated" className="text-blue-400 hover:text-blue-300">
            Ver más →
          </Link>
        </div>
        <MovieGrid
          movies={topRatedMovies}
          loading={loading.topRated}
        />
        <PaginationControls section="topRated" />
      </div>
      
      <div className="section-container py-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">En Cartelera</h2>
          <Link to="/now-playing" className="text-blue-400 hover:text-blue-300">
            Ver más →
          </Link>
        </div>
        <MovieGrid
          movies={nowPlayingMovies}
          loading={loading.nowPlaying}
        />
        <PaginationControls section="nowPlaying" />
      </div>
    </div>
  );
};

export default HomePage;
