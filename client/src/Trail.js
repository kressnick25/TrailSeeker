import React, {useState} from "react";
import {Card, Icon, Accordion, Rating} from 'semantic-ui-react';
import WeatherIcon from 'react-icons-weather';

export function Trail (props) {
    let data = props.data;
    const [descActive, setActive] = useState(false);
    return (
        <Card color='green'>
            <Card.Content>
                <Card.Header>{data.name}</Card.Header>
                <Rating icon='star' disabled defaultRating={data.rating} maxRating={5} />
                <Accordion >
                    <Accordion.Title active={descActive} onClick={e => setActive(!descActive)}>
                        <Icon name='dropdown' />
                        Description
                    </Accordion.Title>
                    <Accordion.Content active={descActive}>
                        <p>{data.description}</p><br/>
                    </Accordion.Content>
                </Accordion>
                <p>{data.length} km</p>
                <p>Difficulty: <b>{data.difficulty ? data.difficulty : "unknown"}</b></p>
                <p><Icon name='car' />{data.distance}, {data.duration}</p>
                <p>Current Weather: <b>{data.weather}</b></p>
            </Card.Content>
        </Card>
    )
}

export default Trail;