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
  
  return (
    <div className="App">
        <h1>TrailSeeker</h1>
        <p>Welcome to Trail Seeker</p>
        { submitted ? 
          <Content location={{lat: "-27.436350",  lng: "153.002120"}} /> : 
          <button onClick={e => setSubmitted(true)}>Use My Location</button>
        }
    </div>
  );
}

export default App;
