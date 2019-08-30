import React from 'react';
import WeatherForecast from "./WeatherForecast";
import {Label, Grid} from 'semantic-ui-react';

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
                        content={'Temp'}
                        detail={current.temperature.toFixed(0) + " C"}
                    />
                    <Label
                        content={'Humidity'}
                        detail={(current.humidity * 100).toFixed(0) + "%"}
                    />
                </tr>
                <tr>
                    <Label
                        content={'Wind'}
                        detail={current.windSpeed.toFixed(1) + 'km/h'}
                    />
                    <Label
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
