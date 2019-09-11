import React, {useState, useEffect} from 'react';
import Trail from './Trail';
import {Card, Container, Loader} from 'semantic-ui-react';

// Development use local backend on different port
// const url = localhost:3000/api
const url = '/api';
export function Content (props) {
    const [data, setData] = useState();

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(body => setData(body))
            .catch(err => err);
    }, []);

    if (!data) return <Loader inverted active size='large'>Loading</Loader>;
    return (
        <Container textAlign='justified'>
          <h3 style={{'color': "white", "textAlign": "center"}}>Your IP: {data.userIp} Your Location - Lat: {data.userLat} Long: {data.userLng}</h3>
            <Card.Group centered>
                {   data.trails.map(trail => <Trail data={trail} key={trail.id}/> )}
            </Card.Group>
        </Container>
    ) 
}

export default Content;