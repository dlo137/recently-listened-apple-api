import React, { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import marleyCover from '../images/satisfy.jpg';
import spotifyIcon from '../images/spotify.png';
import rewindIcon from '../images/rewind.png';
import playIcon from '../images/play.png';
import fowardIcon from '../images/foward.png';
import nextIcon from '../images/next.png';
import '../components/card.css';
/*============================================= AUTHORIZATION SECTIONS ============================================= */

const spotifyApi = new SpotifyWebApi();

// Replace with your own Spotify App credentials
const clientId = 'a4531c76a8014aa9be94d0ae414c930e';
const clientSecret = '342930b261d6450a84cb70d594d3f027';

// Set your redirect URI in the Spotify Developer Dashboard
const redirectUri = 'http://localhost:3000';  // Make sure this matches the one in the Spotify Developer Dashboard

// Function to handle token refresh
const handleTokenRefresh = () => {
  const refreshToken = 'YOUR_REFRESH_TOKEN'; // Replace with your actual refresh token

  // Request body for token refresh
  const requestBody = new URLSearchParams();
  requestBody.append('grant_type', 'refresh_token');
  requestBody.append('refresh_token', refreshToken);

  // Make a POST request to Spotify's token endpoint
  fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}` // Base64 encoded client_id:client_secret
    },
    body: requestBody
  })
  .then(response => response.json())
  .then(data => {
    console.log('Token refreshed:', data);
    spotifyApi.setAccessToken(data.access_token);
    // Call the playMostRecentSong function with the correct URI
    playMostRecentSong();
  })
  .catch(error => {
    console.error('Could not refresh access token', error);
  });
};

// Redirect the user to Spotify's authorization page
function authorizeSpotify() {
  const scopes = ['user-read-recently-played', 'user-modify-playback-state'];
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token`;
  window.location.href = authUrl;
}

// After the user authorizes your app and is redirected back, parse the access token from the URL
function parseAccessToken() {
  const params = new URLSearchParams(window.location.hash.substring(1));
  const accessToken = params.get('access_token');
  console.log('Access Token:', accessToken);
  spotifyApi.setAccessToken(accessToken);

  // Make sure you have a valid access token before calling play
  if (accessToken) {
    playMostRecentSong();
  } else {
    // Handle the case when there's no access token
    console.error('No access token found.');
  }
}


/*==================== SOUNDBAR CONTROLS   ====================*/
// Function to play the most recent song
const playMostRecentSong = () => {
  spotifyApi.getMyRecentlyPlayedTracks({ limit: 1 })
    .then((response) => {
      console.log('Spotify API Response:', response);
      const track = response.items[0].track;
      const uri = track.uri;

      if (uri) {
        spotifyApi.play({ uris: [uri] })
          .then(() => {
            console.log('Playback started.');
          })
          .catch((error) => {
            if (error.status === 403) {
              // If token expired, refresh the token and try again
              handleTokenRefresh();
            } else {
              console.error('Error starting playback:', error);
            }
          });
      } else {
        console.error('No recent song to play.');
      }
    })
    .catch((error) => {
      console.error('Error fetching recently played track:', error);
    });
};
/*============================================= CARD COMPONENT SECTION  =============================================*/
const CardComponent = () => {

  const [recentSong, setRecentSong] = useState(null);


  // Update this to call playMostRecentSong within the CardComponent scope
  const handlePlayButtonClick = () => {
    if (recentSong && recentSong.uri) {
      playMostRecentSong(recentSong.uri); // Pass recentSong.uri as a parameter
    } else {
      console.error('No recent song to play.');
    }
  };

  /*==================== USE EFFECT AND USE STATE  ====================*/
  useEffect(() => {
    const accessTokenExists = window.location.hash.includes('access_token=');

    if (!accessTokenExists) {
      authorizeSpotify();
    } else {
      parseAccessToken();
      fetchRecentlyPlayed();
    }
  }, []);

  const fetchRecentlyPlayed = () => {
    spotifyApi.getMyRecentlyPlayedTracks({ limit: 1 })
      .then((response) => {
        console.log('Spotify API Response:', response);
        const track = response.items[0].track;
        setRecentSong({
          name: track.name,
          artist: track.artists[0].name,
          albumCover: track.album.images[0].url,
          uri: track.uri  // Add URI for playback
        });
      })
      .catch((error) => {
        console.error('Error fetching recently played track:', error);
      });
  };



/*============================================= JSX/RETURN SECTION  =============================================*/
  return (
    <div className="card-wrapper">
      {/* ======================= APPLE LOGO ======================= */}
      <header className='logo-container'>
        <img src={spotifyIcon} alt='apple icon' className='logo'/>
      </header>

      <body>
        {/* ======================= LEFT SIDE OF CARD COMPENENT ======================= */}
        <div className='left-container'>
          <div className='album-cover'>
            <img src={recentSong ? recentSong.albumCover : marleyCover} alt="album cover" className='album-pic' />
          </div>
        </div>

        {/* ======================= RIGHT SIDE OF CARD COMPENENT ======================= */}
        <div className='right-container'>
          {/* ======================= SONG INFORMATION ======================= */}
          <div className='song-info'>
            <div className='recently-played'>
              <h1>RECENTLY PLAYED</h1>
            </div>

            <div className='song-artist'>
            <p className='song'>{recentSong ? recentSong.name : 'Loading...'}</p>
            <p className='artist'>{recentSong ? recentSong.artist : 'Loading...'}</p>
            </div>
          </div>

          {/* ======================= SOUND BAR ======================= */}
          <div className='soundbar-container'>
            <div className='soundbar-icons'>
              <img src={rewindIcon} alt='rewind icon' className='controls' />
              <img src={playIcon} alt='play icon' className='controls' onClick={handlePlayButtonClick}/>
              <img src={fowardIcon} alt='forward icon' className='controls' />
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