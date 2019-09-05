import React, {useState, useEffect} from 'react';
import Trail from './Trail';
import {Card, Container, Loader, Transition} from 'semantic-ui-react';

// SET THIS TO INSTANCE IP
// const url = "http://3.104.75.166:3000/";
const url = "http://localhost:3000/api";

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
            <Card.Group centered>
                {   data.map(trail => <Trail data={trail} key={trail.id}/> )}
            </Card.Group>
        </Container>
    ) 
}

export default Content;