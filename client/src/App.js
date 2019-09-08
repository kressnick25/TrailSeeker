import React, {useState} from 'react';
import './App.css';
import Content from "./Content"
import {Button, Header, Divider, Container, Segment, Icon} from "semantic-ui-react";

const GEOLOCATION_API = "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBAeo-vXKY-RSDl3YIT2SKsDZrc67ejQWU";

function App() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <div className="App">
        <Container>
            <Segment inverted color={'green'}>
            <Header as='h1' style={{'pad-top': '5px'}}>
                TrailSeeker
                <Header.Subheader>Find Mountain Biking trails near you</Header.Subheader>
            </Header>
            </Segment>
            <Divider/>
            { submitted ?
              <Content/> :
                <div className={'location'}>
                        <Button
                        primary
                        onClick={e => setSubmitted(true)}
                        size={'large'}
                    >
                        <Icon name={'location arrow'}/>
                        Use My Location
                    </Button>
                </div>
            }
        </Container>
    </div>
  );
}

export default App;
