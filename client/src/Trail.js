import React, {useState} from "react";
import {Card, Icon, Accordion, Rating} from 'semantic-ui-react';
import {capitalizeString} from "./helpers";
import WeatherIcon from 'react-icons-weather';

export function Trail (props) {
    let data = props.data;
    const [descActive, setActive] = useState(false);
    return (
      <Card color='green'>
          <Card.Content>
              <Card.Header>{data.name}</Card.Header>
              <Rating icon='star' disabled defaultRating={data.rating} maxRating={5} />
              <Accordion>
                  <Accordion.Title active={descActive} onClick={e=> setActive(!descActive)}>
                      <Icon name='dropdown' />
                      Description
                  </Accordion.Title>
                  <Accordion.Content active={descActive}>
                      <p>{data.description}</p><br />
                  </Accordion.Content>
              </Accordion>
              <p>Length: {data.length} km</p>
              <p>Difficulty: <b>{data.difficulty ? capitalizeString(data.difficulty) : "Unknown"}</b></p>
              {data.distance &&
              <TravelInfo lat={data.lat} lng={data.lon} distance={data.distance} duration={data.duration} />}
              <p>Weather: <b>{data.weather[0].summary}</b></p>
          </Card.Content>
      </Card>
    )
}

function TravelInfo(props) {
    const MapsUrlApi = "https://www.google.com/maps/search/?api=1&query="
    
    return (
        <a href={MapsUrlApi + props.lat + ',' + props.lng} target="_blank">
            <p><Icon name='car' />{props.distance}, {props.duration}</p>
        </a>
    )
}

export default Trail;