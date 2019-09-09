import React, {useState} from 'react';
import './App.css';
import Content from "./Content"
import {Button, Header, Divider, Container, Segment, Icon} from "semantic-ui-react";
import MadeWith from "./MadeWith";

function App() {
  const [submitted, setSubmitted] = useState(false);

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
