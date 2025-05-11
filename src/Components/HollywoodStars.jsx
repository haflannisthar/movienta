import React from 'react';
import { MovieContext } from "../Context/Context";
import { useContext } from 'react';

function HollywoodStars() {

      const { darkMode } = useContext(MovieContext);
    
    const actors = [
        {
            name: 'Leonardo DiCaprio',
            image: 'https://www.themoviedb.org/t/p/w500//ts9l18VkDSooRGDWIeQegNVHciC.jpg'
        },
        {
            name: 'Scarlett Johansson',
            image: 'https://www.themoviedb.org/t/p/w500/oU4jt6TRCwBm0vm3WcTD9FKC2Al.jpg'
        },
        {
            name: 'Tom Cruise',
            image: 'https://www.themoviedb.org/t/p/w500/eOh4ubpOm2Igdg0QH2ghj0mFtC.jpg'
        },
        {
            name: 'Angelina Jolie',
            image: 'https://www.themoviedb.org/t/p/w500/bXNxIKcJ5cNNW8QFrBPWcfTSu9x.jpg'
        },
        {
            name: 'Robert Downey Jr.',
            image: 'https://www.themoviedb.org/t/p/w500/5qHNjhtjMD4YWH3UP0rm4tKwxCL.jpg'
        }
    ];


    return (
        <>
            {actors.map((actor, index) => (
                <div key={index} className="text-center flex flex-col p-4  ">
                    <img
                        src={actor.image}
                        alt={actor.name}
                        className="w-40 h-40 object-cover rounded-full"
                    />
                    <p className="mt-2  font-semibold" style={{color: 'text.primary'}}>{actor.name}</p>
                </div>

            ))}
        </>
    );
}

export default HollywoodStars;
