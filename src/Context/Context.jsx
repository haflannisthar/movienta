import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const MovieContext = createContext(null);


export default function MovieProvider({ children }) {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [movieError, setMovieError] = useState(false);
  const [genres, setGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [loadMoreLoading, setLoadMoreLoading] = useState(true);
  const [loadMoreFliteredMovieLoading, setloadMoreFliteredMovieLoading] = useState(true);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [genrePage, setGenrePage] = useState(1);

  const [favoriteMovies, setFavoriteMovies] = useState([]);

  


  const navigate=useNavigate()


  const [lastSearchMovie, setLastSearchMovie] = useState(() => {
    return localStorage.getItem('lastSearchMovie') || '';
  });

  useEffect(() => {
    if (lastSearchMovie) {
      localStorage.setItem('lastSearchMovie', lastSearchMovie);
    }
  }, [lastSearchMovie]);




  // Check authentication status on initial load
  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated')

    if (auth === 'true') {
      setIsAuthenticated(true);

    }

    setLoading(false);

  }, [])

  // Fetch movies on initial load stop loading
  useEffect(() => {
    fetchMovies();
    setLoading(false); 
    setLoadMoreLoading(false);
  }, []);


  // Fetch movies
  const fetchMovies = async (pageNum = 1) => {
    try {

      if (pageNum === 1) {
        setLoading(true);
      } else {
        setLoadMoreLoading(true);
      }



      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=e9db7b0ad0fc429854328f635110a391&page=${pageNum}`
      );


      if (pageNum === 1) {
        setMovies(res.data.results);
        setLoading(false); 
      } else {
        setMovies(prev => [...prev, ...res.data.results]);
        setLoadMoreLoading(false);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovieError(true);
      setLoading(false);
      setLoadMoreLoading(false);
    }

  };

  const loadMoreMovies = () => {
    fetchMovies(page + 1);
  };


  // Fetch genres
  useEffect(() => {
    const fetchGenres = async () => {
      setLoading(true); // Set loading to true while fetching genres
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=e9db7b0ad0fc429854328f635110a391`
        );
        setLoading(false);

        setGenres(res.data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
        setLoading(false); 
      }
    };

    fetchGenres();
  }, []);



  // Fetch movies by selected genres
  useEffect(() => {
    const fetchByGenre = async () => {
      if (selectedGenres.length === 0) {
        setFilteredMovies([]);
        return;
      }

      setloadMoreFliteredMovieLoading(true);

      try {
        const genreQuery = selectedGenres.join('|');
        const res = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=e9db7b0ad0fc429854328f635110a391&with_genres=${genreQuery}&page=${genrePage}`
        );


        if (genrePage === 1) {
          setFilteredMovies(res.data.results);
          console.log("Filtered Movies:", filteredMovies);
          setloadMoreFliteredMovieLoading(false);

        } else {
          setFilteredMovies(prev => [...prev, ...res.data.results]);
          setloadMoreFliteredMovieLoading(false);
        }
      } catch (error) {
        console.error('Error fetching filtered movies:', error);
        setloadMoreFliteredMovieLoading(false);
      }
    };

    fetchByGenre();
  }, [selectedGenres, genrePage]);


  // Reset to page 1 when genres change
  useEffect(() => {
    setGenrePage(1);
  }, [selectedGenres]);



  const addOrRemoveFavorite = (movieId) => {
  const isFavorite = favoriteMovies.includes(movieId);
  let updatedFavorites;

  if (isFavorite) {
    updatedFavorites = favoriteMovies.filter((id) => id !== movieId);
  } else {
    updatedFavorites = [...favoriteMovies, movieId];
  }

  setFavoriteMovies(updatedFavorites);
  localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));

  console.log("Favorite Movie IDs:", updatedFavorites);
};



useEffect(() => {
  const stored = localStorage.getItem("favoriteMovies");
  if (stored) {
    setFavoriteMovies(JSON.parse(stored));
  }
}, []);





  // user login function
  const login = ({ username, password }) => {
    const validUsers = [
      { username: "user", password: "12345" },
      // { username: "user_two", password: "12345" },
    ];


    setLoading(true); // Set loading to true while checking credentials

    const userMatched = validUsers.find((user) => user.username === username && user.password === password)

    if (userMatched) {
      setLoading(false); // Set loading to false after checking credentials
      setIsAuthenticated(true);
      setUser(username);
      localStorage.setItem('isAuthenticated', true)
      return true;
    } else {
      setLoading(false); // Set loading to false if credentials are invalid
      setIsAuthenticated(false);
      setUser(null);
      localStorage.setItem('isAuthenticated', false)
      return false;
    }
  }



  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.setItem('isAuthenticated', false)
    navigate('/login')
  }




  return (
    <MovieContext.Provider value={{
      isAuthenticated, loading, login, user, movies, genres
      , loadMoreMovies, setPage, setMovies, loadMoreLoading, setLoadMoreLoading, fetchMovies, page, setLoading, setUser
      , selectedGenres, setSelectedGenres,
      filteredMovies, setGenrePage, genrePage, loadMoreFliteredMovieLoading,movieError,
      favoriteMovies, setFavoriteMovies,addOrRemoveFavorite,logout , lastSearchMovie, setLastSearchMovie

    }}>
      {children}
    </MovieContext.Provider>
  )
}