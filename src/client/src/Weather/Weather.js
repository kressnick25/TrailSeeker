import React from 'react';
import WeatherForecast from "./WeatherForecast";
import {Label} from 'semantic-ui-react';

export function Weather (props) {
    const data = props.data;
    const current = props.current;
    return(
        <div>
            <Label as='a' color='teal' ribbon content={'Current Weather'}/>
            <table>
                <tbody>
                <tr>
                    <Label
                        color={'teal'}
                        basic
                        content={'Temp'}
                        detail={current.temperature.toFixed(0) + " C"}
                    />
                    <Label
                        color={'teal'}
                        basic
                        content={'Humidity'}
                        detail={(current.humidity * 100).toFixed(0) + "%"}
                    />
                </tr>
                <tr>
                    <Label
                        color={'teal'}
                        basic
                        content={'Wind'}
                        detail={current.windSpeed.toFixed(1) + 'km/h'}
                    />
                    <Label
                        color={'teal'}
                        basic
                        content={'Rain chance'}
                        detail={current.precipProbability + '%'}
                    />
                </tr>
                </tbody>
            </table>
            <WeatherForecast data={data}/>
        </div>
    )
}
