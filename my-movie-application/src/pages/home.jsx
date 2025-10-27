import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api.js";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadMovies = async (page = 1) => {
    setLoading(true);
    try {
      let data;
      if (searchQuery.trim()) {
        data = await searchMovies(searchQuery, page);
      } else {
        data = await getPopularMovies(page);
      }

      setMovies(data.results);
      setTotalPages(data.total_pages);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Falha ao carregar filmes...");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrentPage(1);
      loadMovies(1);
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  return (
    <div className="home">
      <form onSubmit={(e) => e.preventDefault()} className="search-form">
        <input
          type="text"
          placeholder="Digite aqui"
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>


      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Carregando...</div>
      ) : (
        <>
          <div className="movies-grid">
            {movies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>

          <div className="pagination">
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            >
              Primeira
            </button>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            <span>
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Próxima
            </button>
          </div>
        </>
      )}
      
    </div>
    
  );
  
}

export default Home;
