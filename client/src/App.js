import React, {useState, useEffect} from 'react';
import './App.css';
import Content from "./Content"
const GEOLOCATION_API = "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBAeo-vXKY-RSDl3YIT2SKsDZrc67ejQWU"
function App() {
  const [submitted, setSubmitted] = useState(false);
  const [location, setLocation] = useState();
  function handleMyLocation(e) {
    fetch(GEOLOCATION_API, {method: 'post'})
            .then(response => response.json())
            .then(body => setLocation(body.location))
            .catch(err => err);
  }
  // TODO google location passes but nothing returned in json
  return (
    <div className="App">
        <h1>TrailSeeker</h1>
        <p>Welcome to Trail Seeker</p>
        { location ? 
          <Content location={location} /> : 
          <button onClick={e => handleMyLocation()}>Use My Location</button>
        }
    </div>
  );
}

export default App;
