import React, {useState, useEffect} from 'react';
import Trail from './Trail';
import {Card, Container, Loader, Message, Button, Checkbox} from 'semantic-ui-react';

// Development use local backend on different port
// const url = localhost:3000/api
const testUrl = 'http://localhost:3000/api?test=True';
const baseUrl = 'http://localhost:3000/api';
export function Content (props) {
    const [data, setData] = useState();
    const [error, setError] = useState(false);
    const [retry, setRetry] = useState(false);
    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = useState(false);
    const [url, setUrl] = useState(baseUrl);

    useEffect(() => {
        setLoading(true);
        setError(false);
        fetch(url)
            .then(response => response.json())
            .then((body) => {
              if (body.error) setError(body.error);
              setData(body);
              setLoading(false);
            })
            .catch((err) => {
              setLoading(false);
              setError("Unable to connect to server. " +
                "Please check your internet connection.")}
                )
    }, [retry]);

   function handleDemo(e) {
     setChecked(true);
     setUrl(testUrl)
   }
    if (error !== false) return <Message negative >
    <Message.Header>Error</Message.Header>
    {error}<br/>
    <Button basic primary loading={loading} onClick={e => setRetry(!retry)}>Retry</Button>
      <Checkbox label={'Demo mode'} onChange={handleDemo} checked={checked}/>
  </Message>;
    if (!data || loading) return <Loader inverted active size='large'>Loading</Loader>;
    return (
        <Container textAlign='justified'>
          <h3 style={{'color': "white", "textAlign": "center"}}>Your IP: {data.userIp} <br/>Lat: {data.userLat} Long: {data.userLng}</h3>
            <Card.Group centered>
                {   data.trails.map(trail => <Trail data={trail} key={trail.id}/> )}
            </Card.Group>
        </Container>
    ) 
}



export default Content;