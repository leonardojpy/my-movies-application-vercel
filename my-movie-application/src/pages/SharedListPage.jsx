import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSharedList } from '../services/shareService';
import { getMovieDetails } from '../services/api';
import MovieCard from '../components/MovieCard';

const SharedListPage = () => {
  const { shareId } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const { movieIds } = await getSharedList(shareId);
        const moviePromises = movieIds.map(id => getMovieDetails(id));
        const movieDetails = await Promise.all(moviePromises);
        setMovies(movieDetails);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (shareId) {
      fetchListDetails();
    }
  }, [shareId]);

  if (loading) return <div>Carregando lista de favoritos...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div>
      <h1>Lista de Favoritos Compartilhada</h1>
      <div className="movies-container">
        {movies.map(movie => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
            isReadOnly={true} 
          />
        ))}
      </div>
    </div>
  );
};

export default SharedListPage;