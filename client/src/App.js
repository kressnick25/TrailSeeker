import React, {useState} from 'react';
import './App.css';
import Content from "./Content"
import {Button, Header, Divider, Container, Segment, Icon} from "semantic-ui-react";

const GEOLOCATION_API = "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBAeo-vXKY-RSDl3YIT2SKsDZrc67ejQWU";

function App() {
  const [location, setLocation] = useState();
  const [loading, setLoading] = useState(false);
  function handleMyLocation(e) {
    setLoading(true);
    fetch(GEOLOCATION_API, {method: 'post'})
            .then(response => response.json())
            .then(body => {
              setLocation(body.location);
              setLoading(false);  
            })
            .catch(err => err);
  }
  return (
    <div className="App">
        <Container>
            <Segment inverted color={'olive'}>
            <Header as='h1' style={{'pad-top': '5px'}}>
                TrailSeeker
                <Header.Subheader>Welcome to Trail Seeker</Header.Subheader>
            </Header>
            </Segment>
            <Divider/>
            { location ?
              <Content location={location} /> :
              <Button primary loading={loading} onClick={e => handleMyLocation()}><Icon name={'location arrow'}/>Use My Location</Button>
            }
        </Container>
    </div>
  );
}

export default App;
