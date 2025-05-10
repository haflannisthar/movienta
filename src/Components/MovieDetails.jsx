import React, { useEffect, useState } from 'react'
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import { MovieContext } from "../Context/Context";
import { useContext } from 'react';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';
import { Actor } from '../assets';


function MovieDetails({ movie }) {
    const { favoriteMovies, addOrRemoveFavorite } = useContext(MovieContext);
    const [actors, setActors] = useState([]);
    const [directors, setDirectors] = useState([]);
    const [trailers, setTrailers] = useState([]);

    // 
    const getVoteColor = (vote) => {
        if (vote >= 7) return 'bg-[#32CD32]';
        if (vote >= 4) return 'bg-[#FDDA0D]';
        return 'bg-[#D22B2B]';
    };

    // Check if the movie is in the favoriteMovies array
    const isFavorite = favoriteMovies.includes(movie.id);


//  fetch actors and directors
    //  and trailers when the movie prop changes
    //  useEffect is used to perform side effects in function components
   
    useEffect(() => {
        async function getActors() {


            try {

                const response = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=e9db7b0ad0fc429854328f635110a391`)
                const data = response.data;
                const cast = data.cast.slice(0, 6); // Get the first 6 actors
                setActors(cast);

                const directors = data.crew.filter(person => person.job === "Director");
                setDirectors(directors);


            } catch (error) {
                console.error("Error fetching actors:", error);
            }


        }

        async function getTrailers() {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=e9db7b0ad0fc429854328f635110a391`)
            const data = response.data;

            const movieTrailer = data.results.filter((video) => video.type === "Trailer" && video.site === "YouTube").map((video) => video.key);
            setTrailers(movieTrailer);


        }

        if (movie.id) {
            getActors();
            getTrailers()



        }
    }, [movie]);

    // Function to get the actor image URL
    const getActorImage = (path) => {
        return path ? `https://image.tmdb.org/t/p/w200${path}` : Actor; // Show default actor image if no path is available
    };

    

    return (
        <div>
            {/* Background banner */}
            <div
                className="relative h-screen w-full bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                }}
            >
                <div className="absolute bottom-0 left-0 z-10 p-8 text-white text-left w-full">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">{movie.title}</h1>

                    <p className="text-md md:text-lg max-w-2xl font-bold">
                        {movie.release_date.split('-')[0]} - {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m - {movie.origin_country.join(', ')}
                    </p>

                    <div className="flex items-center gap-4 mt-4">
                        <div
                            className={`w-12 h-12  flex items-center justify-center rounded-full text-white text-md font-semibold ${getVoteColor(
                                movie.vote_average
                            )}`}
                        >
                            <Tooltip title="Rating" placement="bottom-start" arrow>
                                {movie.vote_average.toFixed(1)}
                            </Tooltip>
                        </div>

                        <div onClick={() => addOrRemoveFavorite(movie.id)} className="cursor-pointer">
                            {isFavorite ? (
                                <Tooltip title="Remove from Favorite" placement="bottom-start" arrow>
                                    <StarIcon className="text-[#FFD700]" fontSize="inherit" style={{ fontSize: 40 }} />
                                </Tooltip>
                            ) : (
                                <Tooltip title="Add to Favorite" placement="bottom-end" arrow>
                                    <StarOutlineIcon className="text-white" fontSize="inherit" style={{ fontSize: 40 }} />
                                </Tooltip>
                            )}
                        </div>
                    </div>
                </div>
                <div className="bottom-fade-overlay"></div>
            </div>

            {/* Scrollable About section */}
            <div className=" text-white ps-8 pb-7 pe-8 mt-12 md:16 ">
                <h2 className="text-6xl font-bold mb-4">About</h2>
                <p className="text-md md:text-lg w-full ">{movie.overview}</p>
            </div>

            {/* Genres Section */}
            <div className="text-white ps-8 pb-5 pe-8">
                <h2 className="text-6xl font-bold mb-4">Genres</h2>
                <div className="text-md md:text-lg w-full">
                    {movie.genres && movie.genres.length > 0 ? (
                        movie.genres.map((genre) => (
                            <button
                                key={genre.id}
                                className="px-4 py-2 rounded-full me-2 mt-2 border border-[#E5228D] text-sm whitespace-nowrap transition-colors duration-200"
                            >
                                {genre.name}
                            </button>
                        ))
                    ) : (
                        <p className="text-xl">No genres found</p>
                    )}
                </div>
            </div>

            {/* Characters Section */}
            <div className="text-white ps-8 pe-8 pb-7 mt-4 md:16">
                <h2 className="text-6xl font-bold mb-6">Characters</h2>
                {actors && actors.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                        {actors.map((actor) => (
                            <div key={actor.id} className="flex flex-col items-center text-center">
                                <img
                                    src={getActorImage(actor.profile_path)}
                                    alt={actor.name}
                                    className="w-40 h-40 object-cover rounded-full"
                                />
                                <p className="mt-2 font-semibold">{actor.name}</p>
                                <p className="text-sm text-gray-400">{actor.character}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-xl">No characters found</p>
                )}
            </div>

            {/* Director Section */}
            <div className="text-white ps-8 pe-8 pb-7 mt-4 md:16">
                <h2 className="text-6xl font-bold mb-6">Director</h2>
                {directors && directors.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                        {directors.map((director, index) => (
                            <div key={index} className="flex flex-col items-center text-center">
                                <img
                                    src={getActorImage(director.profile_path)}
                                    alt={director.name}
                                    className="w-40 h-40 object-cover rounded-full"
                                />
                                <p className="mt-2 font-semibold">{director.name}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-xl">No director found</p>
                )}
            </div>


            <div className="text-white ps-8 pe-8 pb-7 mt-4 md:16">
                <h2 className="text-6xl font-bold mb-6">Trailer</h2>

                {trailers && trailers.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {trailers.slice(0, 4).map((key) => (
                            <div key={key} className="mb-4">
                                <iframe
                                    width="100%"
                                    height="315"
                                    src={`https://www.youtube.com/embed/${key}`}
                                    title="YouTube trailer"
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-xl text-white">No trailer available</p>
                )}
            </div>


        </div>
    );
}

export default MovieDetails;
