import React from 'react';
import { landingPageImage, Logo } from '../assets';
import { useNavigate } from 'react-router-dom';

function LandingPage() {

  const navigate=useNavigate()


  return (
    <div className="landing-container relative w-full h-screen">
      <img
        src={landingPageImage}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="overlay"></div>

      {/* Top bar */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center px-6 md:px-24 pt-6">
        {/* Logo */}
        <div>
          <img
            src={Logo}
            className="w-1/2 md:w-1/6 mx-auto md:mx-0"
            alt="Logo"
          />
        </div>

        {/* Button */}
        <div className="hidden lg:block mt-4 md:mt-0">
  <button 
  className="text-white font-bold text-md bg-red-700 px-4 py-2 rounded-md cursor-pointer hover:bg-white hover:text-red-700 transition duration-300 ease-in-out"
  onClick={() => navigate('/login')}
  > 
    Sign in
  </button>
</div>

      </div>


      <div className='absolute inset-0 flex items-center justify-center'>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Movie App</h1>
          <p className="text-lg md:text-xl mb-8">Discover your favorite movies and shows.</p>
          <button className=" bg-red-700 text-white font-bold py-2 px-4 rounded-md hover:bg-white hover:text-red-700 transition duration-300 ease-in-out cursor-pointer"
            onClick={() => navigate('/login')}
>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
