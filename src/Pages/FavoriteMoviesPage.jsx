import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { MovieContext } from "../Context/Context";
import NavBar from "../Components/NavBar";
import MovieCard from '../Components/MovieCard';
import Footer from '../Components/Footer';

const apiKey = import.meta.env.VITE_TMDB_API_KEY;


const FavoriteMoviesPage = () => {
  const { favoriteMovies } = useContext(MovieContext);
  const [movies, setMovies] = useState([]);
  const [movieError, setMovieError] = useState(false);

  // Fetch favorite movies from the API
  useEffect(() => {
    if (!favoriteMovies || favoriteMovies.length === 0) return;

    const fetchFavoriteMovies = async () => {
      try {
        const requests = favoriteMovies.map((id) =>
          axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`)
        );
        const responses = await Promise.all(requests);
        const movieData = responses.map(res => res.data);
        setMovies(movieData);
      } catch (error) {
        console.error("Error fetching favorite movies:", error);
        setMovieError(true);
      }
    };

    fetchFavoriteMovies();
  }, [favoriteMovies]);


  

  return (

<div>
  <NavBar />
  <div className="pt-28 px-8 sm:px-6 lg:px-8 pb-10"> 
    <div className="md:ml-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
      {movieError ? (
        <div className="col-span-full flex flex-col items-center justify-center text-white">
          <p className="text-xl font-bold mb-4">
            Error loading movies. Please try again.
          </p>
        </div>
      ) : (
        movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))
      )}
    </div>
  </div>

<hr  className="text-white"/>
   <Footer />

</div>

    
  );
};

export default FavoriteMoviesPage;
