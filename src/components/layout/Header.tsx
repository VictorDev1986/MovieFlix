import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Detectar scroll para cambiar estilo del header
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Manejar búsqueda
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMobileMenuOpen(false);
    }
  };

  // Toggle del menú móvil
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black shadow-lg' : 'bg-gradient-to-b from-black/90 to-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-red-600 font-bold text-2xl">MOVIEFLIX</span>
        </Link>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" currentPath={location.pathname}>Inicio</NavLink>
          <NavLink to="/popular" currentPath={location.pathname}>Populares</NavLink>
          <NavLink to="/top-rated" currentPath={location.pathname}>Mejor Valoradas</NavLink>
          <NavLink to="/now-playing" currentPath={location.pathname}>En Cartelera</NavLink>
          <NavLink to="/upcoming" currentPath={location.pathname}>Próximamente</NavLink>
          <NavLink to="/genres" currentPath={location.pathname}>Géneros</NavLink>
        </nav>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar películas..."
              className="bg-gray-800/80 text-white text-sm rounded-full px-4 py-2 pr-10 w-48 focus:w-64 transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-red-500"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <FaSearch size={14} />
            </button>
          </form>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-white p-2"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 px-6 py-6 shadow-lg slide-down">
          <nav className="flex flex-col space-y-4 mb-6">
            <MobileNavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>Inicio</MobileNavLink>
            <MobileNavLink to="/popular" onClick={() => setIsMobileMenuOpen(false)}>Populares</MobileNavLink>
            <MobileNavLink to="/top-rated" onClick={() => setIsMobileMenuOpen(false)}>Mejor Valoradas</MobileNavLink>
            <MobileNavLink to="/now-playing" onClick={() => setIsMobileMenuOpen(false)}>En Cartelera</MobileNavLink>
            <MobileNavLink to="/upcoming" onClick={() => setIsMobileMenuOpen(false)}>Próximamente</MobileNavLink>
            <MobileNavLink to="/genres" onClick={() => setIsMobileMenuOpen(false)}>Géneros</MobileNavLink>
          </nav>
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar películas..."
              className="w-full bg-gray-800 text-white rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-red-500"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <FaSearch size={16} />
            </button>
          </form>
        </div>
      )}
    </header>
  );
};

// Componente de navegación para escritorio
interface NavLinkProps {
  to: string;
  currentPath: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, currentPath, children }) => {
  const isActive = currentPath === to || (to !== '/' && currentPath.startsWith(to));
  
  return (
    <Link
      to={to}
      className={`text-base font-medium transition duration-300 ${
        isActive ? 'text-white' : 'text-gray-300 hover:text-white'
      }`}
    >
      {children}
    </Link>
  );
};

// Componente de navegación para móvil
interface MobileNavLinkProps {
  to: string;
  onClick: () => void;
  children: React.ReactNode;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, onClick, children }) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="text-xl font-medium text-white block py-3 hover:text-red-500 transition-colors"
    >
      {children}
    </Link>
  );
};

export default Header;
