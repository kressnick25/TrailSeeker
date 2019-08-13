import React, {useState, useEffect} from 'react';
import Trail from './Trail';

const url = "http://localhost:3000/"

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
                lat: props.location.lat,
                lng: props.location.lng,
            }
        )})
            .then(response => response.json())
            .then(body => setData(body))
            .catch(err => err);
    }, [/*location*/])
    if (!data) return <p>Loading...</p>
    return data.map(trail => <Trail data={trail} key={trail.id}/> );
}

export default Content;