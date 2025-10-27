import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";
import ShareButton from "../components/ShareButton"; 
function Favorites() {
  const { favorites } = useMovieContext();
  if (!favorites || favorites.length === 0) {
    return (
      <div className="favorites">
        <h2>Lista de favoritos</h2>
        <p style={{ textAlign: 'center', marginTop: '50px' }}>
            Você ainda não adicionou favoritos
        </p>
      </div>
    );
  }

  return (
    <div className="favorites">
      <h2>Lista de favoritos</h2>
      <ShareButton /> 
      
      <div className="movies-grid">
        {favorites.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}

export default Favorites;