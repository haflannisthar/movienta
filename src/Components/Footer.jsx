import React from 'react'
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LanguageIcon from '@mui/icons-material/Language';

function Footer() {
  return (
    <div className='py-10'>
      <p className='text-xl mt-3 text-center text-[#EBFAFF]'>
        This was developed by <span className="font-semibold">Mohamed Haflan</span> for educational purposes.
      </p>

      {/* Social Icons */}
      <div className="flex justify-center gap-6 mt-4">
        <a href="https://github.com/haflannisthar/" target="_blank" rel="noopener noreferrer">
          <GitHubIcon style={{ color: '#EBFAFF', fontSize: 30 }} />
        </a>
        <a href="https://www.linkedin.com/in/haflan-nisthar" target="_blank" rel="noopener noreferrer">
          <LinkedInIcon style={{ color: '#EBFAFF', fontSize: 30 }} />
        </a>
        <a href="https://www.instagram.com/haflan_nisthar/" target="_blank" rel="noopener noreferrer">
          <InstagramIcon style={{ color: '#EBFAFF', fontSize: 30 }} />
        </a>
        <a href="https://facebook.com/haflannisthar10/" target="_blank" rel="noopener noreferrer">
          <FacebookIcon style={{ color: '#EBFAFF', fontSize: 30 }} />
        </a>
        <a href="https://mohamed-haflan.vercel.app/" target="_blank" rel="noopener noreferrer">
          <LanguageIcon style={{ color: '#EBFAFF', fontSize: 30 }} />
        </a>
      </div>

      <p className='text-md mx-3 mt-5 text-[#EBFAFF] text-center'>
        All data and images are sourced from
        <a href="https://www.themoviedb.org" target="_blank" rel="noopener noreferrer" className="underline ml-1">
          TMDB (www.themoviedb.org)
        </a>. TMDB is a community-built movie and TV database. All rights to the content belong to their respective owners and TMDB. This project is for educational purposes only and is not affiliated with or endorsed by TMDB.
      </p>
    </div>
  );
}

export default Footer