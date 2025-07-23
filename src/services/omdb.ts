import axios from 'axios';

// Tipos
export interface OmdbMovie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
}

export interface OmdbMovieDetails extends OmdbMovie {
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Ratings: { Source: string; Value: string }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

export interface OmdbSearchResponse {
  Search: OmdbMovie[];
  totalResults: string;
  Response: string;
  Error?: string;
}

// Configuración de la API
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_OMDB_API_BASE_URL || 'https://www.omdbapi.com';

const omdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    apikey: API_KEY
  }
});

// Adaptar los datos de OMDb al formato esperado por nuestra aplicación
const adaptMovieFormat = (omdbMovie: OmdbMovie): any => {
  return {
    id: omdbMovie.imdbID,
    title: omdbMovie.Title,
    poster_path: omdbMovie.Poster !== 'N/A' ? omdbMovie.Poster : null,
    backdrop_path: null, // OMDb no proporciona imágenes de fondo
    overview: '', // Se llenaría desde getMovieById
    release_date: omdbMovie.Year,
    vote_average: 0, // Se llenaría desde getMovieById
    vote_count: 0, // Se llenaría desde getMovieById
    genre_ids: []
  };
};

const adaptMovieDetailsFormat = (omdbDetails: OmdbMovieDetails): any => {
  let rating = 0;
  const imdbRating = parseFloat(omdbDetails.imdbRating);
  if (!isNaN(imdbRating)) {
    rating = imdbRating;
  }

  // Extrae géneros como un array
  const genres = omdbDetails.Genre.split(',').map((genre, index) => ({
    id: index + 1,
    name: genre.trim()
  }));

  return {
    id: omdbDetails.imdbID,
    title: omdbDetails.Title,
    poster_path: omdbDetails.Poster !== 'N/A' ? omdbDetails.Poster : null,
    backdrop_path: null,
    overview: omdbDetails.Plot,
    release_date: omdbDetails.Released,
    vote_average: rating,
    vote_count: omdbDetails.imdbVotes.replace(/,/g, ''),
    genre_ids: genres.map(g => g.id),
    genres: genres,
    runtime: parseInt(omdbDetails.Runtime) || 0,
    status: 'Released',
    tagline: '',
    budget: 0,
    revenue: 0,
    director: omdbDetails.Director,
    actors: omdbDetails.Actors,
    rated: omdbDetails.Rated
  };
};

// Servicios de la API
const omdbService = {
  // Películas
  getPopularMovies: async (page = 1) => {
    // OMDb no tiene endpoint para películas populares, usamos búsqueda de películas con año reciente
    const currentYear = new Date().getFullYear();
    console.log('API_KEY:', API_KEY);
    console.log('BASE_URL:', BASE_URL);
    console.log('Buscando películas populares para el año:', currentYear - 1);
    
    try {
      const response = await omdbApi.get<OmdbSearchResponse>('', {
        params: { 
          s: 'movie', 
          type: 'movie', 
          y: currentYear - 1, // Películas del año pasado suelen ser más populares
          page 
        }
      });
      
      console.log('Respuesta de OMDb API:', response.data);
      
      if (response.data.Response === 'False') {
        console.error('Error de OMDb:', response.data.Error);
        throw new Error(response.data.Error || 'Error fetching movies');
      }
      
      const results = response.data.Search ? response.data.Search.map(adaptMovieFormat) : [];
      console.log('Películas procesadas:', results);
      
      return {
        data: {
          results: results,
          page,
          total_pages: Math.ceil(parseInt(response.data.totalResults) / 10),
          total_results: parseInt(response.data.totalResults)
        }
      };
    } catch (error) {
      console.error('Error al obtener películas populares:', error);
      throw error;
    }
  },
  
  getTopRatedMovies: async (page = 1) => {
    // Simulamos películas mejor valoradas buscando títulos populares
    const response = await omdbApi.get<OmdbSearchResponse>('', {
      params: { 
        s: 'best', 
        type: 'movie',
        page 
      }
    });
    
    if (response.data.Response === 'False') {
      throw new Error(response.data.Error || 'Error fetching top rated movies');
    }
    
    return {
      data: {
        results: response.data.Search.map(adaptMovieFormat),
        page,
        total_pages: Math.ceil(parseInt(response.data.totalResults) / 10),
        total_results: parseInt(response.data.totalResults)
      }
    };
  },
  
  getNowPlayingMovies: async (page = 1) => {
    // Simulamos películas en cartelera buscando por el año actual
    const currentYear = new Date().getFullYear();
    const response = await omdbApi.get<OmdbSearchResponse>('', {
      params: { 
        s: 'movie', 
        type: 'movie', 
        y: currentYear,
        page 
      }
    });
    
    if (response.data.Response === 'False') {
      throw new Error(response.data.Error || 'Error fetching now playing movies');
    }
    
    return {
      data: {
        results: response.data.Search.map(adaptMovieFormat),
        page,
        total_pages: Math.ceil(parseInt(response.data.totalResults) / 10),
        total_results: parseInt(response.data.totalResults)
      }
    };
  },
  
  getUpcomingMovies: async (page = 1) => {
    // Simulamos próximos estrenos con películas del próximo año
    const nextYear = new Date().getFullYear() + 1;
    const response = await omdbApi.get<OmdbSearchResponse>('', {
      params: { 
        s: 'movie', 
        type: 'movie', 
        y: nextYear,
        page 
      }
    });
    
    // Si no hay resultados para el próximo año, intentamos con películas recientes
    if (response.data.Response === 'False') {
      const currentYear = new Date().getFullYear();
      const fallbackResponse = await omdbApi.get<OmdbSearchResponse>('', {
        params: { 
          s: 'upcoming', 
          type: 'movie', 
          y: currentYear,
          page 
        }
      });
      
      if (fallbackResponse.data.Response === 'False') {
        throw new Error(fallbackResponse.data.Error || 'Error fetching upcoming movies');
      }
      
      return {
        data: {
          results: fallbackResponse.data.Search.map(adaptMovieFormat),
          page,
          total_pages: Math.ceil(parseInt(fallbackResponse.data.totalResults) / 10),
          total_results: parseInt(fallbackResponse.data.totalResults)
        }
      };
    }
    
    return {
      data: {
        results: response.data.Search.map(adaptMovieFormat),
        page,
        total_pages: Math.ceil(parseInt(response.data.totalResults) / 10),
        total_results: parseInt(response.data.totalResults)
      }
    };
  },
  
  getMovieById: async (id: string) => {
    const response = await omdbApi.get<OmdbMovieDetails>('', {
      params: { i: id, plot: 'full' }
    });
    
    if (response.data.Response === 'False') {
      throw new Error('Movie not found');
    }
    
    return {
      data: adaptMovieDetailsFormat(response.data)
    };
  },
  
  getSimilarMovies: async (id: string) => {
    // OMDb no tiene endpoint para películas similares
    // Obtenemos los detalles de la película y luego buscamos por género
    const movieResponse = await omdbApi.get<OmdbMovieDetails>('', {
      params: { i: id, plot: 'full' }
    });
    
    if (movieResponse.data.Response === 'False') {
      throw new Error('Movie not found');
    }
    
    // Usamos el primer género para buscar películas similares
    const firstGenre = movieResponse.data.Genre.split(',')[0].trim();
    
    const response = await omdbApi.get<OmdbSearchResponse>('', {
      params: { 
        s: firstGenre, 
        type: 'movie'
      }
    });
    
    if (response.data.Response === 'False') {
      throw new Error(response.data.Error || 'Error fetching similar movies');
    }
    
    // Filtramos la película actual
    const similarMovies = response.data.Search
      .filter(movie => movie.imdbID !== id)
      .map(adaptMovieFormat);
    
    return {
      data: {
        results: similarMovies,
        page: 1,
        total_pages: 1,
        total_results: similarMovies.length
      }
    };
  },
  
  searchMovies: async (query: string, page = 1) => {
    const response = await omdbApi.get<OmdbSearchResponse>('', {
      params: { 
        s: query, 
        type: 'movie',
        page 
      }
    });
    
    if (response.data.Response === 'False') {
      // Si no se encuentran resultados, devolvemos un array vacío en lugar de un error
      if (response.data.Error === 'Movie not found!') {
        return {
          data: {
            results: [],
            page,
            total_pages: 0,
            total_results: 0
          }
        };
      }
      throw new Error(response.data.Error || 'Error searching movies');
    }
    
    return {
      data: {
        results: response.data.Search.map(adaptMovieFormat),
        page,
        total_pages: Math.ceil(parseInt(response.data.totalResults) / 10),
        total_results: parseInt(response.data.totalResults)
      }
    };
  },
  
  // Géneros
  getMovieGenres: async () => {
    // OMDb no tiene un endpoint de géneros, así que crearemos algunos géneros comunes
    const commonGenres = [
      { id: 1, name: 'Action' },
      { id: 2, name: 'Adventure' },
      { id: 3, name: 'Animation' },
      { id: 4, name: 'Comedy' },
      { id: 5, name: 'Crime' },
      { id: 6, name: 'Documentary' },
      { id: 7, name: 'Drama' },
      { id: 8, name: 'Family' },
      { id: 9, name: 'Fantasy' },
      { id: 10, name: 'History' },
      { id: 11, name: 'Horror' },
      { id: 12, name: 'Music' },
      { id: 13, name: 'Mystery' },
      { id: 14, name: 'Romance' },
      { id: 15, name: 'Science Fiction' },
      { id: 16, name: 'Thriller' },
      { id: 17, name: 'War' },
      { id: 18, name: 'Western' }
    ];
    
    return {
      data: {
        genres: commonGenres
      }
    };
  },
  
  getMoviesByGenre: async (genreId: number, page = 1) => {
    // Obtenemos el nombre del género según el ID
    const genres = (await omdbService.getMovieGenres()).data.genres;
    const genre = genres.find(g => g.id === genreId);
    
    if (!genre) {
      throw new Error('Genre not found');
    }
    
    // Buscamos películas por el nombre del género
    const response = await omdbApi.get<OmdbSearchResponse>('', {
      params: { 
        s: genre.name, 
        type: 'movie',
        page 
      }
    });
    
    if (response.data.Response === 'False') {
      throw new Error(response.data.Error || 'Error fetching movies by genre');
    }
    
    return {
      data: {
        results: response.data.Search.map(adaptMovieFormat),
        page,
        total_pages: Math.ceil(parseInt(response.data.totalResults) / 10),
        total_results: parseInt(response.data.totalResults)
      }
    };
  }
};

export default omdbService;
