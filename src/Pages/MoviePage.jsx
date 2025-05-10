import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Navbar from '../Components/NavBar';
import axios from 'axios';
import Loading from "../Components/Loading";
import MovieDetails from '../Components/MovieDetails';
import Footer from '../Components/Footer';


const apiKey = import.meta.env.VITE_TMDB_API_KEY;


function MoviePage() {

  const [loading, setLoading] = useState(true)
  const [movie, setMovie] = useState(null)
  const [error, setError] = useState(null)

  const [params] = useSearchParams()
  // Fetch movie details using the movieId


  const movieId = params.get('id')

 

//  fetching movie details 
  useEffect(() => {
    async function fetchMovie() {

      try {

        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
        setLoading(false)
        setMovie(response.data)
        setError(null)

      } catch (error) {
        if (error.response?.status === 404) {

          setError("Movie not found.");
        } else {
          setError("Failed to fetch movie details.");
        }


        setLoading(false);
      }


    }

    if (movieId) fetchMovie();
  }, [movieId]);


  if (loading) {
    return (
      <Loading />
    )
  }



  return (
    <div>
      <div>
        <Navbar />
      </div>

      {error ? (
  <div className="flex flex-col items-center justify-center min-h-screen">
    <div className="text-red-500 font-bold text-2xl text-center mb-4">
      {error}
    </div>

    {error === "Failed to fetch movie details." && (
      <button
        onClick={() => window.location.reload()}
        className="bg-[#E5228D] text-white px-4 py-2 rounded hover:bg-[rgba(255, 255, 255, 0.1)] transition"
      >
        Retry
      </button>
    )}
  </div>
) : (
  <MovieDetails movie={movie} />
)}

<hr  className='text-white mt-5' />

<Footer/>

    </div>
  )
}

export default MoviePage