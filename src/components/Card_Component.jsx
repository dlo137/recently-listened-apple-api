import React from 'react';  // Import React from 'react'

import '../components/card.css';
import appleIcon from '../images/apple.png';

const CardComponent = () => {
  return (
    <div className="card-wrapper">
      <div className='logo-container'>
        <img src={appleIcon} alt='apple icon'/>
      </div>
    </div>
  );
}
export default CardComponent;  // Export as CardComponent