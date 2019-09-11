import React, {useState, useEffect} from 'react';
import './App.css';
import Content from "./Content"
import {Button, Header, Divider, Container, Segment, Icon} from "semantic-ui-react";
import MadeWith from "./MadeWith";

function App() {
  const [submitted, setSubmitted] = useState(false);
  // get url path to fetch from server
  useEffect(()  => {
    if (typeof window !== 'undefined'){
      const urlPath = window.location.protocol + '//' + window.location.host;
      console.log('base url path: ' + urlPath);
    } else {
      console.error('Error getting url path')
    }
  }, [])
  return (
    <div className="App">
        <Container>
            <Segment inverted color={'green'}>
            <Header as='h1'>
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
            {/*<MadeWith/>*/}
        </Container>
    </div>
  );
}

export default App;
