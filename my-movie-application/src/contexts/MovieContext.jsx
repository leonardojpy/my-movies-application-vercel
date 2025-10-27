import {createContext, useState, useContext, useEffect} from "react"
import { saveSharedList } from "../services/shareService"; // Ajuste o caminho se necessário

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({children}) => {
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        const storedFavs = localStorage.getItem("favorites")
        if (storedFavs) setFavorites(JSON.parse(storedFavs))
    }, [])

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites])

    const addToFavorites = (movie) => {
        setFavorites(prev => [...prev, movie])
    }

    const removeFromFavorites = (movieId) => {
        setFavorites(prev => prev.filter(movie => movie.id !== movieId))
    }
    
    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId)
    }

    const shareFavorites = async () => {
        const movieIds = favorites.map(movie => movie.id);
        if (movieIds.length === 0) {
            console.warn("Nenhum favorito para compartilhar.");
            return null;
        }
        try {
            const { shareId } = await saveSharedList(movieIds);
            const shareUrl = `${window.location.origin}/share/${shareId}`;
            return shareUrl;
        } catch (error) {
            console.error("Erro ao compartilhar:", error);
            return null;
        }
    };

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        shareFavorites
    }

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}