import React, { useContext, useRef, useEffect } from 'react';
import { MovieContext } from "../Context/Context";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';

function Genres() {
  const { genres, selectedGenres, setSelectedGenres } = useContext(MovieContext);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const toggleGenre = (id) => {
    if (selectedGenres.includes(id)) {
      setSelectedGenres(selectedGenres.filter(g => g !== id));
    } else {
      setSelectedGenres([...selectedGenres, id]);
    }
  };

  return (
    <div className="relative px-3 py-4 ">
      {/* Navigation Buttons */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 ">
        <button ref={prevRef} className='cursor-pointer'>
          <ArrowCircleLeftOutlinedIcon sx={{ fontSize: 40, color: "#E5228D" }} />
        </button>
      </div>
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 ">
        <button ref={nextRef} className='cursor-pointer'>
          <ArrowCircleRightOutlinedIcon sx={{ fontSize: 40, color: "#E5228D" }} />
        </button>
      </div>

      <div className="px-10">
        <Swiper
          modules={[Navigation]}
          className="genre-swiper"
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 60,
            },
          }}
        >

          {genres.map((genre) => (
            <SwiperSlide key={genre.id} className="!w-auto">
              <button
                onClick={() => toggleGenre(genre.id)}
                className={`px-4 py-2 rounded-full  border border-[#E5228D] text-sm whitespace-nowrap transition-colors duration-200 ${selectedGenres.includes(genre.id)
                    ? 'bg-[#E5228D] text-white'
                    : 'bg-[#030A1B] text-white hover:bg-[#1A1A2E]'
                  }`}
              >
                {genre.name}
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>

  );
}

export default Genres;
