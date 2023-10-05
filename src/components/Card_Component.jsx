import React from 'react';  

import '../components/card.css';
import appleIcon from '../images/apple.png';
import rewindIcon from '../images/rewind.png'
import playIcon from '../images/play.png'
import fowardIcon from '../images/foward.png'
import nextIcon from '../images/next.png'


const CardComponent = () => {
  return (
    <div className="card-wrapper">
      {/* ======================= APPLE LOGO ======================= */}
      <header className='logo-container'>
        <img src={appleIcon} alt='apple icon'/>
      </header>

      <body>
        {/* ======================= LEFT SIDE OF CARD COMPENENT ======================= */}
        <div className='left-container'>
          <div className='album-cover'>
          </div>
        </div>

        {/* ======================= RIGHT SIDE OF CARD COMPENENT ======================= */}
        <div className='right-container'>
          {/* ======================= SONG INFORMATION ======================= */}
          <div className='song-info'>
            <div>
              <h1>Recently Played</h1>
            </div>

            <div className='song-artist'>
              <p>Song</p>
              <p>Artist</p>
            </div>
          </div>

          {/* ======================= SOUND BAR ======================= */}
          <div className='soundbar-container'>
            <div className='soundbar-icons'>
              soundbar icons
            </div>

            <div className='duration-line'>
              line
            </div>

            <div className='song-time'>
              <p>0:00</p>
              <p>3:33</p>
            </div>
          </div>
        </div>

        


      </body>

      
    </div>
  );
}
export default CardComponent;  // Export as CardComponent