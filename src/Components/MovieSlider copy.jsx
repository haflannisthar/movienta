import React, { useEffect, useRef, useState } from "react";
import { MovieContext } from "../Context/Context";
import { useContext } from 'react';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


const MovieSlider = () => {
  const { movies, loading } = useContext(MovieContext);
  const navigate = useNavigate();


  

  const location = useLocation();

  // Get the top 5 movies
  const topFive = movies.slice(0, 5);

  const swiperInstance = useRef(null);

 useEffect(() => {
    // Load external CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fashion-slider.uiinitiative.com/assets/index.fca86069.css";
    document.head.appendChild(link);

    // Preload external JS
    const preloadLink = document.createElement("link");
    preloadLink.rel = "modulepreload";
    preloadLink.href = "https://fashion-slider.uiinitiative.com/assets/vendor.688a9bfa.js";
    document.head.appendChild(preloadLink);

    // Load Swiper script
    const script = document.createElement("script");
    script.type = "module";
    script.crossOrigin = "anonymous";
    script.src = "https://fashion-slider.uiinitiative.com/assets/index.ff8f4572.js";
    document.body.appendChild(script);

    script.onload = () => {
      const interval = setInterval(() => {
        if (window.Swiper && document.querySelector(".swiper")) {
          if (swiperInstance.current) {
            swiperInstance.current.destroy(true, true); // Destroy the previous swiper instance
          }
          swiperInstance.current = new window.Swiper(".swiper", {
            loop: true,
            autoplay: {
              delay: 1000,
              disableOnInteraction: false,
            },
            speed: 1000,
          });
          clearInterval(interval);
        }
      }, 300);
    };

    // Cleanup function when component unmounts or location changes
    return () => {
      if (swiperInstance.current) {
        swiperInstance.current.destroy(true, true); // Destroy Swiper instance on cleanup
        swiperInstance.current = null;
      }
      document.head.removeChild(link);
      document.head.removeChild(preloadLink);
      document.body.removeChild(script);
    };
  }, [location.pathname]);
  function handleNavigateToMovie(movieId, movieName) {
    const queryName = movieName.toLowerCase().split(" ").join("-");
    navigate(`/movie?id=${movieId}&name=${queryName}`);
  }


  return (
    <>
      <div className="fashion-slider" > 
        <div className="swiper h-screen">
          <div className="swiper-wrapper h-screen">
            {topFive.map((movie, index) => (
              <div
                key={index}
                className="swiper-slide"
                data-slide-bg-color="#030A1B" // need to change fo dark and white mode later
              >
                <div className="overlay-form-field "></div>
                <div
                  className="fashion-slider-title h-screen flex flex-col justify-center items-center"
                  data-swiper-parallax="-130%"
                >
                  <div className="fashion-slider-title-text text-4xl font-bold text-white mb-4">{movie.title}</div>
                  <div className="text-white max-w-3xl leading-7 tracking-wide text-center">{movie.overview}</div>
                  <div className="fashion-slider-button-group mt-4">
                    <Button
                      variant="outlined" 
                      sx={{
                        color: 'white',
                        borderColor: 'white',
                        '&:hover': {
                          borderColor: 'white',
                          backgroundColor: 'rgba(255, 255, 255, 0.1)', // Optional subtle hover
                        },
                      }}
                      endIcon={<ArrowForwardIcon />}
                      onClick={() => handleNavigateToMovie(movie.id, movie.title)}
                    >
                      More Info
                    </Button>
                  </div>
                </div>
                <div className="fashion-slider-scale">
                  <img
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    alt={movie.title}
                  />
                </div>
                <div className="bottom-fade-overlay"></div>
              </div>
            ))}
          </div>

          {/* Prev button */}
          <div className="fashion-slider-button-prev fashion-slider-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 350 160 90">
              <g className="fashion-slider-svg-wrap">
                <g className="fashion-slider-svg-circle-wrap">
                  <circle cx="42" cy="42" r="40"></circle>
                </g>
                <path
                  className="fashion-slider-svg-arrow"
                  d="M.983,6.929,4.447,3.464.983,0,0,.983,2.482,3.464,0,5.946Z"
                />
                <path className="fashion-slider-svg-line" d="M80,0H0" />
              </g>
            </svg>
          </div>

          {/* Next button */}
          <div className="fashion-slider-button-next fashion-slider-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 350 160 90">
              <g className="fashion-slider-svg-wrap">
                <g className="fashion-slider-svg-circle-wrap">
                  <circle cx="42" cy="42" r="40"></circle>
                </g>
                <path
                  className="fashion-slider-svg-arrow"
                  d="M.983,6.929,4.447,3.464.983,0,0,.983,2.482,3.464,0,5.946Z"
                />
                <path className="fashion-slider-svg-line" d="M80,0H0" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieSlider;
