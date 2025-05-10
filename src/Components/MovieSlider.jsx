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
  color: 'white',
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

const BottomFade = styled('div')({
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  height: '30%',
  background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
  zIndex: 2,
});

const MovieSlider = () => {
  const { movies } = useContext(MovieContext);
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
              >
                {movie.title}
              </h2>
              <p 
                className="max-w-3xl leading-7 tracking-wide mb-6"
                data-swiper-parallax="-20%"
              >
                {movie.overview}
              </p>
              <Button
                variant="outlined"
                sx={{
                  color: 'white',
                  borderColor: 'white',
                  '&:hover': {
                    borderColor: 'white',
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
            <BottomFade />
            <div className="bottom-fade-overlay"></div>
          </SwiperSlide>
        ))}

       
      </Swiper>
    </FashionSliderContainer>
  );
};

export default MovieSlider;