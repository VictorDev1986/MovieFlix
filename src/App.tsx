import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import SearchPage from './pages/SearchPage';
import GenresPage from './pages/GenresPage';
import TopRatedPage from './pages/TopRatedPage';
import PopularPage from './pages/PopularPage';
import NowPlayingPage from './pages/NowPlayingPage';
import UpcomingPage from './pages/UpcomingPage';
import { useEffect } from 'react';
import useGenreStore from './store/genreStore';

function App() {
  const { fetchGenres } = useGenreStore();

  // Fetch genres when app loads
  useEffect(() => {
    fetchGenres();
  }, [fetchGenres]);

  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MovieDetailsPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/genres" element={<GenresPage />} />
          <Route path="/top-rated" element={<TopRatedPage />} />
          <Route path="/popular" element={<PopularPage />} />
          <Route path="/now-playing" element={<NowPlayingPage />} />
          <Route path="/upcoming" element={<UpcomingPage />} />
          <Route path="*" element={
            <div className="flex flex-col items-center justify-center h-[70vh]">
              <h1 className="text-4xl font-bold mb-4">404</h1>
              <p className="text-xl">Página no encontrada</p>
            </div>
          } />
        </Routes>
      </MainLayout>
    </Router>
  )
}

export default App
