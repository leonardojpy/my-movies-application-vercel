import { useMovieContext } from "../contexts/MovieContext";
import { useState, useRef } from "react";
import "../css/MovieCard.css";


function MovieCard({ movie, isReadOnly = false }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);
  const [isExpanded, setIsExpanded] = useState(false);
  const hoverTimeoutRef = useRef(null);

  function onFavoriteClick(e) {
    e.preventDefault();
    if (isReadOnly) return;

    if (favorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  }

  function handleMouseEnter() {
    if (isReadOnly) return;
    hoverTimeoutRef.current = setTimeout(() => {
      setIsExpanded(true);
    }, 800);
  }

  function handleMouseLeave() {
    if (isReadOnly) return;
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsExpanded(false);
  }

  return (
    <div 
      className={`movie-card ${isExpanded && !isReadOnly ? "expanded" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="movie-overlay">
          <button
            className={`favorite-btn ${favorite && !isReadOnly ? "active" : ""} ${isReadOnly ? "disabled" : ""}`}
            onClick={onFavoriteClick}
            disabled={isReadOnly}
          >
            {isReadOnly ? '★' : '♥'} 
          </button>
        </div>
      </div>
      
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <div className="movie-rating">
          <span>⭐</span>
          <span>
            {movie.vote_average ? movie.vote_average.toFixed(1) : 'Sem nota'}
          </span>
        </div>
        <p className={isExpanded && !isReadOnly ? "expanded" : "truncated"}>
          {movie.overview || "Sem descrição disponível"}
        </p>
      </div>
    </div>
  );
}

export default MovieCard;