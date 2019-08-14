import React from 'react';

export function WeatherForecast(props) {
    let data = props.data;
    return (
        <div className={'weather-forecast'}>
            Forecast:<br/>
            <span>
                <table>
                    <tr>
                    {data.map(day =>
                        <td align={'center'}>{getDayInitial(day.time)}</td>
                    )}
                    </tr>
                    <tr>
                    {data.map(day =>
                        <td>
                        <img src={require(`./icons/${day.icon}.svg`)}
                             alt={'icon'}
                             width={'28em'}
                             height={'36em'}/>
                        </td>
                    )}
                    </tr>
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