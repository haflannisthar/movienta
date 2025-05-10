import React from 'react'
import { MovieContext } from "../Context/Context";
import { useContext } from 'react';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';

function MovieCard({ movie, index }) {
  const { genres, favoriteMovies, addOrRemoveFavorite } = useContext(MovieContext);
  const navigate = useNavigate();

  let genreNames = [];
//  Check if genres is an array of objects or an array of IDs and map accordingly 
if (Array.isArray(movie.genres) && movie.genres.length && typeof movie.genres[0] === 'object') {
  genreNames = movie.genres.map(g => g.name);
} else if (Array.isArray(movie.genre_ids)) {
  genreNames = movie.genre_ids
    .map(id => genres.find(g => g.id === id))
    .filter(Boolean)
    .map(g => g.name);
}

// Check if genres is an array of IDs and map accordingly
  const getVoteColor = (vote) => {
    if (vote >= 7) return 'bg-[#32CD32]';
    if (vote >= 4) return 'bg-[#FDDA0D]';
    return 'bg-[#D22B2B]';
  };

  // Check if the movie is in the favoriteMovies array
  const isFavorite = favoriteMovies.includes(movie.id);

  function handleNavigateToMovie(movieId, movieName) {
    // const queryName = movieName.toLowerCase().split(" ").join("-");
    navigate(`/movie?id=${movieId}&name=${movieName}`);
  }

  // Function to handle favorite click
  // This function is called when the star icon is clicked
  // It stops the click event from bubbling up to the parent element
  // and calls the addOrRemoveFavorite function with the movieId
  function handleFavoriteClick(e, movieId) {
    e.stopPropagation(); // This stops the click event from bubbling up to the parent
    addOrRemoveFavorite(movieId);
  }

  return (
    <div 
      key={index}
      onClick={() => handleNavigateToMovie(movie.id, movie.title)}
      className="group relative bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform transform hover:scale-105"
    >
      <div className={`absolute z-10 top-2 left-2 w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold ${getVoteColor(movie.vote_average)}`}>
        {movie.vote_average.toFixed(1)}
      </div>
      <div 
        className={`absolute z-10 top-2 right-2`} 
        onClick={(e) => handleFavoriteClick(e, movie.id)}
      >
        {isFavorite ? (
          <Tooltip title="Remove from Favorite" placement="bottom-start" arrow>
            <StarIcon className="text-[#FFD700]" fontSize="large" />
          </Tooltip>
        ) : (
          <Tooltip title="Add to Favorite" placement="bottom-end" arrow>
            <StarOutlineIcon className="text-white" fontSize="large" />
          </Tooltip>
        )}
      </div>

      <img
        src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
        loading='lazy'
        alt={movie.title}
        className="w-full h-64 object-cover transition duration-300 group-hover:scale-105"
      />

      <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h2 className="text-white text-lg font-bold">{movie.title}</h2>
        <p className="text-white text-sm">{movie.release_date}</p>
        <p className="text-white text-sm">{genreNames.join(', ')}</p>
      </div>
    </div>
  )
}

export default React.memo(MovieCard);