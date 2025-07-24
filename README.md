# 🎬 Movieflix - Plataforma de Streaming de Películas

Movieflix es una Single Page Application (SPA) estilo Netflix desarrollada con React, TypeScript y Vite. Esta aplicación consume la API de The Movie Database (TMDB) para ofrecer una experiencia completa de navegación y descubrimiento de películas, incluyendo información detallada, calificaciones, géneros y más.

[![Estado del Proyecto](https://img.shields.io/badge/Estado-Activo-brightgreen)](https://github.com/yourusername/Filmflix)
[![Licencia](https://img.shields.io/badge/Licencia-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.x-61dafb)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38bdf8)](https://tailwindcss.com/)

## 🌐 Demo en vivo

Explora la aplicación en vivo: [Movieflix Demo](https://Filmflix-demo.example.com)

## 📸 Video del proyecto

<div align="center">
   <video src="public/Movieflix.mp4" controls width="80%">
      Tu navegador no soporta la reproducción de video.
   </video>


<p align="center">Experiencia móvil optimizada</p>

## ✨ Características principales

- **🎭 Interfaz tipo Netflix**: Diseño moderno inspirado en las mejores plataformas de streaming
- **🌙 Modo oscuro**: Experiencia visual optimizada para visualización nocturna y reducción de fatiga ocular
- **🔍 Búsqueda avanzada**: Encuentra películas por título, género o palabras clave
- **📊 Vista de detalles**: Información completa sobre cada película incluyendo sinopsis, elenco y puntuaciones
- **📱 Diseño responsivo**: Adaptación perfecta a cualquier dispositivo, desde móviles hasta pantallas grandes
- **🧩 Componentes reutilizables**: Arquitectura modular con componentes independientes
- **⚡ Rendimiento optimizado**: Carga rápida y transiciones fluidas entre páginas
- **🛡️ Manejo de errores**: Experiencia robusta con gestión de estados de carga y errores
- **🎞️ Filtrado por géneros**: Explora películas por categorías específicas
- **🏆 Sección de Top Rated**: Descubre las películas mejor valoradas por la crítica y usuarios
- **🔥 Películas populares**: Mantente al día con los títulos más vistos del momento
- **🎟️ En cartelera**: Accede a información sobre los estrenos actuales
- **🔮 Próximos estrenos**: Anticípate a las futuras películas

## 🛠️ Tecnologías Utilizadas

- **[React 18](https://reactjs.org/)**: Biblioteca de JavaScript para construir interfaces de usuario modernas y reactivas
- **[TypeScript](https://www.typescriptlang.org/)**: Superset tipado de JavaScript para mejorar la calidad del código y la experiencia de desarrollo
- **[Vite](https://vitejs.dev/)**: Herramienta de compilación que proporciona un entorno de desarrollo ultrarrápido
- **[TailwindCSS](https://tailwindcss.com/)**: Framework CSS utility-first para diseño rápido y responsivo
- **[React Router](https://reactrouter.com/)**: Navegación declarativa para aplicaciones React
- **[Axios](https://axios-http.com/)**: Cliente HTTP basado en promesas para realizar peticiones a la API
- **[Zustand](https://github.com/pmndrs/zustand)**: Biblioteca de gestión de estado minimalista pero potente
- **[React Icons](https://react-icons.github.io/react-icons/)**: Biblioteca de iconos populares para React
- **[React Loading Skeleton](https://github.com/dvtng/react-loading-skeleton)**: Componentes de carga esqueleto para mejorar la UX

## 🤖 Desarrollo con IA Generativa

Este proyecto fue desarrollado con la asistencia de **Inteligencia Artificial Generativa**, utilizando herramientas avanzadas de IA para:

- **Arquitectura del proyecto**: Diseño y estructuración de componentes y servicios
- **Desarrollo de código**: Implementación de funcionalidades complejas con TypeScript y React
- **Optimización**: Mejoras en el rendimiento y las mejores prácticas de desarrollo
- **Documentación**: Creación de documentación clara y completa
- **Resolución de problemas**: Debugging y resolución de issues técnicos

La combinación de experiencia humana y asistencia de IA ha permitido crear una aplicación robusta, bien estructurada y con código de alta calidad, demostrando el potencial de la colaboración entre desarrolladores y herramientas de IA generativa.

## 🚀 Instalación y Uso Local

### Prerrequisitos

- **Node.js** (versión 16 o superior)
- **npm** o **yarn**

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/your-username/Streamyfy.git
   cd Streamyfy
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   yarn
   ```

3. **Configuración de la API de TMDB**
   
   Crea un archivo `.env` en la raíz del proyecto con la siguiente estructura:
   ```
   VITE_TMDB_API_KEY=tu_api_key_de_tmdb
   VITE_TMDB_API_BASE_URL=https://api.themoviedb.org/3
   VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
   ```
   
   > 💡 Puedes obtener una API key gratuita registrándote en [The Movie Database](https://www.themoviedb.org/documentation/api).

4. **Iniciar la aplicación en desarrollo**
   ```bash
   npm run dev
   # o
   yarn dev
   ```
   La aplicación estará disponible en `http://localhost:5173`

5. **Construir para producción**
   ```bash
   npm run build
   # o
   yarn build
   ```
   Los archivos optimizados se generarán en la carpeta `dist/`

## 📁 Estructura del Proyecto

```
Streamyfy/
├── public/                # Archivos públicos estáticos
│   └── favicon.ico        # Icono de la aplicación
├── src/                   # Código fuente
│   ├── assets/            # Imágenes, fuentes y recursos estáticos
│   ├── components/        # Componentes reutilizables
│   │   ├── layout/        # Componentes estructurales (Header, Footer, etc.)
│   │   └── ui/            # Componentes de interfaz (Cards, Buttons, etc.)
│   ├── hooks/             # Hooks personalizados para lógica reutilizable
│   ├── pages/           # Componentes de nivel página (Inicio, Detalles, etc.)
│   ├── services/        # Servicios para API y funcionalidades externas
│   │   └── tmdb.ts      # Cliente para comunicación con TMDB API
│   ├── store/           # Estado global con Zustand
│   │   └── genreStore.ts  # Store para manejo de géneros
│   ├── types/           # Definiciones de tipos TypeScript
│   │   └── movie.ts     # Interfaces para datos de películas
│   ├── utils/           # Utilidades y funciones auxiliares
│   ├── App.tsx          # Componente raíz y configuración de rutas
│   ├── main.tsx         # Punto de entrada de la aplicación
│   └── index.css        # Estilos globales y configuración de Tailwind
├── .env                 # Variables de entorno (no incluido en git)
├── .gitignore           # Configuración de archivos ignorados por git
├── index.html           # HTML raíz para la aplicación
├── postcss.config.js    # Configuración de PostCSS para Tailwind
├── tailwind.config.js   # Configuración de TailwindCSS
├── tsconfig.json        # Configuración de TypeScript
└── vite.config.ts       # Configuración del bundler Vite
```

## 🎬 API de The Movie Database (TMDB)

Esta aplicación utiliza la API de The Movie Database (TMDB) para obtener información detallada sobre películas:

- Datos de películas populares, mejor calificadas, en cartelera y próximos estrenos
- Imágenes de alta calidad (posters, backdrops)
- Información detallada (reparto, sinopsis, valoraciones)
- Metadatos (géneros, duración, fecha de lanzamiento)

Para más información, visita la [documentación oficial de TMDB API](https://developers.themoviedb.org/3/getting-started/introduction).

## 🙌 Créditos

- [The Movie Database (TMDB)](https://www.themoviedb.org/) por su excelente API gratuita
- [Iconos e imágenes](https://www.flaticon.com/) utilizados en la aplicación
- Inspiración de diseño basada en [Streamyfy](https://www.netflix.com/)

## 📜 Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

---

<p align="center">Desarrollado con ❤️ por <a href="https://github.com/your-username">Victor Sanchez</a></p>
