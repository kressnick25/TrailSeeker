import React, {useState, useEffect} from 'react';
import Trail from './Trail';
import {Card, Container, Loader, Transition} from 'semantic-ui-react';

const url = "http://localhost:3000/";

export function Content (props) {
    const [data, setData] = useState();
    useEffect(() => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                lat: props.location.lat.toString(),
                lng: props.location.lng.toString(),
            }
        )})
            .then(response => response.json())
            .then(body => setData(body))
            .catch(err => err);
    }, [/*location*/])
    if (!data) return <Loader active size='large'>Loading</Loader>


    return (
        <Container textAlign='justified'>
            <Card.Group centered>
                {   data.map(trail => <Trail data={trail} key={trail.id}/> )}
            </Card.Group>
        </Container>
    ) 
}

export default Content;