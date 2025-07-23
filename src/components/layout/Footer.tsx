import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black text-gray-400 py-10 mt-16 border-t border-gray-800">
      <div className="container mx-auto px-4">
        {/* Social Icons */}
        <div className="flex justify-center space-x-6 mb-8">
          <a href="#" className="hover:text-white transition-colors" aria-label="Facebook">
            <FaFacebookF size={20} />
          </a>
          <a href="#" className="hover:text-white transition-colors" aria-label="Twitter">
            <FaTwitter size={20} />
          </a>
          <a href="#" className="hover:text-white transition-colors" aria-label="Instagram">
            <FaInstagram size={20} />
          </a>
          <a href="#" className="hover:text-white transition-colors" aria-label="Youtube">
            <FaYoutube size={20} />
          </a>
        </div>
        
        {/* Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div>
            <h3 className="text-white font-medium mb-3">Navegación</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-white transition-colors">Inicio</Link></li>
              <li><Link to="/movies" className="hover:text-white transition-colors">Películas</Link></li>
              <li><Link to="/genres" className="hover:text-white transition-colors">Géneros</Link></li>
              <li><Link to="/top-rated" className="hover:text-white transition-colors">Mejor Valoradas</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-3">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/terms" className="hover:text-white transition-colors">Términos de uso</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Política de privacidad</Link></li>
              <li><Link to="/cookies" className="hover:text-white transition-colors">Política de cookies</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-3">Ayuda</h3>
            <ul className="space-y-2">
              <li><Link to="/faq" className="hover:text-white transition-colors">Preguntas frecuentes</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contacto</Link></li>
              <li><Link to="/account" className="hover:text-white transition-colors">Mi cuenta</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-3">Sobre nosotros</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-white transition-colors">Quiénes somos</Link></li>
              <li><Link to="/careers" className="hover:text-white transition-colors">Empleo</Link></li>
              <li><Link to="/press" className="hover:text-white transition-colors">Prensa</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Logo and Copyright */}
        <div className="text-center">
          <div className="mb-4">
            <span className="text-red-600 font-bold text-2xl">Movieflix</span>
          </div>
          <p className="text-sm">
            &copy; {currentYear} Movieflix. Todos los derechos reservados.
          </p>
          <p className="text-sm mt-2">
            Todos los datos de películas son proporcionados por The Movie Database (TMDb).
          </p>
          <p className="text-sm mt-2">
            Desarrollado por Victor Sanchez con ❤️
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
