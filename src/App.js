import './App.css';
import CardComponent from './components/Card_Component'

import React, {useState, useEffect} from 'react';

function App() {

  return (
    <div className="App">
      <div className='Wrapper'>
        <div className="card left-card" id='right-card'>
          <CardComponent />
        </div>

        <div className="card middle-card">
          <CardComponent />
        </div>

        <div className="card right-card">
          <CardComponent />
        </div>
      </div>
    </div>
  );
}

export default App;
