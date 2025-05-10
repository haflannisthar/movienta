import React from 'react';
import Navbar from '../Components/NavBar';
import MovieSlider from '../Components/MovieSlider';
import { MovieContext } from "../Context/Context";
import { useContext } from 'react';
import Loading from "../Components/Loading";
import MovieCard from '../Components/MovieCard';
import Button from '@mui/material/Button';
import Genres from '../Components/Genres';
import HollywoodStars from '../Components/HollywoodStars';
import Footer from '../Components/Footer';


function HomePage() {
  const {
    loading,
    movies,
    fetchMovies,
    page,
    setPage,
    loadMoreLoading,
    filteredMovies,
    selectedGenres,
    setGenrePage,
    loadMoreFliteredMovieLoading,
    movieError,
  } = useContext(MovieContext);

  if (loading && movies.length === 0) {
    return <Loading />;
  }

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMovies(nextPage);
  };





  return (
    <div>
      <Navbar />
      <MovieSlider />

      <div className="container mx-auto mt-15 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl text-white font-bold mb-12">Trending Movies</h1>

        {/* Trending Movies Section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {movieError ? (
            <div className="col-span-full flex flex-col items-center justify-center text-white">
              <p className="text-xl font-bold mb-4">Error loading movies. Please try again.</p>
              <button
                onClick={() => fetchMovies(1)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white font-semibold"
              >
                Try Again
              </button>
            </div>
          ) : (
            movies.map((movie, id) => (
              <MovieCard key={id} movie={movie} />
            ))
          )}
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            variant="outlined"
            onClick={handleLoadMore}
            sx={{
              color: 'white',
              borderColor: '#E5228D',
              '&:hover': {

                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            {loadMoreLoading ? (
              <span className="flex items-center gap-2">Loading...</span>
            ) : (
              <span className="flex items-center gap-2">Load More</span>
            )}
          </Button>
        </div>

        {/* Genre Filter Section */}
        <div className="mt-10 mb-5">
          <h1 className="text-2xl md:text-4xl font-bold mb-5 text-white">Filter Movies By Genre</h1>
          <Genres />

          <div className="mt-5">
            {filteredMovies.length > 0 ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                  {filteredMovies.map((movie, id) => (
                    <MovieCard key={id} movie={movie} />
                  ))}
                </div>

                <div className="mt-8 flex justify-center">
                  <Button
                    variant="outlined"
                    onClick={() => setGenrePage(prev => prev + 1)}
                    sx={{
                      color: 'white',
                      borderColor: '#E5228D',
                      '&:hover': {
                        borderColor: 'white',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    {loadMoreFliteredMovieLoading ? (
                      <span className="flex items-center gap-2">Loading...</span>
                    ) : (
                      <span className="flex items-center gap-2">Load More</span>
                    )}
                  </Button>
                </div>
              </>
            ) : selectedGenres.length > 0 ? (
              <p className="text-white text-center text-xl font-bold">
                No movies found for the selected genres.
              </p>
            ) : (
              <p className="text-white text-center text-xl font-bold">
                Please select a genre to filter movies.
              </p>
            )}
          </div>
        </div>
      </div>



{/* Hollywood Stars Section */}
      <div className='bg-[#228EE6] min-h-[400px]  py-5 '>

        <div className='flex flex-col items-center justify-center'>

          <h1 className='text-3xl lg:text-6xl mt-10 font-bold text-center text-[#EBFAFF]'>Explore Hollywood’s Brightest Stars</h1>
          <p className='text-xl mx-3 mt-5 text-[#EBFAFF] text-center'>Discover the stars who define the magic of movies.</p>

        </div>

        <div className="grid  grid-cols-2 sm:grid-cols-3 md:grid-cols-5 mt-10  gap-6 mx-3 justify-items-center max-w-7xl">
          <HollywoodStars />
        </div>

        <div>

        </div>

      </div>



      <Footer />






    </div>
  );
}

export default HomePage;



