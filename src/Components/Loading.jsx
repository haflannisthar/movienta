import React from 'react'
import { loagingLogoGif } from '../assets';

function Loading() {
  return (
    <div>
         <div className="w-screen h-screen flex items-center justify-center bg-black">
      <img src={loagingLogoGif} alt="Loading..." className="w-24 h-24 lg:w-52 lg:h-52" />
    </div>
    </div>
  )
}

export default Loading