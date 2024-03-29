import React, {useState} from "react";
import {Card, Icon, Accordion, Rating, Label, Segment, Message} from 'semantic-ui-react';
import {capitalizeFirst} from "./helpers";
import {Weather} from "./Weather";



export function Trail (props) {
    const data = props.data;
    const [descActive, setActive] = useState(false);
    return (
      <Card color='green' key={'front'}>
          <Card.Content>
              <Card.Header>{data.name}
              <Rating
                  style={{'floated': 'right'}}
                  icon='star'
                  disabled
                  defaultRating={data.rating}
                  maxRating={5} />
              </Card.Header><br/>
              <Segment attached id={'length'}>
                  <span>Length: {data.length} km</span>
                  <span style={{'float': 'right'}}>
                    Difficulty:
                    <b>
                        {data.difficulty ?
                            capitalizeFirst(data.difficulty) :
                            "Unknown"}
                    </b>
                </span>
              </Segment>
              <Accordion>
                  <Accordion.Title active={descActive} onClick={e=> setActive(!descActive)}>
                      <Icon name='dropdown' />
                      Description
                  </Accordion.Title>
                  <Accordion.Content active={descActive}>
                      <p>{data.description}</p><br />
                  </Accordion.Content>
              </Accordion>

              {(data.distance || data.travelError) &&
              <TravelInfo lat={data.lat} lng={data.lon} distance={data.distance} duration={data.duration} travelError={data.travelError}/>}
            {data.weatherError ?
                <Message negative>{data.weatherError}</Message>
              : <Weather data={data.weather} current={data.currentWeather}/>}
          </Card.Content>
          </Card>

    )
}

function TravelInfo(props) {
    const MapsUrlApi = "https://www.google.com/maps/search/?api=1&query=";
  if (props.travelError) return <Message negative>{props.travelError}</Message>;
    return (
        <Segment basic textAlign={'center'}>
            <Label
                as={'a'}
                href={MapsUrlApi + props.lat + ',' + props.lng}
                color={'orange'}
                target={'_blank'}
                size={'large'}
            >
                <Icon name='car' />
                {props.distance}, {props.duration}
            </Label>
        </Segment>
    )
}

export default Trail;