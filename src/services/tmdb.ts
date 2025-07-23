import axios from 'axios';

// Tipos
export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
    overview: string;
    release_date: string;
    vote_average: number;
    vote_count: number;
    genre_ids: number[];
}

export interface MovieDetails extends Movie {
    genres: { id: number; name: string }[];
    runtime: number;
    status: string;
    tagline: string;
    budget: number;
    revenue: number;
}

export interface MovieResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

export interface Genre {
    id: number;
    name: string;
}

export interface GenreResponse {
    genres: Genre[];
}

// Configuración de la API
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_API_BASE_URL || 'https://api.themoviedb.org/3';
const LANGUAGE = 'es-ES';

const tmdbApi = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: API_KEY,
        language: LANGUAGE
    }
});

// Servicios de la API
const tmdbService = {
    // Películas
    getPopularMovies: (page = 1) => {
        return tmdbApi.get<MovieResponse>('/movie/popular', {
            params: { page }
        });
    },
    
    getTopRatedMovies: (page = 1) => {
        return tmdbApi.get<MovieResponse>('/movie/top_rated', {
            params: { page }
        });
    },
    
    getNowPlayingMovies: (page = 1) => {
        return tmdbApi.get<MovieResponse>('/movie/now_playing', {
            params: { page }
        });
    },
    
    getUpcomingMovies: (page = 1) => {
        return tmdbApi.get<MovieResponse>('/movie/upcoming', {
            params: { page }
        });
    },
    
    getMovieById: (id: number) => {
        return tmdbApi.get<MovieDetails>(`/movie/${id}`);
    },
    
    getSimilarMovies: (id: number) => {
        return tmdbApi.get<MovieResponse>(`/movie/${id}/similar`);
    },
    
    searchMovies: (query: string, page = 1) => {
        return tmdbApi.get<MovieResponse>('/search/movie', {
            params: { query, page }
        });
    },
    
    // Géneros
    getMovieGenres: () => {
        return tmdbApi.get<GenreResponse>('/genre/movie/list');
    },
    
    getMoviesByGenre: (genreId: number, page = 1) => {
        return tmdbApi.get<MovieResponse>('/discover/movie', {
            params: { with_genres: genreId, page }
        });
    }
};

export default tmdbService;
