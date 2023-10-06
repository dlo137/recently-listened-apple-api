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
            <div className='recently-played'>
              <h1>Recently Played</h1>
            </div>

            <div className='song-artist'>
              <p className='song'>Satisfy My Soul</p>
              <p className='artist'>BOB MARLEY</p>
            </div>
          </div>

          {/* ======================= SOUND BAR ======================= */}
          <div className='soundbar-container'>
            <div className='soundbar-icons'>
              <img src={rewindIcon} alt='rewind icon'  className='controls'/>
              <img src={playIcon} alt='play icon' className='controls'/>
              <img src={fowardIcon} alt='foward icon' className='controls'/>
            </div>

            <div className='duration-line'>
              <hr />
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