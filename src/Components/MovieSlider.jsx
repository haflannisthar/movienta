import React, { useContext } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Parallax } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/parallax';
import { MovieContext } from "../Context/Context";
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/system';

// Styled components for the slider
const FashionSliderContainer = styled('div')({
  position: 'relative',
  height: '100vh',
  width: '100%',
  overflow: 'hidden',
});

const SlideContent = styled('div')({
  position: 'relative',
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  zIndex: 2,
});

const ImageContainer = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 1,
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transform: 'scale(1.2)', // Initial scale for animation
    transition: 'transform 0.5s ease',
  },
});

const Overlay = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 1,
});



const MovieSlider = () => {
  const { movies, darkMode } = useContext(MovieContext);
  const navigate = useNavigate();
  const topFive = movies.slice(0, 5);

  function handleNavigateToMovie(movieId, movieName) {
    const queryName = movieName.toLowerCase().split(" ").join("-");
    navigate(`/movie?id=${movieId}&name=${queryName}`);
  }

  return (
    <FashionSliderContainer>
      <Swiper
        modules={[Autoplay, Navigation, Parallax]}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        speed={1000}
        navigation={{
          nextEl: '.fashion-slider-button-next',
          prevEl: '.fashion-slider-button-prev',
        }}
        parallax={true}
        className="h-full w-full"
      >
        {topFive.map((movie, index) => (
          <SwiperSlide key={index} className="h-full w-full">
            <Overlay />
            <SlideContent>
              <h2
                className="text-4xl font-bold mb-4"
                data-swiper-parallax="-30%"
                style={{ color: darkMode ? '#EBFAFF' : '#030A1B' }}
              >
                {movie.title}
              </h2>
              <p
                className="max-w-3xl leading-7 tracking-wide mb-6"
                data-swiper-parallax="-20%"
                style={{ color: darkMode ? '#EBFAFF' : '#030A1B' }}
              >
                {movie.overview}
              </p>
              <Button
                variant="outlined"
                sx={{
                  color: darkMode ? '#EBFAFF' : '#030A1B',
                  borderColor: darkMode ? '#EBFAFF' : '#030A1B',
                  '&:hover': {
                    borderColor: 'background.default',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
                endIcon={<ArrowForwardIcon />}
                onClick={() => handleNavigateToMovie(movie.id, movie.title)}
                data-swiper-parallax="-10%"
              >
                More Info
              </Button>
            </SlideContent>
            <ImageContainer>
              <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
                onLoad={(e) => {
                  // Animation when image loads
                  e.target.style.transform = 'scale(1)';
                }}
              />
            </ImageContainer>
            <div
              className="bottom-fade-overlay"
              style={{
                background: darkMode
                  ? 'linear-gradient(to bottom, rgba(3, 10, 27, 0) 0%, #030A1B 100%)'
                  : 'linear-gradient(to bottom, rgba(3, 10, 27, 0) 0%, white 100%)'
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </FashionSliderContainer>
  );
};

export default MovieSlider;
