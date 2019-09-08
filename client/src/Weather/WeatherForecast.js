import React from 'react';
import {capitalizeAll, removeDash} from "../helpers";
import {Label, Popup} from 'semantic-ui-react';

export function WeatherForecast(props) {
    let data = props.data;
    return (
        <div className={'weatherForecast'}>
            <Label as='a' basic color='teal' ribbon content={'Forecast'}/>
            <span>
                <table>
                    <thead>
                    <tr>
                    {data.map((day, index) =>
                        <td key={index}  align={'center'}>{getDayInitial(day.time)}</td>
                    )}
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                    {data.map((day, index) =>
                        <td key={index}>
                            <Popup
                                header={capitalizeAll( removeDash(day.icon ))}
                                content={`High: ${day.temperatureHigh} Low: ${day.temperatureLow}`}
                                trigger={<img src={require(`../icons/${day.icon}.svg`)}
                                              alt={'icon'}
                                              width={'28em'}
                                              height={'36em'}/>}
                            />
                        </td>
                    )}
                    </tr>
                    </tbody>
                </table>
            </span>
        </div>
    )
}

function getDayInitial(dateInt) {
    let days = ['Su', 'M', 'T', 'W', 'Th', 'F', 'S'];
    let date = new Date(dateInt * 1000);
    return days[date.getDay()];
}

export default WeatherForecast;