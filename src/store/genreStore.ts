import { create } from 'zustand';
import omdbService from '../services/omdb';
import type { Genre } from '../services/tmdb'; // Mantenemos el tipo para compatibilidad

interface GenreState {
  genres: Genre[];
  loading: boolean;
  error: string | null;
  fetchGenres: () => Promise<void>;
}

const useGenreStore = create<GenreState>((set) => ({
  genres: [],
  loading: false,
  error: null,
  fetchGenres: async () => {
    try {
      set({ loading: true, error: null });
      const response = await omdbService.getMovieGenres();
      set({ genres: response.data.genres, loading: false });
    } catch (error) {
      console.error('Error fetching genres:', error);
      set({ 
        error: 'Error al cargar los géneros. Por favor, intenta nuevamente.', 
        loading: false 
      });
    }
  }
}));

export default useGenreStore;
